import { View, Text, TextInput, Handle } from "react-native";
import styles from "./stylesUser";
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";
import api from "../../Api/Api";
import { useContext, useState } from "react";
import * as Animatable from 'react-native-animatable';
import { ApiContext } from "../../context/APicontext";
import { TextInputMask } from 'react-native-masked-text'
import { Alert } from "react-native";

export default function LoginUser({ navigation }) {

    const [cpfCnpj, setCpfCnpj] = useState('')
    const [password, setPassword] = useState('')
    const {tokenUser, userLog,cardUserLog, informationsAccountUser} = useContext(ApiContext)
   
    async function logar (){
        try{
            console.log(noMask)
            api.post('auth/token/login/',{
                username:noMask,
                password:password
    
          }).then(function(response){
            tokenUser(response.data.auth_token)
            
            try {
                api.defaults.headers.Authorization = `Token ${response.data.auth_token}`
                api.get("users/me/").then(function(response){
                    console.log(response.data.username)
                    userLog(response.data.id, response.data.first_name, response.data.email, response.data.username )
                  
                })
                try {
                    api.get(`account/?${(cpfCnpj.length) == 11? 'physical_person='+cpfCnpj: 'juridic_person='+cpfCnpj}`).then(function(response){
                        console.log(response.data[0])
                        
                        informationsAccountUser(
                            response.data[0].id,
                            response.data[0].agency,
                            response.data[0].number_verificate,
                            response.data[0].number,
                            response.data[0].limit
                        
                        )
                        cardUserLog(
                            response.data[0].account_card[0].number,
                            response.data[0].account_card[0].validity
                        )
                        navigation.navigate("First")
                    }).catch(function(error){
                        console.error(error)
                    })
                      
                } catch (error) {
                    console.error(error)
                }
            } catch (error) {
                console.error(error)
               
            }
          
          }).catch(function (error) {
            console.error(error);
            if( error.response.status === 400){
                Alert.alert("Usuário não encontrado!", "Verifique seu usuario e senha!")
            }
          });

        }catch(error){
            console.log(error)
        }
      
    }
    const noMask = cpfCnpj.replace(/\.|-/gm, "")
    return (
        <View style={styles.container}>

            <View style={styles.nameSlogan}>
                <View style={styles.title}>
                <Animatable.Text animation='pulse'  duration={2000} style={styles.txt}>Ke</Animatable.Text>
                    <Text style={styles.secondPartName}>Bank</Text>
                </View>
            </View>

            <View style={styles.inputs}>
            <TextInputMask
                        type={"only-numbers"}
                        style={styles.input}
                        maxLength={14}
                        value={cpfCnpj}
                        placeholder='Digite seu CPF/CNPJ:'
                        placeholderTextColor={'white'}

                        onChangeText={text => { setCpfCnpj(text) }} />
           
                <TextInput value={password} secureTextEntry={true} onChangeText={(text)=>setPassword(text)}  style={styles.input} placeholderTextColor={'white'} placeholder="Digite sua senha: " />
            </View>

            <View>
                <TouchableOpacity onPress={logar} style={styles.Arrowbutton}>
                    <Ionicons size={50} color="white" name="ios-arrow-forward" />
                </TouchableOpacity>
            </View>

            <View style={styles.polign}></View>
        </View>
    )
}

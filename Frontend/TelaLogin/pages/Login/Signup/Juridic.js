import { View, Text, TextInput, Alert } from "react-native";
import styles from "./styles";
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";
import { useContext, useState } from 'react';
import apiCep from "./../../../Api/ApiCep.jsx";

import { ApiContext }  from "../../../context/APicontext";
import DropdownChoice from "../../../components/dropdown";
import {TextInputMask} from "react-native-masked-text";
import api from "./../../../Api/Api.jsx";


export default function Juridic({ navigation }) {
    const { token, userLog, tokenUser, user, optionAccount, informationsAccountUser} = useContext(ApiContext)
    const [openDate, setOpenDate] = useState("")
    const [cnpj, setCnpj] = useState("")
    const [stateRegistration, setStateRegistration] = useState("")
    const [password, setPassword] = useState("")
    const [city, setCity] = useState("")
    const [neighborhood, setNeighborhood] = useState("")
    const [federative_unit, setFederative_unit] = useState("")
    const [pac, setPac] = useState("")
    const [public_place, setPublic_space] = useState("")
    const [street, setStreet] = useState("")
    const [name, setName] = useState("")
    const [number, setNumber] = useState("")
    const [email, setEmail] = useState("")

    const noMask = cnpj.replace(/[^a-zA-Z0-9]/g, "")

    const createUser = async () =>{
        try{

            api.post('users/',{
                cpf_cnpj:noMask,
                first_name:name,
                surname:null,
                email:email,
                password:password,
                phone_number:number

            }).then(function (response) {
            userLog(response.data.id, name, email, response.data.cpf_cnpj)
          
            try{
                api.post('auth/token/login/',{
                    cpf_cnpj:noMask,
                    password:password
        
              }).then(function(response){
                tokenUser(response.data.auth_token)
              
              }).catch(function (error) {
                console.error(error);
              });
    
            }catch(error){
                console.log(error)
            }
           
          })
          .catch(function (error) {
            console.error(error);
          });

        }catch(error){
            console.log(error)
        }
        }

        const createAccount = async () =>{
            console.log(noMask)
                       
            try{
                api.defaults.headers.Authorization = `Token ${token}`
                api.post('juridicperson/',{
                    fk_user:user.id,
                    state_registration:stateRegistration,
                    cnpj:noMask,
                    open_date:openDate,
                
    
                }).then(function (response) {
                    console.log(response.data)
                    try {
                        api.post("account/", {
                            type_account:optionAccount,
                            juridic_person:noMask,
                            physical_person:null
                     

                        }).then(function(response){
                            console.log(response.data)
                            try{
                                api.get(`account/?juridic_person=${noMask}`).then(function(response){
                                    console.log(response.data)
                                    informationsAccountUser(
                                        response.data[0].id,
                                        response.data[0].agency,
                                        response.data[0].number_verificate,
                                        response.data[0].number,
                                        response.data[0].limit
                                    
                                    )
                                    console.log(response.data[0].id)
                                  

                                        api.post("address/",{
                                            city:city,
                                            neighborhood:neighborhood,
                                            federative_unit:federative_unit,
                                            pac:pac,
                                            street:street,
                                            public_place:public_place,
                                            juridic_person:user.cpfCnpj
                
                                        }).then(function(response){
                                            console.log(response.data)
                                            navigation.navigate("First")
                                        })
                                        
                                    
                                    })
                                
        
                            }catch(error){
                                console.error(error);
                            }
                        })
                    } catch (error) {
                        console.error(error)
                    }  
                   
              })
              .catch(function (error) {
                console.error(error);
              });

            }catch(error){
                console.log(error)
            }
        }
            
         const searchPac = () =>{

            apiCep.get(`${pac}/json`).then(function(response){
                setCity(response.data.localidade)
                setFederative_unit(response.data.uf)
                setNeighborhood(response.data.bairro)
                setStreet(response.data.logradouro)
                createUser()

            }).catch(function(error){
                console.error(error)
            })
               
            }

    return (
        <View style={styles.container}>

            <View style={styles.nameSlogan}>
                <View style={styles.title}>
                    <Text style={styles.txt}>Ke</Text>
                    <Text style={styles.secondPartName}>Bank</Text>
                  
                </View>
            </View>
        
            <View style={styles.inputs}>
            <TextInput style={styles.input} value={name} onChangeText={(text)=>setName(text)} placeholder="Digite o nome da empresa:" placeholderTextColor={'white'} />
                <TextInput style={styles.input} value={openDate} onChangeText={(text)=>setOpenDate(text)} placeholder="DIgite a data de abertura: " placeholderTextColor={'white'} />
                <TextInputMask
                    style={styles.input}
                    type={'cel-phone'}
                    placeholder={"Digite seu número de telefone:"}
                    placeholderTextColor={"white"}
                    options={{
                        maskType: 'BRL',
                        withDDD: true,
                        dddMask: '(99) '
                    }}
                    value={number}
                    onChangeText={text => {
                      setNumber(text)
                    }}
                />
                
                <TextInputMask 
                type='cnpj'
                style={styles.input
                } value={cnpj} 
                onChangeText={(text)=>setCnpj(text)}  
                placeholder="Digite seu CNPJ:"
                placeholderTextColor={"white"}/>

                <TextInput style={styles.input} maxLength={10} value={stateRegistration} onChangeText={(text)=>setStateRegistration(text)} placeholder="Digite seu registro de estado: "  placeholderTextColor={'white'} />
                <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Digite seu E-mail: " placeholderTextColor={'white'} />
                <TextInput style={styles.input} secureTextEntry={true} value={password} onChangeText={(text)=>setPassword(text)} maxLength={40} placeholder="Crie sua senha: " placeholderTextColor={'white'} />
                <TextInput style={[styles.input, {width:210}]}  value={pac} onChangeText={(text)=>setPac(text)} placeholder="Digite seu CEP: " placeholderTextColor={'white'} />

                <View style={{position:"relative", left:227, bottom:27.5}}>
                    <TouchableOpacity onPress={searchPac} style={{borderRadius:2, borderWidth:1, borderColor:"white", padding:4, width:60}}><Text style={{color:"white"}}>Buscar</Text></TouchableOpacity>
                </View>

                <TextInput style={[styles.input, {position:"relative", bottom:30}]} value={public_place} onChangeText={(text)=>setPublic_space(text)} placeholder="Complemento: " placeholderTextColor={'white'} />
            </View>
            <View>
                <TouchableOpacity onPress={createAccount} style={[styles.Arrowbutton, {top:170, left:130}]}>
                    <Ionicons  name="ios-arrow-forward" color={"white"} size={35}/>
                </TouchableOpacity>
            </View>

            <View style={{top:100, position:"relative"}}>
               <DropdownChoice />
            </View>

            <View style={[styles.polign, {top:150}]}></View>

        </View>
    )
    }
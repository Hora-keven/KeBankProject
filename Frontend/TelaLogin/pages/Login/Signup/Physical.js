import { View, Text, TextInput, Alert } from "react-native";
import styles from "./styles";
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";
import { useContext, useState } from 'react';

import { ApiContext } from "../../context/APicontext";

import api from "../../Api/Api";
import DropdownChoice from "../../../components/dropdown.jsx";
import apiCep from "../../Api/ApiCep";

export default function Physical({ navigation }) {
    const {user, userLog, tokenUser, token, optionAccount, cardUserLog, informationsAccountUser} = useContext(ApiContext)
    const [bornDate, setBornDate] = useState("")
    const [cpf, setCpf] = useState("")
    const [rg, setRg] = useState("")
    const [city, setCity] = useState("")
    const [neighborhood, setNeighborhood] = useState("")
    const [federative_unit, setFederative_unit] = useState("")
    const [pac, setPac] = useState("")
    const [public_place, setPublic_space] = useState("")
    const [name, setName] = useState("")
    const [number, setNumber] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [street, setStreet] = useState("")
    const noMask = cpf.replace(/\.|-/gm, "")
   
    const createAccount = async () =>{
     
       
        try{
            api.defaults.headers.Authorization = `Token ${token}`
            api.post('physicalperson/',{
                fk_user:user.id,
                born_date:bornDate,
                cpf:noMask,
                rg:rg,
            

            }).then(function (response) {
             
            try{
                api.post("address/",{
                    city:city,
                    neighborhood:neighborhood,
                    federative_unit:federative_unit,
                    pac:pac,
                    street:street,
                    public_place:public_place,
                    physical_person:noMask

                }).then(function(response){
                    try {
                        api.post('account/',{
                            type_account:optionAccount,
                            physical_person:noMask
        
                        }).then(function(response){
        
                            try {
                                api.get("account/?physical_person="+noMask).then(function(response){
                                    console.log(response.data[0].id)
                                    informationsAccountUser(
                                        response.data[0].id,
                                        response.data[0].agency,
                                        response.data[0].number,
                                        response.data[0].number_verificate,
                                        response.data[0].limit
                                    
                                    )
                                    
                                    api.get("card/",{
                                        account:response.data[0].id

                                    }).then(function(response){
                                        console.log(response.data)
                                        api.get("card/?account="+response.data.account)
                                        cardUserLog(response.data.number, response.data.validity)
                                    }).then(function(response){
                                        console.log(response.data)
                                        navigation.navigate("First")
                                    })
                                
                                }).catch(function(error){
                                    console.error(error)
                                })
                                  
                            } catch (error) {
                                console.error(error)
                            }
                        })
                    } catch (error) {
                        console.error(error)
                    }
                })
            }catch(error){
                console.error(error);
                console.log("eeee")
            }

          })
          .catch(function (error) {
            console.error(error);
          });

        }catch(error){
            console.log(error)
        }
        }
      
        
    const createUser = async () =>{
        try{

            api.post('users/',{
                username:cpf,
                first_name:name,
                surname:lastName,
                email:email,
                password:password,
                phone_number:number

            }).then(function (response) {
            userLog(response.data.id, name, email, cpf)
          
            try{
                api.post('auth/token/login/',{
                    username:cpf,
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


        const searchPac = () =>{

            apiCep.get(`${pac}/json`).then(function(response){
                setCity(response.data.localidade)
                setFederative_unit(response.data.uf)
                setNeighborhood(response.data.bairro)
                setStreet(response.data.logradouro)

                createUser()

            }).catch(function(error){
                console.error(error)
                console.log("error")
             
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
                <TextInput style={styles.input} value={name} onChangeText={(text)=>setName(text)} placeholder="Put your first name:" placeholderTextColor={'white'} />
                <TextInput style={styles.input} value={lastName} onChangeText={setLastName} placeholder="Put your last name:" placeholderTextColor={'white'} />
                <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Put your E-mail: " placeholderTextColor={'white'} />
                <TextInput style={styles.input} value={number} onChangeText={(text)=>setNumber(text)} placeholder="Put your telephone number: " placeholderTextColor={'white'} />
                <TextInput style={styles.input} value={password} onChangeText={(text)=>setPassword(text)} placeholder="Create your password: " placeholderTextColor={'white'} />
                <TextInput style={styles.input} value={bornDate} onChangeText={(text) =>setBornDate(text)} placeholder="Put your born date: " placeholderTextColor={'white'} />
                <TextInput style={styles.input} value={cpf} onChangeText={(text)=>setCpf(text)} inputMode="numeric" placeholder="Put your CPF: " placeholderTextColor={'white'} />
                <TextInput style={styles.input} value={rg} onChangeText={(text)=>setRg(text)} placeholder="Put your Rg: " placeholderTextColor={'white'} />
                <TextInput style={[styles.input, {width:200}]}  value={pac} onChangeText={(text)=>setPac(text)} placeholder="Put your pac: " placeholderTextColor={'white'} />

                <View style={{position:"relative", left:215, bottom:27.5}}>
                    <TouchableOpacity onPress={searchPac} style={{borderRadius:2, borderWidth:1, borderColor:"white", padding:4, width:60}}><Text style={{color:"white"}}>Buscar</Text></TouchableOpacity>
                </View>
                <TextInput style={[styles.input, {position:"relative", bottom:32}]} value={public_place} onChangeText={(text)=>setPublic_space(text)} placeholder="Put your public space: " placeholderTextColor={'white'} />
            </View>
            <View style={{top:130, position:"relative"}}>
               <DropdownChoice   />
            </View>
            <View style={{display:"flex", alignItems:"flex-start"}}>
                <TouchableOpacity onPress={createAccount} style={styles.Arrowbutton}>
                    <Ionicons  name="ios-arrow-forward" color={"white"} size={35}/>
                </TouchableOpacity>

            </View>

            <View style={styles.polign}></View>

        </View>
    )
}
    // }   <Text style={styles.input}>{city}</Text>
    // <Text style={styles.input}>{neighborhood}</Text>
    // <Text style={styles.input}>{federative_unit}</Text>
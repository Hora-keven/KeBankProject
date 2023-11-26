import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import Card from '../../components/card.jsx';
import * as Animatable from 'react-native-animatable';
import api from '../../Api/Api';
import { useContext, useState } from 'react';
import { ApiContext } from '../../context/APicontext';


export default function ScreenCards({ navigation }) {
    const {userAccount, user} = useContext(ApiContext)
   

    const askCard = ()=>{

        try {
          
            api.post("creditcard/", {
                    account:userAccount.id

            }).then(function(response){
                console.log(response.data.account)
                api.get("creditcard/?account="+response.data.account).then(function(response){
                   
                    Alert.alert("Liberado pra você!","Limite: " +response.data[0].limit)
                }) 
            }).catch(function(error){
                if(error.response && error.response.status === 400){
                    Alert.alert("Não liberado!", "Pois Você já tem cartão de crédito!")

                    api.get("creditcard/?account="+userAccount.id).then(function(response){
                        console.log(response.data)
                       setTimeout(()=> Alert.alert("Já foi Liberado pra você!","Limite: " +response.data.limit), 3000)
                    }) 
                }
            })
        } catch (error) {
            console.error(error)
           
        }
    }
       
       
    
 
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.rectangle}>
                    <Text style={styles.text}>Meus cartões</Text>
                </View>
                <View style={styles.window}>
                  
                    <Text style={styles.textTitle}> Cartão Crédito</Text>
                  
                    <TouchableOpacity onPress={askCard}>
                        <Text style={{ color: '#155E85', fontSize: 17 }}>+ Solicitar cartão crédito</Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.slides}>
                    <TouchableOpacity style={{backgroundColor:'white',height:100, width:"100%", justifyContent:'center'}}>
                    
                    <Text style={[styles.textTitle, {marginBottom:10}]}> Cartão Débito</Text>
                        <Card/>
                    </TouchableOpacity>
                </View>
                <View style={styles.nameSlogan}>
                    <View style={styles.title}>
                        <Animatable.Text animation='pulse' delay={5000} style={styles.firstName}>Ke</Animatable.Text>
                        <Text style={styles.secondPartName}>Bank</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

import { View, Text, ScrollView,  TouchableOpacity, SafeAreaView } from 'react-native';
import styles from './styles';
import { FlatList } from 'react-native-gesture-handler';
import React, { useContext, useRef, useState } from 'react';
import {   Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { Modalize } from 'react-native-modalize';
import { TextInputMask } from 'react-native-masked-text'

import DropdowmAnything from "../../components/dropdownAnything"
import DialogMessage from './../../components/dialog.jsx';
import { ApiContext } from '../../context/APicontext';
import api from "./../../Api/Api"
import { Alert } from 'react-native';

export default function ScreenLoan({navigation}) {
    const {loan, userAccount} = useContext(ApiContext)

    const[value,setValue]=useState("")
    const maskValue = value.replace("R$", "").replace(/\./g, '').replace("0", "").replace(/\,/g, "").replace("0", "");
    const [investment_type, setInvestment_type] = useState("")


    const Transferencia = [
        {
            id: 1,
            name: 'Contas de casa',
        },
        {
            id: 2,
            name: 'Reformas ou consertos',

        },
        {
            id: 3,
           name: 'Investir no meu negócio', 
    
        },
        {
            id: 4,
            name: 'Viagem',  
        },
        {
            id: 5,
            name: 'Divida',
          
        },
    ];
    const Historico = ({ title }) => (
        <View style={styles.function}>
            <Text style={styles.txt}>{title}</Text>
        
        </View>
        
    );

    const modalizeRef = useRef(<Modalize />);

    function openModal  () {
        
        modalizeRef.current?.open();
        console.log(investment_type)
      
    };


    const sendLoan = ()=>{
        try {
          
            api.post("loan/", {

                account:userAccount.id,
                requested_amount:parseFloat(maskValue),
                installment_quantity:parseInt(loan),  
    
            }).then(function(response){
                if (response.status === 201) {
                   
                    Alert.alert("Empréstimo realizado com sucesso!!", "O valor solicitado foi: "+value)
                  }
        
                console.log(response.status)

            }).catch(function(error){
                if( error.response.status === 400){
                    Alert.alert('Empréstimo negado!', 'O valor pedido é maior que o saldo disponivel. Saldo: '+userAccount.limit);
                }
                console.error(error)
            })
        } catch (error) {
          
            console.error(error)
         
            
        }
        
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.rectangle}>
                    <Text style={styles.text}>Empréstimo</Text>
                </View>
              

              
                <SafeAreaView style={styles.window}>
                    <FlatList
                        data={Transferencia}
                     
                        renderItem={({ item }) => {
                         
                            return (
                                <ScrollView>
                                    <View style={styles.containerTrans}>
                                        <TouchableOpacity onPress={()=>{
                                            openModal()
                                            setInvestment_type(item.name)
                                            
                                            } }>
                                            <Historico title={item.name} />
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            );
                        }} />
                </SafeAreaView>
                <DialogMessage title={"Sobre o empréstimo"} description={"O empréstimo possui um juros de:\n\n20% se parcelar em 12x\n40% se parcelar em 24x\n60% se parcelar em 36x \n\n"} />
                <View style={styles.nameSlogan}>
                    <View style={styles.title}>
                        <Animatable.Text animation='pulse' delay={5000} style={styles.firstName}>Ke</Animatable.Text>
                        <Text style={styles.secondPartName}>Bank</Text>
                    </View>
                </View>
                <Modalize ref={modalizeRef} modalHeight={500} modalStyle={styles.modal}>
                    <View style={styles.confirm}>


                    <TextInputMask 
                            style={[styles.input, { borderBottomColor: 'white', borderBottomWidth: 2 }]}
                                type={'money'}
                                options={{
                                    
                                    precision: 2,
                                    separator: ',',
                                    delimiter: '.',
                                    unit: 'R$',
                                    suffixUnit: ''
                                }}
                                value={value}
                                placeholder={'R$'}
                                placeholderTextColor={'white'}
                                onChangeText={text => {
                                   setValue(text)
                                }}/>

                                <DropdowmAnything label1={"12x"} label2={"24x"} label3={"36x"} value1={12} value2={24} value3={36} placeH={"Parcelas"} color={"white"}/>
                        
                        <TouchableOpacity  style={styles.button} onPress={sendLoan }>
                           <Ionicons size={30} color={"white"} name="ios-arrow-forward" />
                        </TouchableOpacity>
                    </View>
                </Modalize>
            </View>
        </ScrollView>
    );
}

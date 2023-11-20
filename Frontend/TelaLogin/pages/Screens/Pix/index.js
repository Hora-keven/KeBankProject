import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import styles from './stylesP'
import { Ionicons } from '@expo/vector-icons';
import { Alert } from 'react-native';
import React, { useContext, useRef, useState } from 'react';
import { TextInputMask } from 'react-native-masked-text'
import { Modalize } from 'react-native-modalize';
import api from '../../Api/Api';
import { ApiContext } from '../../context/APicontext';

export default function ScreenPix({ navigation }) {

    const [keyPix, setKeyPix] = useState("")
    const[value,setValue]=useState("")
    const {userAccount} = useContext(ApiContext)
   

    const noMaskPix = keyPix.replace(/\.|-/gm, "")
    const maskValue = value.replace("R$", "").replace(/\./g, '');
    
  
    const sendPix =() =>{
        try {
            api.get(`account/?${noMaskPix.length >= 11?'physical_person='+noMaskPix:"juridic_person="+noMaskPix}`).then(function(response){
                console.log(response.data[0])
                console.log(noMaskPix)

                api.post("pix/", {

                    from_account:userAccount.id,
                    value:parseFloat(maskValue),
                    to_account:response.data[0].id
        
                }).then(function(response){
                    console.log(response.data)

                }).catch(function(error){
                   
                    if (error.response && error.response.status === 404) {
                     
                        Alert.alert('Saldo insuficiente!', 'Saldo disponivel é de: '+userAccount.limit);
                      } else {
                       
                        Alert.alert('Erro', 'Ocorreu um erro. Por favor, tente novamente.');
                      }
                })

            }).then(function(response){
              
            }).catch(function(error){
                console.error(error)
              
            })
           

        } catch (error) {
            console.error(error)  
        }
    
    }

    const modalizeRef = useRef(<Modalize />);

    const abrirModal = () => {
    
        modalizeRef.current?.open();
    };
    return (

        <ScrollView style={{ backgroundColor: 'white' }}>
            <View style={styles.container} >

                <View style={styles.rectangle}>
                    <Text style={styles.text}>Pix</Text>
                </View>

                <View style={styles.inputs}>
                 
                    <TextInputMask
                        type='only-numbers'
                        maxLength={14}
                        style={[styles.input, , {borderBottomColor:"black", borderBottomWidth:1, color:"black"}]}
                        value={keyPix}
                        placeholder='Digite a chave do pix:'
                        placeholderTextColor={'black'}
                        onChangeText={text => { setKeyPix(text) }} />
                </View>

                <View>
                    <TouchableOpacity onPress={abrirModal} style={styles.Arrowbutton}>
                        <Ionicons size={40} name="ios-arrow-forward" />
                    </TouchableOpacity>
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

                        <TouchableOpacity  style={styles.button} onPress={sendPix }>
                           <Ionicons size={40} color={"white"} name="ios-arrow-forward" />
                        </TouchableOpacity>
                    </View>
                </Modalize>
                
            
                <View style={styles.nameSlogan}>
                    <View style={styles.title}>
                        <Text style={styles.txt}>Ke</Text>
                        <Text style={styles.secondPartName}>Bank</Text>
                    </View>
                </View>


            </View>
        </ScrollView>


    )
}
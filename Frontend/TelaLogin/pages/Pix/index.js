import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import styles from './stylesP'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Alert } from 'react-native';
import React, { useContext, useRef, useState, useEffect } from 'react';
import { TextInputMask } from 'react-native-masked-text'
import { Modalize } from 'react-native-modalize';
import api from  '../../Api/Api';
import { ApiContext } from '../../context/APicontext';

export default function ScreenPix({ navigation }) {

    const [keyPix, setKeyPix] = useState("")
    const[value,setValue]=useState("")
    const {userAccount} = useContext(ApiContext)
    const [pixMovimentation, setPixMovimentation] = useState([])

    const noMaskPix = keyPix.replace(/\.|-/gm, "")
    const maskValue = value.replace("R$", "").replace(/\./g, '');
    const[sendToAccount, setSendToAccount] = useState({})
  
    const sendPix =() =>{
        try {
         

                api.post("pix/", {

                    from_account:userAccount.id,
                    value:parseFloat(maskValue),
                    to_account:sendToAccount.id
        
                }).then(function(response){
                    console.log(response.data)
                  
                     if(response.status === 201){
                     
                        Alert.alert('Transferencia realizada!',
                         'R$:  '+response.data.value+"\npara: "+sendToAccount.name+"\n\nInstituição\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tKebank\n"+"Agência\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"+sendToAccount.agency+"\n"
                         +"Conta\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"+sendToAccount.number
                         );
                      }
                }).catch(function(error){
                   
                    if (error.response && error.response.status === 404) {
                     
                        Alert.alert('Saldo insuficiente!', 'Saldo disponivel é de: '+userAccount.limit);

                      }
                      
                      else {
                       
                        Alert.alert('Erro', 'Ocorreu um erro. Por favor, tente novamente.');
                      }
                })

           
           

        } catch (error) {
            console.error(error)  
        }
    
    }
    useEffect(() => {
        api.get("pix/?from_account=" + userAccount.id).then(function (response) {
            console.log(response.data)

            const newObjects = response.data.map(each => ({
                name: each.to_account_name.name == null?each.to_account_name.Company_name:each.to_account_name.name,

                cpf_cnpj: each.to_account_name.cpf == null?each.to_account_name.cnpj:each.to_account_name.cpf,

            }));


            setPixMovimentation(newObjects);

        })
    }, [])

    const modalizeRef = useRef(<Modalize />);

    function abrirModal () {
    
        modalizeRef.current?.open();
        getToAccount()
    };
    function getToAccount(){

        api.get(`account/?${noMaskPix.length >= 11?'physical_person='+noMaskPix:"juridic_person="+noMaskPix}`).then(function(response){
            console.log(response.data[0])
            console.log(noMaskPix)

            setSendToAccount({
                id:response.data[0].id,
                name:response.data[0].physical_and_juridic_name.first_name,
                agency:response.data[0].agency,
                number:response.data[0].number+"-"+response.data[0].number_verificate
            })

        }).catch(function(error){
            console.error(error)
          
        })
    }

    const Contacts = ({ title, cpf_cnpj }) => (
        
        <View style={styles.function}>
            <Text style={styles.textT}>Nome: {title}</Text>
            <Text style={styles.txt}>{cpf_cnpj.length == 11?`Cpf: ${cpf_cnpj}`:`Cnpj: ${cpf_cnpj}`}</Text>
         
        </View>

    )
    return (

        <ScrollView style={{ backgroundColor: 'white' }}>
            <View style={styles.container} >

                <View style={styles.rectangle}>
                    <Text style={styles.text}>Pix</Text>
                </View>

                <View style={styles.inputs}>
                 
                    <TextInputMask
                        type={keyPix.length > 13?"cnpj":"cpf"}
                      
                        style={[styles.input, , {borderBottomColor:"black", borderBottomWidth:1, color:"black"}]}
                        value={keyPix}
                        placeholder='Digite a chave do pix:'
                        placeholderTextColor={'black'}
                        onChangeText={text => { setKeyPix(text) }} />
                </View>

                <View>
                    <TouchableOpacity onPress={()=>abrirModal()} style={styles.Arrowbutton}>
                        <Ionicons size={40} name="ios-arrow-forward" />
                    </TouchableOpacity>
                </View>
                <View style={{width:"100%", display:"flex", justifyContent:"center", alignItems:"center", top:150, position:"relative"}}>
                    <Text style={{fontSize:23}}>Contatos cadastrados</Text>
                </View>
                <ScrollView style={{marginTop:199}}>
                    {pixMovimentation.map((item) =>
                        <View style={styles.window}>

                            <View style={styles.containerTrans}>
                               
                                <Contacts title={item.name} cpf_cnpj={item.cpf_cnpj} />
                            </View>

                        </View>
                    )}
                </ScrollView>

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
                        <Text style={[styles.txt, {left:0, fontWeight:700,}]}>Ke</Text>
                        <Text style={styles.secondPartName}>Bank</Text>
                    </View>
                </View>


            </View>
        </ScrollView>


    )
}
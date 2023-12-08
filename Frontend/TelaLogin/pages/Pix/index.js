import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import styles from './stylesP'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Alert } from 'react-native';
import React, { useContext, useRef, useState, useEffect } from 'react';
import { TextInputMask } from 'react-native-masked-text'
import { Modalize } from 'react-native-modalize';
import api from '../../Api/Api';
import { ApiContext } from '../../context/APicontext';

export default function ScreenPix({ navigation }) {

    const [keyPix, setKeyPix] = useState("")
    const [value, setValue] = useState("")
    const { userAccount } = useContext(ApiContext)

    const noMaskPix = keyPix.replace(/\.|-/gm, "")
    const maskValue = value.replace("R$", "").replace(/\./g, '');
    const [sendToAccount, setSendToAccount] = useState({})
  
    const sendPix = () => {
        try {


            api.post("movimentation/", {
                type_movimentation:"Pix",
                from_account: userAccount.id,
                value: parseFloat(maskValue),
                to_account: sendToAccount.id


            }).then(function (response) {
                console.log(response.data)

                if (response.status === 201) {

                    Alert.alert('Transferencia realizada!',
                        'R$:  ' + response.data.value + "\npara: " + sendToAccount.name + "\n\nInstituição\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tKebank\n" + "Agência\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t" + sendToAccount.agency + "\n"
                        + "Conta\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t" + sendToAccount.number
                    );
                }
            }).catch(function (error) {

                if (error.response && error.response.status === 404) {
                    Alert.alert('Saldo insuficiente!', 'Saldo disponivel é de: ' + userAccount.limit)
                }
                else {
                    Alert.alert('Erro', 'Ocorreu um erro. Por favor, tente novamente.');
                }
            })
        } catch (error) {
            console.error(error)
        }
    }


    const modalizeRef = useRef(<Modalize />);
    function abrirModal() {
        modalizeRef.current?.open();
        getToAccount()
    };
    function getToAccount() {

        api.get(`account/?${noMaskPix.length >= 11 ? 'physical_person=' + noMaskPix : "juridic_person=" + noMaskPix}`).then(function (response) {
            console.log(response.data)
            console.log(noMaskPix)

            setSendToAccount({
                id: response.data[0].id,
                name: response.data[0].physical_and_juridic_name.name == null? response.data[0].physical_and_juridic_name.Company_name:response.data[0].physical_and_juridic_name.name,
                agency: response.data[0].agency,
                number: response.data[0].number + "-" + response.data[0].number_verificate
            })

        }).catch(function (error) {
            console.error(error)

        })
    }

   
    return (

        <ScrollView style={{ backgroundColor: 'white' }}>
            <View style={styles.container} >

                <View style={styles.rectangle}>
                    <Text style={styles.text}>Pix</Text>
                </View>

                <View style={styles.inputs}>

                    <TextInputMask
                        type={keyPix.length > 13 ? "cnpj" : "cpf"}

                        style={[styles.input, , { borderBottomColor: "black", borderBottomWidth: 1, color: "black" }]}
                        value={keyPix}
                        placeholder='Digite a chave do pix:'
                        placeholderTextColor={'black'}
                        onChangeText={text => { setKeyPix(text) }} />
                </View>

                <View>
                    <TouchableOpacity onPress={() => abrirModal()} style={styles.Arrowbutton}>
                        <Ionicons size={40} name="ios-arrow-forward" />
                    </TouchableOpacity>
                </View>
            
            

                <Modalize ref={modalizeRef} modalHeight={500} modalStyle={styles.modal}>
                    <View style={styles.confirm}>


                        <TextInputMask
                            style={[styles.input, { borderBottomColor: 'white', borderBottomWidth: 2, color:"white" }]}
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
                            }} />

                        <TouchableOpacity style={{left:185, top:10}} onPress={sendPix}>
                            <Ionicons size={35} color={"white"} name="ios-arrow-forward" />
                        </TouchableOpacity>
                    </View>
                </Modalize>


                <View style={styles.nameSlogan}>
                    <View style={styles.title}>
                        <Text style={[styles.txt, { left: 0, fontWeight: 700, }]}>Ke</Text>
                        <Text style={styles.secondPartName}>Bank</Text>
                    </View>
                </View>


            </View>
        </ScrollView>


    )
}
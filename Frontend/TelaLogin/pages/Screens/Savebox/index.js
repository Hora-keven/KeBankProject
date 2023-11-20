import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native'
import styles from './styles'
import { FlatList } from 'react-native-gesture-handler';
import React, { useRef, useState } from 'react';
import { TextInputMask } from 'react-native-masked-text'
import { Modalize } from 'react-native-modalize';
import sonho from './../../../assets/sonho.jpg'
import carreira from './../../../assets/carreira.jpg'
import viagem from './../../../assets/viagem.jpg'
import casa from './../../../assets/casa.jpg'
export default function ScreenBox({ navigation }) {

    const ContatosCadastrados = [
        {
            id: 1,
            nome: 'Sonho de Consumo',
            img: sonho
        },
        {
            id: 2,
            nome: 'Fazer uma viagem',
            img: viagem
        },
        {
            id: 3,
            nome: 'Reformar a casa',
            img: casa
        },
        {
            id: 4,
            nome: 'Focar na carreira',
            img: carreira
        },


    ]
    const [valor, setValor] = useState("")

    const Contatos = ({ nome, img }) => (

        <View style={styles.function}>
            <Image source={img} style={styles.img} />
            <Text style={styles.txtUser}>{nome}</Text>
        </View>
    )
    const modalizeRef = useRef(<Modalize />);

    const abrirModal = () => {
        modalizeRef.current?.open();

    };
    return (

        <ScrollView style={{ backgroundColor: 'white' }}>
            <View style={styles.container} >

                <View style={styles.rectangle}>
                    <Text style={styles.text}>Caixinhas</Text>
                </View>

                <Modalize ref={modalizeRef} modalHeight={500} modalStyle={styles.modal}>
                    <View style={styles.confirm}>
                        <Text style={{ fontSize: 20, color: 'white' }} color='white'>Digite o valor que você quer guardar: </Text>
                        <View style={{ top: 50 }}>
             
                            <TextInputMask 
                            style={styles.input}
                                type={'money'}
                                options={{
                                    
                                    precision: 2,
                                    separator: ',',
                                    delimiter: '.',
                                    unit: 'R$',
                                    suffixUnit: ''
                                }}
                                value={valor}
                                placeholder={'R$'}
                                placeholderTextColor={'white'}
                                onChangeText={text => {
                                   setValor(text)
                                }}
                            />
                        </View>

                    </View>
                </Modalize>

                <SafeAreaView style={styles.window}>
                    <FlatList
                        data={ContatosCadastrados}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity onPress={abrirModal} >
                                    <Contatos nome={item.nome} img={item.img} />
                                </TouchableOpacity>
                            )
                        }}
                    />
                </SafeAreaView>
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
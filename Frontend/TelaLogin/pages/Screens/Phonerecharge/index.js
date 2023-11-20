import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native'
import styles from './styles'
import { Ionicons } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import React, { useRef, useState } from 'react';
import { TextInputMask } from 'react-native-masked-text'
import { Modalize } from 'react-native-modalize';
import tim from './../../../assets/tim.png'
import vivo from './../../../assets/vivo.png'
import claro from './../../../assets/claro.png'
import anatel from './../../../assets/anatel.png'
export default function ScreenRecharge({ navigation }) {

    const ContatosCadastrados = [
        {
            id: 1,
            nome: 'Tim',
            img: tim
        },
        {
            id: 2,
            nome: 'Claro',
            img: claro
        },
        {
            id: 3,
            nome: 'Vivo',
            img: vivo
        },
        {
            id: 4,
            nome: 'Anatel',
            img: anatel
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
                    <Text style={styles.text}>Recarga de celular</Text>
                </View>

                <Modalize ref={modalizeRef} modalHeight={500} modalStyle={styles.modal}>
                    <View style={styles.confirm}>
                        <Text style={{ fontSize: 20, color: 'white' }} color='white'>Digite o valor que você quer recarregar: </Text>
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
                                onChangeText={v => {
                                   setValor(v)
                                }}
                            />
                        </View>
                        <TouchableOpacity onPress={abrirModal}>
                           <Ionicons style={styles.button} name="ios-arrow-forward" />
                        </TouchableOpacity>

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
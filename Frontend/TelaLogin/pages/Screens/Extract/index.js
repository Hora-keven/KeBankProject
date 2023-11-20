import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, Pressable } from 'react-native'
import styles from './styles'

import { useContext, useEffect, useState } from 'react'
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import api from '../../Api/Api'
import * as Animatable from 'react-native-animatable'
import { ApiContext } from '../../context/APicontext'
export default function ScreenExtract({ navigation }) {
    const { userAccount } = useContext(ApiContext)
    const [movimentation, setMovimentation] = useState([])
    const [icon, setIcon] = useState("")

    useEffect(() => {
        api.get("movimentation/?account=" + userAccount.id).then(function (response) {
            console.log(response.data)
            const newObjects = response.data.map(each => ({
                value: each.value,
                state: each.state

            }));


            setMovimentation(newObjects);

        })
    }, [])

    const Historic = ({ title, valor }) => (

        <View style={styles.function}>
            <Text style={styles.textT} >{title}</Text>
            <Text style={styles.txt}>R${valor}</Text>
           
            <MaterialCommunityIcons name={title == "received"?"transfer-up":"transfer-down"} size={30} style={{ color: "#155e85", bottom: 35 }} />
        </View>

    )

    const typeMovimentation = (title) => {
        switch (title) {
            case "received":
                setIcon("transfer-up")
                break

            case "sent":
                setIcon("transfer-down")
                break
        }

    }

    return (
     
            <View style={styles.container} >
                <View style={styles.rectangle}>
                    <Text style={styles.text}>Extrato</Text>
                </View>
                <View style={styles.inputs}>
                    <TextInput style={styles.input} placeholderTextColor={'black'} placeholder=" Buscar: " />
                </View>

                <View>
                    <TouchableOpacity onPress={() => { navigation.navigate('First') }} style={styles.button}>
                        <Feather name="search" size={24} color="black" style={styles.Arrowbutton} />
                    </TouchableOpacity>
                </View>
              
                <ScrollView style={{ marginTop: 150 }}>
                    {movimentation.map((item) =>
                        <View style={styles.window}>

                            <View style={styles.containerTrans}>
                                <Historic title={item.state} valor={item.value} />
                            </View>

                        </View>
                    )}
                </ScrollView>

                <View style={styles.nameSlogan}>
                    <View style={styles.title}>
                        <Animatable.Text animation='pulse' delay={5000} style={styles.firstName}>Ke</Animatable.Text>
                        <Text style={styles.secondPartName}>Bank</Text>
                    </View>
                </View>
            </View>


      
    )
}
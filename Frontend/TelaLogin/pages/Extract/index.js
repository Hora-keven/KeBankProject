import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, Pressable } from 'react-native'
import styles from './styles'

import { useContext, useEffect, useState } from 'react'
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import api from  '../../Api/Api'
import * as Animatable from 'react-native-animatable'
import { ApiContext } from '../../context/APicontext'
import DropdownAnything from '../../components/dropdownAnything';


export default function ScreenExtract({ navigation }) {
    const { userAccount, loan } = useContext(ApiContext)
    const [movimentation, setMovimentation] = useState([])
    const [searchUser, setSearchUser] = useState("")


    useEffect(() => {
        api.get("movimentation/?account=" + userAccount.id).then(function (response) {
            console.log(response.data)
            
            const newObjects = response.data.map(each => ({
                value: each.value,
                state: each.state,
                date:each.date_hour

            }));


            setMovimentation(newObjects);

        })
    }, [])

    const Historic = ({ title, value, date }) => (
        
        <View style={styles.function}>
            <Text style={styles.textT}>{
                title 
            }</Text>
            <Text style={styles.txt}>R${value}</Text>
            <Text style={styles.txt}>{date}</Text>
           
            <MaterialCommunityIcons name={title == "Transferência enviada"?"transfer-up":"transfer-down"} size={30} style={{ color: "#155e85", bottom: 35 }} />
        </View>

    )

    const search = ()=>{
        api.get(`movimentation/?${loan}=` + searchUser).then(function (response) {
            console.log(response.data)
            const newObjects = response.data.map(each => ({
                value: each.value,
                state: each.state,
                date:each.date_hour

            }));

            console.log("aaaaa")
            setMovimentation(newObjects);

        })
    }

    return (
     
            <View style={styles.container} >
                <View style={styles.rectangle}>
                    <Text style={styles.text}>Extrato</Text>
                </View>
                <View style={styles.inputs}>
                    <DropdownAnything label1={"Estado"} label2={"Data/hora"} label3={"Valor"} value1={"state"} value2={"date_hour"} value3={"value"} placeH={"Filtros"} color={"black"}/>
                    <TextInput style={styles.input} value={searchUser} onChangeText={(text)=>setSearchUser(text)} placeholderTextColor={'black'} placeholder=" Buscar: " />
                </View>

                <View>
                    <TouchableOpacity onPress={search} style={styles.Arrowbutton}>
                        <Feather name="search" size={24} color="black"  />
                    </TouchableOpacity>
                </View>
              
                <ScrollView style={{ marginTop: 150 }}>
                    {movimentation.map((item) =>
                        <View style={styles.window}>

                            <View >
                               
                                <Historic title={item.state} value={item.value} date={item.date} />
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
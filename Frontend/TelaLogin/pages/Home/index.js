import {  Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import styles from './styles'
export default function Home({navigation}){
    return(

    <View style={styles.container}>
        
        <View style={styles.window}>
            <View style={styles.nameSlogan}>
                <Animatable.View animation='fadeInUp'  style={styles.title}>
                    <Animatable.Text animation='pulse' style={styles.txt}>Ke</Animatable.Text>
                    <Text style={styles.secondPartName}>Bank</Text>
                </Animatable.View>
                <Animatable.Text animation='fadeInUp' style={styles.slogan}>O Banco que facilita</Animatable.Text>
            </View>

                <Animatable.View animation='fadeInUp' style={styles.title}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('PhysicalOrJuridic')}} style={styles.title}>
                    <Text style={styles.txtInformation}>Novo aqui? </Text>
                    <Text style={styles.secondInformationTxt}>Cadastre-se</Text>
                    </TouchableOpacity>
                </Animatable.View>

                <Animatable.View animation='fadeInUp'  style={styles.title_two}>
                    <TouchableOpacity  onPress={()=>{navigation.navigate('Login_User')}} style={styles.title}>
                    <Text style={styles.txtInformation}>Já sou </Text>
                    <Text style={styles.secondInformationTxt}>cadastrado</Text>
                    </TouchableOpacity>

              
            </Animatable.View>
        </View>
        <View style={styles.polign}></View>
   
    </View>
    )
}
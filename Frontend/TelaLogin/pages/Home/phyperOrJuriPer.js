
import {  Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import styles from './styles'
export default function PhysicalOrJuridic({navigation}){
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
                    <TouchableOpacity onPress={()=>{navigation.navigate('Physical')}} style={styles.title}>
                    <Text style={styles.txtInformation}>Pessoa Fisica </Text>
                
                    </TouchableOpacity>
                </Animatable.View>

                <Animatable.View animation='fadeInUp'  style={styles.title_two}>
                    <TouchableOpacity  onPress={()=>{navigation.navigate('Juridic')}} style={styles.title}>
                    <Text style={styles.txtInformation}>Pessoa Juridica </Text>
               
                    </TouchableOpacity>

              
            </Animatable.View>
        </View>
        <View style={styles.polign}></View>
   
    </View>
    )
}
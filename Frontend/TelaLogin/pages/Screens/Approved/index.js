import { View, Text, Image, TouchableOpacity} from "react-native";
import styles from "./styles";
import extrato from './../../../assets/extrato.png'
import correct from './../../../assets/correct.png'
export default function ScreenApproved({navigation}){
    return(
        <View style={styles.container}>
            <Image source={correct}/>
            <View style={styles.window}>
                <Text style={styles.text}>Pix realizado com sucesso!</Text>
                <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate("ScreenExtract")}}>
                    <Image style={styles.img} source={extrato}/>
                    <Text style={{fontSize:20, left:10,top:5, color:'#155e85'}}>Compartilhar extrato</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}
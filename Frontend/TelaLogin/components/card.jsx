import { View,Text, Image } from "react-native-animatable";
import chip from "./../assets/chip.png"
import nfc from "./../assets/nfc.png"
import * as Animatable from 'react-native-animatable';
import { StyleSheet} from 'react-native';
import flagCard from "./../assets/flagCard.png"
import { ApiContext } from "../pages/context/APicontext";
import { useContext } from "react";

export default function Card(){
    const { user, cardUser} = useContext(ApiContext)
    const numberFormated = cardUser.number.replace(/(.{4})/g, "$1 ")
    return(
        <View >
            <View style={styles.nameSlogan}>
                <View animation='fadeInUp'  style={styles.title}>
                    <Animatable.Text animation='pulse' style={styles.txt}>Ke</Animatable.Text>
                    <Text style={styles.secondPartName}>Bank</Text>
                    <Image source={nfc} style={styles.nfcC}/>
                </View>
            <Image source={chip} style={styles.chipC}/>
            <Text style={styles.number}>{numberFormated == null?0:numberFormated}</Text>
            <Text style={styles.nameCard}>{user.nameOrCompanyName}</Text>
            <Text style={ {top:9, position:"relative", left:140, color:"white", fontSize:16,}}>{cardUser.validity}</Text>

            <Image source={flagCard} style={ {left:250, bottom:20}}/>

            </View>
        </View>
    )
}


const styles = StyleSheet.create({


    txt:{
        textAlign:'center',
        fontSize:26,
        color:'white',
        fontWeight:'700'
     
    },

    slogan:{
        color:'white',
        borderRadius:3,
        width:'50%',
        textAlign:'center',
        fontSize:20,
        marginBottom:12
        
    },

    nameSlogan:{
        justifyContent:'flex-start',
        alignItems:'flex-start',
        width:'100%',
        height:200,
        borderRadius:10,
        padding:15,
        backgroundColor:"#155e85"
    },

    txtInformation:{
        color:'white',
        fontFamily:'inter',
        fontSize:22,
        marginTop:25,
    },

    secondPartName:{
   
        color:'white',
        fontSize:26
    },

    title:{
        flexDirection:'row',
        textAlign:'center',
       
    },
    chipC:{
        flexDirection:'row',
        textAlign:'center',
        top:25
    },
    
    nameCard:{
  
        fontSize:16,
        top:35,
        color:'white',
        
    },
    number:{
    
        color:'white',
        fontSize:15,
        top:35
    },
    nfcC:{
        left:175,
        top:10
    },
    flagCard:{

    }



  
  });
 
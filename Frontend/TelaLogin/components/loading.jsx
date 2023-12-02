
import { Text, View, ActivityIndicator } from 'react-native'

export default function Loading (){
   
    
   
    return(  
        <View style={{flex:1, justifyContent:"center", alignItems:"center", paddingTop:200}}>
        <ActivityIndicator size={"large"} color={"black"}/>
        <Text>Carregando...</Text>
      </View>)
    
 
}

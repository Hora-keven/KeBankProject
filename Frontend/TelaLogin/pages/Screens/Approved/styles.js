
import { StyleSheet} from 'react-native';

 const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#fff',
        width:'100%',
      },

    window:{
        width:'100%',
        height:'40%',
        margin:0,
        justifyContent:'center',
        alignItems:'center',
    
    },
    text:{
        fontFamily:'sans-serif',
        fontSize:23,
        bottom:51,
     
        color:'black'
  
    },
    button:{
        flexDirection:'row',
        color:'black',
        bottom:40,
    }, 
    img:{
        width:30,
        height:37
    } 
})
export default styles

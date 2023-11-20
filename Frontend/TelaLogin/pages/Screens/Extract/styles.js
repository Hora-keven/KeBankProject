import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'#fff',
      padding:0,
      margin:0,
      width:'100%',
      height:1050,
     
   
    },

    txt:{

        left:34,
        fontSize:15,
        color:'black',
       
 
    },
    firstName:{
      
        fontWeight:700,
        fontSize:20,
        color:'black',
    
       
 
    },
    secondPartName:{
       
        color:'black',
        fontSize:20,
    },
    title:{
        flexDirection:'row'
    },

    nameSlogan:{
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        MarginTop:400,
        left:140
    },
  
   
    inputs:{
        width:'85%',
        top:110

    },
    input:{
       borderBottomWidth:1,
       borderBottomColor:'black',
       width:'100%',
    
    },
   
    rectangle:{
        width:'88%',
        height:'7%',
        backgroundColor:'#155e85',
        borderRadius:8,
        marginTop:50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
  
    window:{
      
        justifyContent:'center',
        alignItems:'center',
        height:100,
        width:350, 
      
    },

    text:{
      
        fontSize:23,
        top:10,
        left:10,
        color:'white'
       
  
    },
    textT:{
     
        fontSize:20,
        top:4,
        left:30,
        color:'black'
    },

    function:{
        marginTop:5,
        backgroundColor:'white',
        width:300,
        height:70, 
        margin:0,
        borderRadius:7,
        borderLeftWidth:2,
        
    },
    slides:{
        backgroundColor:'#155e85',
        width:"99%",
        height:"40%",
        bottom:60,
        position:'relative',
        alignItems:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        
         
    },
    Arrowbutton:{
 
        fontSize:22,
        left:155,
        top:80,
        position:'relative'
      
    },
    textTitle:{
        fontSize:27,

    },

})
export default styles;
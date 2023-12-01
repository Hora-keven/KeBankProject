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
      height:890
    },
    
    txt:{
        
        left:34,
        fontSize:20,
        color:'black',
       
 
    },
    title:{
        flexDirection:'row'
    },
    nameSlogan:{
        justifyContent:'flex-end',
        alignItems:'flex-end',
        width:'100%', 
        right:30,
        top:350,
     
    
    },
    secondPartName:{
       
        color:'black',
        fontSize:20,
    },
    txtUser:{
      
        fontSize:23,
        top:11,
        left:10,
        color:'black'
    },
    inputs:{
        width:'85%',
        bottom:40

    },
    input:{
       borderBottomWidth:1,
       borderBottomColor:'black',
       width:'98%',
    
    },
   

    img:{
        width:50,
        height:50,  
    },
   
    rectangle:{
        width:'88%',
        height:'7%',
        backgroundColor:'#155e85',
        borderRadius:8,
        bottom:310,
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
        height:90,
        width:350, 
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
    text:{
      
        fontSize:23,
        top:11,
        left:10,
        color:'white'
  
    },
    textTitle:{
        fontSize:27,

    },
    function:{
        marginTop:10,
        width:350,
        height:80, 
        marginLeft:3,
        borderRadius:7,
        borderLeftWidth:2,
    },
   
    
    Arrowbutton:{
 
        fontSize:22,
        left:155,
        position:'relative'
      
    },
   
    modal:{
        backgroundColor:'#155e85',
        alignItems:'center',
        display:'flex',
        justifyContent:'center'
    },
    confirm:{
        marginTop:50,
        height:200,
        width:220,
    
    }
  
})
export default styles;
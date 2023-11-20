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
        fontFamily:'Dela gothic alone',
        textAlign:'center',
        fontSize:20,
        color:'black',
        fontWeight:'700',
 
    },
    title:{
        flexDirection:'row'
    },
    nameSlogan:{
        justifyContent:'flex-end',
        alignItems:'flex-end',
        width:'100%', 
        right:30,
        top:120,
     
    },
    secondPartName:{
        fontFamily:'inter',
        color:'black',
        fontSize:20,
    },
    txtUser:{
        fontFamily:'sans-serif',
        fontSize:23,
        bottom:45,
        left:100,
        color:'black'
    },
   
    inputs:{
        width:'85%',
        bottom:10,

    },
    input:{
       borderBottomWidth:1,
       borderBottomColor:'white',
       width:'100%',
       height:40,
       color:'white',
       
    
    },
   
    img:{
        width:50,
        height:50,
        borderRadius:15

       
    },
   
    rectangle:{
        width:'88%',
        height:'6%',
        backgroundColor:'#155e85',
        borderRadius:8,
        bottom:90,
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
        width:'88%',
        height:'60%',
        top:50,
        margin:0,
        justifyContent:'center',
        alignItems:'center',
      
    },

    text:{
        fontFamily:'sans-serif',
        fontSize:23,
        top:11,
        left:10,
        color:'white'
  
    },

    function:{
        marginTop:10,
        backgroundColor:'white',
        width:350,
        height:105, 
        marginLeft:3,
        borderRadius:7,
   
    
    },
    button:{
        fontSize:20,
        color:'white',
        left:335,
        top:70
    },  
   
    
    Arrowbutton:{
        color:'black',
        fontFamily:'inter',
        fontSize:22,
        left:155,
        top:15,
        position:'relative'
      
    },
    textTitle:{
        fontSize:23,
        top:30,
    },
    modal:{
        backgroundColor:'#155e85',
        alignItems:'center',
        display:'flex'
    },
    confirm:{
        marginTop:50,
        height:200
    }
  
})
export default styles;
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
        top:350,
     
    
    },
    secondPartName:{
        fontFamily:'inter',
        color:'black',
        fontSize:20,
    },
    txtUser:{
        fontFamily:'sans-serif',
        fontSize:23,
        top:11,
        left:10,
        color:'black'
    },
   
    inputs:{
        width:'85%',
       bottom:20,

    },
    input:{
       borderBottomWidth:1,
       borderBottomColor:'white',
       width:'100%',
       color:"white"
    
    },
    button:{
        position:"relative",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width:60,
        left:179,
        top:25
    },

    img:{
        width:50,
        height:50,  
    },
   
    rectangle:{
        width:'88%',
        height:'6%',
        backgroundColor:'#155e85',
        borderRadius:8,
       
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        bottom:300

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
        width:350,
        height:80, 
        marginLeft:3,
        borderRadius:7,
        borderLeftWidth:2,
    },
   
    
    Arrowbutton:{
   
        fontSize:32,
        left:155,
        top:10,
        position:'relative'
      
    },
    textTitle:{
        fontSize:23,
        top:10,
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
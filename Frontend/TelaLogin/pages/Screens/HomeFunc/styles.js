import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'#fff',
      padding:0,
      marginTop:0,
      width:'100%',
  
   
     
    },
    txt:{
        fontFamily:'sans-serif',
        textAlign:'center',
        fontSize:20,
        color:'black',
        fontWeight:'700',
 
    },
    title:{
        flexDirection:'row'
   
    },
    nameSlogan:{
        justifyContent:'center',
        alignItems:'center',
        width:'100%', 
        bottom:90,
        left:125
    },
    secondPartName:{
        fontFamily:'sans-serif',
        color:'black',
        fontSize:20,
    },
    txtUser:{
        color:'black',
        fontFamily:'inter',
        fontSize:22,
        bottom:340,
        right:100
    },
   
    inputs:{
        marginTop:12,
        width:'70%',
        borderColor:'white',
        top:100

    },
    input:{
       borderBottomWidth:1,
       borderBottomColor:'white',

       width:'100%',
       color:'white'
    
    },
    button:{
        color:'black',
        fontFamily:'sans-serif',
        fontSize:30,
    },
   
    img:{
        width:70,
        height:70,
        borderRadius:35,
       
    },
   
    containerImgF:{
        width:50,
        height:50,
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    containerImg:{
        width:70,
        height:70,
        position:'relative',
        bottom:290,
        right:210,
        marginTop:410,
        backgroundColor:'#155e85',
        borderRadius:35,
        justifyContent:'center',
        alignItems:'center'
    },
    information:{
        left:125,
        marginTop:120,
      
        
    },
    rectangle:{
        width:'88%',
        height:'10%',
        backgroundColor:'#155e85',
        borderRadius:8,
        bottom:589,
        position:'absolute',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
       

    },
    txtInformation:{
        fontFamily:'inter',
        fontSize:20,
        left:20,
        top:10,
        color:'white',
       
    },
    window:{
        width:'88%',
        height:'70%',
       
        justifyContent:'center',
        alignItems:'center',
        bottom:120,
        backgroundColor:"#fff"
    },

    text:{
        fontFamily:'sans-serif',
        fontSize:18,
       
        textAlign:'center',
        color:'#155e85'
       
        
  
    },
    confirm:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        position:"relative",
        marginTop:45,
   
    
    },
    cameraOuGaleria:{
        display:"flex",
        flexDirection:"row",
        width: 100, 
        height: 100,
       justifyContent:"space-between",
       marginTop:50,
    },

    function:{
        marginTop:1.5,
  
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        width:168,
        height:90, 
        marginBottom:7,
        borderRadius:7,
        marginLeft:3.5,
       borderColor:"#c2c2c2",
       borderWidth:3,
        
    },
    modal:{
        backgroundColor:'#155e85',
        alignItems:'center',
        display:'flex',
        justifyContent:'center'
    },
    slides:{
        backgroundColor:'#155e85',
        width:"99%",
        height:"40%",
        bottom:119,
        borderRadius:7,
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
    imgSlides:{
        width:'90%',
        height:'50%',
        top:10,

    },
    Api:{
        top:30,
        color:'white'
    }
  
})
export default styles;
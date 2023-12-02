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
      height:895
     
    },

    txt:{
     
        left:4,
        fontSize:20,
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
        top:155,
        left:140
    },

    inputs:{
        width:'85%',
        top:80
    },
    input:{
       borderBottomWidth:1,
       borderBottomColor:'black',
       width:'100%',
    
    },
   
    rectangle:{
        width:'88%',
        height:'9%',
        backgroundColor:'#155e85',
        borderRadius:8,
        bottom:120,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
    imgf:{
        width:25,
        height:25.7,
        bottom:24,
    },
    containerImgF:{
        width:100,
     
        
    },
    containerImg:{
        width:70,
        height:'13%',
        position:'relative',
     
        backgroundColor:'#155e85',
        borderRadius:35,
        justifyContent:'center',
        alignItems:'center',
        display:"flex"
    },
  
    window:{
        marginRight:3,
        margin:0,
        justifyContent:'center',
        alignItems:'flex-start',
        top:15,
        width:315
    
      
    },

    text:{
    
        fontSize:23,
        top:10,
        left:10,
        color:'white'
       
  
    },
    textT:{
    
        fontSize:18,
        left:30,
        color:'black'
    },

    function:{
        marginTop:10,
        backgroundColor:'white',
        width:340,
        height:60, 
        marginLeft:3,
        borderRadius:7,
        padding:3,
    },
   
    Arrowbutton:{
        color:'black',
        fontSize:22,
        left:155,
        top:50,
        position:'relative'
      
    },
    textTitle:{
        fontSize:23,
        marginTop:23,

    },
    slides:{
       
        width:"79%",
        height:"40%",
        borderRadius:7,
        position:'relative',
        alignItems:'center',
        justifyContent:'center',
        display:'flex'
,     
      
    },

    Api:{
        top:30,
        color:'white'
    }

})
export default styles;
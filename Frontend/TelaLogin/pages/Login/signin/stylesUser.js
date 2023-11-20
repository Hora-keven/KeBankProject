import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'#155e85',
      padding:0,
      margin:0,
      width:'100%'
    },
    txt:{
    
        textAlign:'center',
        fontSize:76,
        color:'white',
        fontWeight:'700'
      
    },
    slogan:{
        color:'white',
        borderRadius:3,
        width:'50%',
        textAlign:'center',
        fontSize:22
    },
    nameSlogan:{
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        top:90
    },
    txtInformation:{
        color:'white',
      
        fontSize:22,
        marginTop:30,
    },
    secondPartName:{
     
        color:'white',
        fontSize:76
    },
    title:{
        flexDirection:'row'
    },
    inputs:{
        marginTop:12,
        width:'70%',
        borderColor:'white',
        top:150


    },
    input:{
        borderWidth:0,
        borderBottomWidth:1,
        borderBottomColor:'white',
        marginTop:20,
        width:'100%',
        backgroundColor:'#155e85',
        color:"white"
    
    },
    Arrowbutton:{
        top:170,
        left:120,
        display:"flex",
        alignItems:"center"
    },
    polign:{
        backgroundColor:'white',
        width:'154%',
        height:'30%',
        transform:'rotate(15.5deg)',
        position:'relative',
        top:250,
        right:60
        
    },

})
export default styles;
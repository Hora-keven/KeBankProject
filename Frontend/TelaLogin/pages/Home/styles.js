import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'#155e85',
      
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
        fontSize:20,
        marginBottom:12
        
    },

    nameSlogan:{
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
    },

    txtInformation:{
        color:'white',
        
        fontSize:22,
        marginTop:25,
    },

    secondPartName:{
       
        color:'white',
        fontSize:76
    },

    title:{
        flexDirection:'row',
        textAlign:'center',
       
    },
    title_two:{
        flexDirection:'row',
        textAlign:'center',
        bottom:10
    },
    
    secondInformationTxt:{
      
        fontSize:22,
        marginTop:25,
        color:'#BDE3FF',
        
    },

    polign:{
        backgroundColor:'white',
        width:'145%',
        height:'40%',
        transform:'rotate(15.5deg)',
        position:'relative',
        top:100,
        right:60
        
    },

    window:{
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        marginTop:'80%',
        
    },

  
  });
  export default styles;
import {Dropdown} from "react-native-element-dropdown";
import { ApiContext }  from "./../context/APicontext";
import { useContext } from "react";

function DropdownChoice({quanti}){
    const {optionAccount, changeOptionAccount} = useContext(ApiContext)
    
    const options = [
        {label:'Current', value:"Current"},
        {label:'Poupation', value:"Poupation"},
        
    ]
    return(
    
    <Dropdown data={options} placeholder="Tipo conta" placeholderStyle={{color:"white"}} value={optionAccount} style={{width:130, color:"white"}} onChange={item=>{changeOptionAccount(item.value)}} labelField="label"
    valueField="value"/>
    )
}


export default DropdownChoice


import {Dropdown} from "react-native-element-dropdown";
import { ApiContext } from "../pages/context/APicontext";
import { useContext } from "react";

function DropdownAnything({label1, label2, label3, value1, value2, value3, placeH, color}){
    const {loan, changeLoan} = useContext(ApiContext)
    
    const options = [
        {label:label1, value:value1},
        {label:label2, value:value2},
        {label:label3, value:value3},
        
    ]
    return(
    <Dropdown data={options}  placeholder={placeH} placeholderStyle={{color:"white"}} value={loan} style={{width:130, color:color=="black"?"black":"white"}} onChange={item=>{changeLoan(item.value)}} labelField="label"
    valueField="value"/>
    )
}

export default DropdownAnything
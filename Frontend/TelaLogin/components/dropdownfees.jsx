import {Dropdown} from "react-native-element-dropdown";
import { ApiContext } from "../pages/context/APicontext";
import { useContext } from "react";

function DropdownFees(){
    const {loan, changeLoan} = useContext(ApiContext)
    
    const options = [
        {label:'12x', value:"12x"},
        {label:'24x', value:"24x"},
        {label:'36x', value:"36x"},
        
    ]
    return(
    <Dropdown data={options} placeholder="Parcelas" placeholderStyle={{color:"white"}} value={loan} style={{width:100, color:"white"}} onChange={item=>{changeLoan(item.value)}} labelField="label"
    valueField="value"/>
    )
}

export default DropdownFees
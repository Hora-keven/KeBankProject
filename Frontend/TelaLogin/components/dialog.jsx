
import { useState } from "react";
import { View } from "react-native";
import Dialog from "react-native-dialog";


export default function DialogMessage({title, description}){
    const [visible, setVisible] = useState(true)
  
    return(
        <View>
            <Dialog.Container visible={visible}>
                <Dialog.Title>{title}</Dialog.Title>
                <Dialog.Description>{description}</Dialog.Description>
                <Dialog.Button label="OK"  onPress={()=>setVisible(false)}/>
            </Dialog.Container>
        </View>
    )
}
import { View, Text, TextInput, Alert } from "react-native";
import styles from "./styles";
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";
import { useContext, useState } from 'react';
import { TextInputMask } from "react-native-masked-text";
import { ApiContext } from "../../../context/APicontext";

import api from "../../../Api/Api"; "../../Api/Api";
import DropdownChoice from "../../../components/dropdown.jsx";
import apiCep from "./../../../Api/ApiCep.jsx";

export default function Physical({ navigation }) {
    const { user, userLog, tokenUser, token, optionAccount, cardUserLog, informationsAccountUser } = useContext(ApiContext)
    const [bornDate, setBornDate] = useState("")
    const [cpf, setCpf] = useState("")
    const [rg, setRg] = useState("")
    const [city, setCity] = useState("")
    const [neighborhood, setNeighborhood] = useState("")
    const [federative_unit, setFederative_unit] = useState("")
    const [pac, setPac] = useState("")
    const [public_place, setPublic_space] = useState("")
    const [name, setName] = useState()
    const [number, setNumber] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [street, setStreet] = useState("")
    const noMaskCpf = cpf.replace(/\.|-/gm, "")

    const createAccount = async () => {


        try {
            api.defaults.headers.Authorization = `Token ${token}`
            api.post('physicalperson/', {
                fk_user: user.id,
                born_date: bornDate,
                cpf: noMaskCpf,
                rg: rg,


            }).then(function (response) {

                try {
                    api.post("address/", {
                        city: city,
                        neighborhood: neighborhood,
                        federative_unit: federative_unit,
                        pac: pac,
                        street: street,
                        public_place: public_place,
                        physical_person: noMaskCpf

                    }).then(function (response) {
                        try {
                            api.post('account/', {
                                type_account: optionAccount,
                                physical_person: noMaskCpf

                            }).then(function (response) {

                                try {
                                    api.get("account/?physical_person=" + noMaskCpf).then(function (response) {
                                        console.log(response.data[0].id)
                                        informationsAccountUser(
                                            response.data[0].id,
                                            response.data[0].agency,
                                            response.data[0].number_verificate,
                                            response.data[0].number,
                                            response.data[0].limit

                                        )

                                       navigation.navigate("First")

                                    }).catch(function (error) {
                                        console.error(error)
                                    })

                                } catch (error) {
                                    console.error(error)
                                }
                            })
                        } catch (error) {
                            console.error(error)
                        }
                    })
                } catch (error) {
                    console.error(error);
                }

            })
                .catch(function (error) {
                    console.error(error);
                });

        } catch (error) {
            console.log(error)
        }
    }


    const createUser = async () => {
        try {

            api.post('users/', {
                cpf_cnpj: noMaskCpf,
                first_name: name,
                surname: lastName,
                email: email,
                password: password,
                phone_number: number

            }).then(function (response) {
                userLog(response.data.id, name, email, noMaskCpf)

                try {
                    api.post('auth/token/login/', {
                        cpf_cnpj: noMaskCpf,
                        password: password

                    }).then(function (response) {
                        tokenUser(response.data.auth_token)
                      


                    }).catch(function (error) {
                        console.error(error);
                    });

                } catch (error) {
                    console.log(error)
                }

            })
                .catch(function (error) {
                    console.error(error);
                });

        } catch (error) {
            console.log(error)
        }
    }


    const searchPac = () => {

        apiCep.get(`${pac}/json`).then(function (response) {
            setCity(response.data.localidade)
            setFederative_unit(response.data.uf)
            setNeighborhood(response.data.bairro)
            setStreet(response.data.logradouro)

            createUser()

        }).catch(function (error) {
            console.error(error)
            console.log("error")

        })

    }

    return (
        <View style={styles.container}>

            <View style={styles.nameSlogan}>
                <View style={styles.title}>
                    <Text style={styles.txt}>Ke</Text>
                    <Text style={styles.secondPartName}>Bank</Text>
                </View>
            </View>

            <View style={styles.inputs}>
                <TextInput style={styles.input} value={name} onChangeText={(text) => setName(text)} placeholder="DIgite seu nome:" placeholderTextColor={'white'} />
                <TextInput style={styles.input} value={lastName} onChangeText={setLastName} placeholder="DIgite seu sobrenome:" placeholderTextColor={'white'} />
                <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Digite seu e-mail: " placeholderTextColor={'white'} />
                <TextInputMask
                    style={styles.input}
                    type={'cel-phone'}
                    placeholder={"Digite seu número de telefone:"}
                    placeholderTextColor={"white"}
                    options={{
                        maskType: 'BRL',
                        withDDD: true,
                        dddMask: '(99) '
                    }}
                    value={number}
                    onChangeText={text => {
                      setNumber(text)
                    }}
                />
                <TextInput style={styles.input} secureTextEntry={true} value={password} onChangeText={(text) => setPassword(text)} placeholder="Crie sua senha: " placeholderTextColor={'white'} />
                <TextInput style={styles.input} value={bornDate} onChangeText={(text) => setBornDate(text)} placeholder="Digite sua data de nascimento: " placeholderTextColor={'white'} />

                <TextInputMask
                    type='cpf'
                    style={styles.input
                    } value={cpf}
                    onChangeText={(text) => setCpf(text)}
                    placeholder="Digite seu CPF:"
                    placeholderTextColor={"white"} />

                <TextInput style={styles.input} value={rg} onChangeText={(text) => setRg(text)} placeholder="Digite seu Rg: " placeholderTextColor={'white'} />
                <TextInput style={[styles.input, { width: 200 }]} value={pac} onChangeText={(text) => setPac(text)} placeholder="Digite seu CEP: " placeholderTextColor={'white'} />

                <View style={{ position: "relative", left: 215, bottom: 27.5 }}>
                    <TouchableOpacity onPress={searchPac} style={{ borderRadius: 2, borderWidth: 1, borderColor: "white", padding: 4, width: 60 }}><Text style={{ color: "white" }}>Buscar</Text></TouchableOpacity>
                </View>
                <TextInput style={[styles.input, { position: "relative", bottom: 32 }]} value={public_place} onChangeText={(text) => setPublic_space(text)} placeholder="Complemento: " placeholderTextColor={'white'} />
            </View>
            <View style={{ top: 130, position: "relative" }}>
                <DropdownChoice />
            </View>
            <View style={{ display: "flex", alignItems: "flex-start" }}>
                <TouchableOpacity onPress={createAccount} style={styles.Arrowbutton}>
                    <Ionicons name="ios-arrow-forward" color={"white"} size={35} />
                </TouchableOpacity>

            </View>

            <View style={styles.polign}></View>

        </View>
    )
}
    // }   <Text style={styles.input}>{city}</Text>
    // <Text style={styles.input}>{neighborhood}</Text>
    // <Text style={styles.input}>{federative_unit}</Text>
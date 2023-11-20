import { createContext, useState } from "react";


export const ApiContext = createContext({})

function ApiProvider({children}){
    const [token, setToken] = useState()
    const [user, setUser] = useState({})
    const [optionAccount, setAccount] = useState()
    const [userAccount, setUserAccount]= useState({})
    const [cardUser, setCardUser] = useState({})
    const [loan, setLoan] = useState()
    function userLog(id, nameOrCompanyName, email, cpfCnpj){

        setUser({
            id:id,
            nameOrCompanyName:nameOrCompanyName,
            email:email,
            cpfCnpj:cpfCnpj

        })

    }
   
    const informationsAccountUser = (id, agency, numberVerificate, number, limit )=>{
        setUserAccount({
            id:id,
            agency:agency,
            numberVerificate:numberVerificate,
            number:number,
            limit:limit

        })
    }
    const tokenUser = (tokenE) =>{
        setToken(tokenE)
    }

    const changeOptionAccount = (account) => {
        setAccount(account)
    }
    const changeLoan = (loan) => {
        setLoan(loan)
    }
    const cardUserLog = (number, validity) =>{
        setCardUser({
            number:number,
            validity:validity
        })
}  
    return (
    <ApiContext.Provider value={{token ,cardUser, cardUserLog, changeLoan, loan, tokenUser, userAccount, user, informationsAccountUser, userLog, changeOptionAccount, optionAccount}}>{children}</ApiContext.Provider>
    )
}

export default ApiProvider
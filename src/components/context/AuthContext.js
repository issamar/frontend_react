import React, {createContext, useEffect, useState} from 'react'
import jwtDecode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'


const AuthContext = createContext()

export default AuthContext

export const AuthProvider= ({children})=>{
    
    let [user,setUser] = useState(()=> localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null)
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let navigate = useNavigate()
    let [loading, setLoading] = useState(true)
    
    
    
    let loginUser = async (e ) =>{
        e.preventDefault()
        
        let response = await fetch('/account/token/',{
            method: 'POST',
            headers : {
                'Content-Type' : 'application/json',  
            },
            body:JSON.stringify({'username':e.target.username.value , 'password' : e.target.password.value})
        })
        let data = await response.json()
        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/all')
        }else{
            alert('something wrong')
        }
    } 


    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    let updateToken= async()=>{
        console.log(authTokens?.refresh)
        let response = await fetch('/account/token/refresh/',{
            method: 'POST',
            headers : {
                'Content-Type' : 'application/json',  
            },
            body:JSON.stringify({'refresh' : authTokens?.refresh})
        })
        let data = await response.json()
        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            
        }else{
            logoutUser()
        }
        if(loading){
            setLoading(false)
        }
    }


    let contextData = {
        user : user,
        authTokens : authTokens,
        loginUser: loginUser,
        logoutUser : logoutUser,
    }

    useEffect(()=>{
        if(loading){
            updateToken()
        }
        let fourMinutes = 1000 * 60 * 4
        let interval = setInterval(()=>{
            if(authTokens){
                updateToken()
            }
        },fourMinutes

        ) 
        
        return ()=> clearInterval(interval)
    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
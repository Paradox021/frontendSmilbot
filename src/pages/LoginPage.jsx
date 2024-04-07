import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext";


const LoginPage = () =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    async function handleSubmit(e){
        e.preventDefault()
        console.log(import.meta.env.VITE_BACKEND_URL)
        const response = await fetch(import.meta.env.VITE_BACKEND_URL+'/auth/login',
        {
          method:'POST',
          headers: {
            'Content-Type':'application/json',
            // 'Authorization': 'bearer xxxxxxx'
          },
          body: JSON.stringify( { email,  password } )  
        })
        if(!response.ok){
            console.log('error en la peticion:')
        }else{
            //TODO mostrar un mensaje tipo toast
            const json = await response.json()
            localStorage.setItem('token', json.token);
            setIsAuthenticated(true);
            navigate(from, { replace: true });
        }
    }
    return <>
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="email">Email</label>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="email" value={email} 
                onChange={(e)=>setEmail(e.target.value)}/>
        
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="password">Password</label>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="password" id="password" value={password} 
                onChange={(e)=>setPassword(e.target.value)}/>
            
            <div className="mt-4">
                <Button type='submit'>Loguearse</Button>
            </div>
        </form>
    </>

}

export default LoginPage
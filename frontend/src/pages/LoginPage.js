import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../userContext';

const LoginPage = () => {

    const port = "http://localhost:5000"

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false)
    const {setUserInfo} = useContext(UserContext)

    async function login(ev) {
        ev.preventDefault();
        const response = await fetch(`${port}/login`, {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        if (response.ok) {
            // loguin successfull
            response.json().then(userInfo => {
                setUserInfo(userInfo)
                setRedirect(true)
            })
        } else{
            alert('wrong credentials')
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }
    

    return (
        <div>
            <form action='' className='login' onSubmit={login}>
                <h1>Login</h1>
                <input
                    type='text'
                    placeholder='username'
                    value={username}
                    onChange={ev => setUsername(ev.target.value)}
                />
                <input
                    type='password'
                    placeholder='password'
                    value={password}
                    onChange={ev => setPassword(ev.target.value)}
                />
                <button>Login</button>
            </form>
        </div>
    )
}

export default LoginPage
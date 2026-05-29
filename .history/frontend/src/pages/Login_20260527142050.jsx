import { useState } from 'react'
import axios from 'axios'

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {

        try {

            const res = await axios.post(
                'http://localhost:5000/login',
                {
                    email,
                    password
                }
            )

            localStorage.setItem(
                'token',
                res.data.token
            )

            alert('Login Successful')

            window.location.reload()

        } catch (error) {

            alert('Login Failed')
        }
    }

    return (

        <div style={{
            padding: '40px'
        }}>

            <h1>Login</h1>

            <input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={handleLogin}>
                Login
            </button>

        </div>
    )
}

export default Login
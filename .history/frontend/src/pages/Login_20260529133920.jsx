import { Link } from 'react-router-dom'

import { useState } from 'react'

import API from '../services/api'

function Login() {

    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')

    const handleLogin = async () => {

        try {

            const response = await API.post(
                '/login',
                {
                    email,
                    password
                }
            )

            console.log(response.data)

            localStorage.setItem(
                'token',
                response.data.token
            )

            alert('Login Successful')

            window.location.reload()

        } catch (error) {

            console.log(error)

            alert('Login Failed')
        }
    }

    return (

        <div className="p-10">

            <h1 className="text-4xl mb-5">
                Login
            </h1>

            <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded bg-white text-black mb-5"
            />

            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded bg-white text-black mb-5"
            />

            <button
                onClick={handleLogin}
                className="bg-green-500 text-white px-5 py-2 rounded"
            >
                Login
            </button>



        </div>
    )
}

export default Login
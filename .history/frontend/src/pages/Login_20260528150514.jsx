import { useState } from 'react'
import axios from 'axios'

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

    console.log(error.response)

    console.log(error.response.data)

    alert('Login Failed')
}
}
    return (

        <div style={{ padding: '40px' }}>

            <h1>Login</h1>

           <input
    type="text"
    placeholder="Email"
    onChange={(e) => setEmail(e.target.value)}
    className="w-full p-3 rounded bg-white text-black"
/>
            <br /><br />

           <input
    type="password"
    placeholder="Password"
    onChange={(e) => setPassword(e.target.value)}
    className="w-full p-3 rounded bg-white text-black"
/>

            <br /><br />

           <button
    onClick={handleLogin}
    className="bg-green-500 text-white px-5 py-2 rounded mt-5"
>
    Login
</button>

        </div>
    )
}

export default Login
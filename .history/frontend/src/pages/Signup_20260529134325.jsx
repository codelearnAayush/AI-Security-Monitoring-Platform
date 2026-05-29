import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
function Signup() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
const handleSignup = async () => {

    try {

        await axios.post(
            'http://localhost:5000/signup',
            {
                name,
                email,
                password
            }
        )

        alert('Signup Successful')

    } catch (error) {

        alert('Signup Failed')
    }
}

    return (

        <div style={{ padding: '40px' }}>

            <h1>Signup</h1>

            <input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
            />

            <br /><br />

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
    onClick={handleSignup}
    className="bg-cyan-500 text-white px-5 py-2 rounded mt-5"
>
    Signup
</button>
<p className="mt-5 text-white">

    Already have an account?

    <Link
        to="/login"
        className="text-cyan-400 ml-2"
    >
        Login
    </Link>

</p>
        </div>
    )
}

export default Signup
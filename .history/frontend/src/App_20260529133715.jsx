import Login from './pages/Login'

import Signup from './pages/Signup'

import Dashboard from './components/Dashboard'

function App() {

    const token = localStorage.getItem(
        'token'
    )

    return (

        <div>

            {
                token
                    ? <Dashboard />
                    : <Login />
            }

        </div>
    )
}

export default App
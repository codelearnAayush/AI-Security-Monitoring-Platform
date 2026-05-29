import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './components/Dashboard'

function App() {

    const token = localStorage.getItem('token')

    return (

        <div>

            {
                token ? (

                    <Dashboard />

                ) : (

                    <div>

                        <Signup />

                        <Login />

                    </div>
                )
            }

        </div>
    )
}

export default App
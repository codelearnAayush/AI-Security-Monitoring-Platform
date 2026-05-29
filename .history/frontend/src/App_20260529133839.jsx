import {

    BrowserRouter,
    Routes,
    Route,
    Navigate

} from 'react-router-dom'

import Login from './pages/Login'

import Signup from './pages/Signup'

import Dashboard from './components/Dashboard'

function App() {

    const token = localStorage.getItem(
        'token'
    )

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/login"
                    element={
                        token
                            ? <Navigate to="/" />
                            : <Login />
                    }
                />

                <Route
                    path="/signup"
                    element={
                        token
                            ? <Navigate to="/" />
                            : <Signup />
                    }
                />

                <Route
                    path="/"
                    element={
                        token
                            ? <Dashboard />
                            : <Navigate to="/login" />
                    }
                />

            </Routes>

        </BrowserRouter>
    )
}

export default App
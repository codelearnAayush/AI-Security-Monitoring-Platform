import {

    BrowserRouter,
    Routes,
    Route

} from 'react-router-dom'

import Dashboard from './components/Dashboard'

import Analytics from './pages/Analytics'

import ThreatLogs from './pages/ThreatLogs'

import Monitoring from './pages/Monitoring'

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Dashboard />}
                />

                <Route
                    path="/analytics"
                    element={<Analytics />}
                />

                <Route
                    path="/logs"
                    element={<ThreatLogs />}
                />

                <Route
                    path="/monitoring"
                    element={<Monitoring />}
                />

            </Routes>

        </BrowserRouter>
    )
}

export default App
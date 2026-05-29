import { useState, useEffect } from 'react'
import API from '../services/api'
import ThreatCard from './ThreatCard'
import UrlScanner from './UrlScanner'

function Dashboard() {

    const [result, setResult] = useState('No Activity Checked')

    const [threats, setThreats] = useState([])

    // Check activity
    const checkActivity = async () => {

        try {

            const response = await API.post(
                '/check-activity',
                {
                    activity: 100
                }
            )

            setResult(response.data.result)

            // Refresh threat history
            fetchThreats()

        } catch (error) {

            console.log(error)
        }
    }

    // Fetch threat history
    const fetchThreats = async () => {

        try {

            const response = await API.get('/threats')

            setThreats(response.data)

        } catch (error) {

            console.log(error)
        }
    }

    // Load threats on page open
    useEffect(() => {

        fetchThreats()

    }, [])

    return (

        <div style={{ padding: '20px' }}>

            <h1>AI Security Dashboard</h1>

            <button onClick={() => {

                localStorage.removeItem('token')

                window.location.reload()

            }}>
                Logout
            </button>

            <br /><br />

            <button
                onClick={checkActivity}
                style={{
                    padding: '10px',
                    marginBottom: '20px'
                }}
            >
                Check Suspicious Activity
            </button>

            <ThreatCard
                title='Threat Detection Result'
                value={result}
            />

            <h2>Recent Threat Logs</h2>

            {
                threats.map((threat, index) => (

                    <div
                        key={index}
                        style={{
                            border: '1px solid gray',
                            padding: '10px',
                            marginBottom: '10px'
                        }}
                    >

                        <p>
                            <strong>Activity:</strong>
                            {' '}
                            {threat.activity}
                        </p>

                        <p>
                            <strong>Result:</strong>
                            {' '}
                            {threat.result}
                        </p>

                        <p>
                            <strong>Time:</strong>
                            {' '}
                            {
                                new Date(
                                    threat.createdAt
                                ).toLocaleString()
                            }
                        </p>

                    </div>
                ))
            }

        </div>   
    )
}


export default Dashboard
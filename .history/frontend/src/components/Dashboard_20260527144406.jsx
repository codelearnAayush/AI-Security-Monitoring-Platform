import { useState, useEffect } from 'react'
import API from '../services/api'
import ThreatCard from './ThreatCard'

function Dashboard() {

    const [result, setResult] = useState('No Activity Checked')
     const [threats, setThreats] = useState([])

    const checkActivity = async () => {

        try {

            const response = await API.post(
                '/check-activity',
                {
                    activity: 100
                }
            )

            setResult(response.data.result)

        } catch (error) {

            console.log(error)
        }
    }

    const fetchThreats = async () => {

    try {

        const response = await API.get('/threats')

        setThreats(response.data)

    } catch (error) {

        console.log(error)
    }
}

    return (
        <div style={{ padding: '20px' }}>

            <h1>AI Security Dashboard</h1>

            <button onClick={() => {

    localStorage.removeItem('token')

    window.location.reload()

}}>
    Logout
</button>

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

        </div>

        
    )
}

export default Dashboard
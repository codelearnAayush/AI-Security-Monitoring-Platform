import { useState } from 'react'
import API from '../services/api'
import ThreatCard from '../components/ThreatCard'

function Dashboard() {

    const [result, setResult] = useState('No Activity Checked')

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
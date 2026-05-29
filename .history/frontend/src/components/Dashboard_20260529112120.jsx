
import { useState, useEffect } from 'react'

import API from '../services/api'

import UrlScanner from './UrlScanner'

import { io } from 'socket.io-client'

const socket = io(
    'http://localhost:5000'
)


function Dashboard() {


    const [liveAlert, setLiveAlert] = useState('')
       useEffect(() => {

        socket.on(
            'threat-alert',
            (data) => {

                setLiveAlert(data.message)
            }
        )

    }, [])

}
    const [result, setResult] = useState(
        'No Activity Checked'
    )

    const [threats, setThreats] = useEffec([])
const [clicks, setClicks] = useState(0)
   const checkActivity = async () => {

    try {

        const activityScore = Math.floor(Math.random() * 300)

        console.log(
            'Activity Score:',
            activityScore
        )

        const response = await API.post(
            '/check-activity',
            {
                activity: activityScore
            }
        )

        setResult(
            `${response.data.result} (Score: ${activityScore})`
        )

        fetchThreats()

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

    useEffect(() => {

        fetchThreats()

    }, [])

    useEffect(() => {

    const trackClicks = () => {

        setClicks(prev => prev + 1)
    }

    window.addEventListener(
        'click',
        trackClicks
    )

    return () => {

        window.removeEventListener(
            'click',
            trackClicks
        )
    }

}, [])

    return (

        <div className="min-h-screen bg-slate-900 text-white flex">

            {/* Sidebar */}
            <div className="w-64 bg-slate-800 p-5">

                <h1 className="text-3xl font-bold text-cyan-400 mb-10">
                    AI Security
                </h1>

                <ul className="space-y-5 text-lg">

                    <li className="hover:text-cyan-400 cursor-pointer">
                        Dashboard
                    </li>

                    <li className="hover:text-cyan-400 cursor-pointer">
                        Threat Logs
                    </li>

                    <li className="hover:text-cyan-400 cursor-pointer">
                        Analytics
                    </li>

                    <li className="hover:text-cyan-400 cursor-pointer">
                        Monitoring
                    </li>

                </ul>

                <button
                    onClick={() => {

                        localStorage.removeItem('token')

                        window.location.reload()

                    }}

                    className="mt-10 bg-red-500 px-5 py-2 rounded text-white"
                >
                    Logout
                </button>

            </div>

            {/* Main Dashboard */}
            <div className="flex-1 p-10">

                <h1 className="text-4xl font-bold text-cyan-400 mb-10">
                    AI Security Dashboard
                </h1>

                {/* Threat Card */}
                <div className="bg-slate-800 p-6 rounded-xl shadow-lg">

                    <h2 className="text-2xl font-bold mb-5">
                        Threat Detection Result
                    </h2>

                    <p className="text-xl mt-3">
    Total Clicks:
    {' '}
    {clicks}
</p>

                    <p className="text-3xl text-green-400 font-bold">
                        {result}
                    </p>

                    <button
                        onClick={checkActivity}
                        className="mt-5 bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded text-white"
                    >
                        Check Suspicious Activity
                    </button>

                </div>

                {/* Threat Logs */}
                <div className="bg-slate-800 p-6 rounded-xl shadow-lg mt-10">

                    <h2 className="text-2xl font-bold mb-5">
                        Recent Threat Logs
                    </h2>

                    {
                        threats.map((threat, index) => (

                            <div
                                key={index}
                                className="bg-slate-700 p-4 rounded mb-4"
                            >

                                <p className="text-white">
                                    <strong>Activity:</strong>
                                    {' '}
                                    {threat.activity}
                                </p>

                                <p className="text-white">
                                    <strong>Result:</strong>
                                    {' '}
                                    {threat.result}
                                </p>

                                <p className="text-gray-300">
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

                {/* URL Scanner */}
                <UrlScanner />

            </div>

        </div>
    )


export default Dashboard
import ThreatChart from '../components/ThreatChart'

function Analytics() {

    const threats = [

        { activity: 50 },

        { activity: 120 },

        { activity: 80 },

        { activity: 200 },

        { activity: 160 }

    ]

    return (

        <div className="min-h-screen bg-slate-900 text-white p-10">

            <h1 className="text-4xl font-bold text-cyan-400 mb-10">

                Analytics Dashboard

            </h1>

            <ThreatChart threats={threats} />

        </div>
    )
}

export default Analytics
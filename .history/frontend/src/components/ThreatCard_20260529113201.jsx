import {

    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer

} from 'recharts'

function ThreatCard({ threats }) {

    const chartData = threats.map(
        (threat, index) => ({

            name: `Log ${index + 1}`,

            activity: threat.activity
        })
    )

    return (

        <div className="bg-slate-800 p-6 rounded-xl shadow-lg mt-10">

            <h2 className="text-2xl font-bold mb-5 text-cyan-400">
                Threat Analytics
            </h2>

            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <LineChart data={chartData}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="name" />

                    <YAxis />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="activity"
                        stroke="#06b6d4"
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>
    )
}

export default ThreatChart
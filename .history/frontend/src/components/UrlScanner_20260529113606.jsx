import { useState } from 'react'

import API from '../services/api'

function UrlScanner() {

    const [url, setUrl] = useState('')

    const [result, setResult] = useState('')
    const [risk, setRisk] = useState(0)

    const scanUrl = async () => {

        try {

            const response = await API.post(
                '/scan-url',
                {
                    url
                }
            )

            setResult(response.data.result)
setRisk(response.data.risk)

        } catch (error) {

            console.log(error)
        }
    }

    return (

        <div className="bg-slate-800 p-6 rounded-xl mt-10 shadow-lg">

            <h2 className="text-2xl font-bold mb-5 text-red-400">
                Phishing URL Detector
            </h2>

            <input
                type="text"
                placeholder="Enter Website URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full p-3 rounded bg-white text-black"
            />

            <button
                onClick={scanUrl}
                className="mt-5 bg-red-500 hover:bg-red-600 px-5 py-2 rounded text-white"
            >
                Scan URL
            </button>

            {
                result && (

                    <h2 className="mt-5 text-xl font-bold text-green-400">
                        Result:
                        {' '}
                        {result}
                    </h2>
                )
            }

        </div>
    )
}

export default UrlScanner
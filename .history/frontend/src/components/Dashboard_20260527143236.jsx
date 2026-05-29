function Dashboard() {

    return (

        <div style={{ padding: '40px' }}>

            <h1>AI Security Dashboard</h1>

            <button onClick={() => {

                localStorage.removeItem('token')

                window.location.reload()

            }}>
                Logout
            </button>

            <br /><br />

            <h2>Threat Detection Result</h2>

            <h1>No Activity Checked</h1>

        </div>
    )
}

export default Dashboard
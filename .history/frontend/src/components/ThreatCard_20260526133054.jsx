function ThreatCard({ title, value }) {

    return (
        <div style={{
            border: '1px solid gray',
            padding: '20px',
            margin: '10px',
            borderRadius: '10px'
        }}>
            <h2>{title}</h2>
            <h1>{value}</h1>
        </div>
    )
}

export default ThreatCard
import React, {useState, useEffect} from "react";

export default function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/api/home')
        .then(r => r.json())
        .then(setData)
        .catch(err => console.error(err));
    }, []);

    if (!data) return <div>Loading…</div>;
    return (
        <div>
            <h1>{data.message}</h1>
            <pre>{JSON.stringify(data.items)}</pre>
            <h2>{data.user.email}</h2>
        </div>
    );
}
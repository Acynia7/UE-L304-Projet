import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const form = new URLSearchParams();
            form.append("_username", username);
            form.append("_password", password);

            const response = await fetch("/login", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: form.toString(),
                redirect: "manual",
            });

            if (response.ok) {
                navigate("/dashboard");
            } else {
                setError("Échec de la connexion");
            }
        } catch (err) {
            setError("Impossible de contacter le serveur");
            console.error(err);
        }
    };

    return (
        <div className="auth-page">
            <h1>Connexion</h1>
            <form onSubmit={handleSubmit} className="auth-form">
                <div>
                    <label htmlFor="username">Nom d'utilisateur</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="auth-error">{error}</p>}
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
}
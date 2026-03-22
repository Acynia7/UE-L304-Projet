import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Login/Login.scss';
import logo from '../../../images/logo-ecobattle-alpha.png';

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const registrationData = {
                nom: username, 
                email: email,
                password: password
            };
            const response = await fetch("/api/register", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify(registrationData),
            });

            if (response.ok) {
                navigate("/login");
            } else {
                const data = await response.json();
                setError(data.error || "Échec de l'inscription");
            }
        } catch (err) {
            setError("Impossible de contacter le serveur");
            console.error(err);
        }
    };

    return (
        <div className="auth-page o-container--centered">
            <div className="auth-left">
                <div className="flex--center">
                    <img src={logo} alt="Logo du projet ecobattle" className="login_img" />
                </div>
            </div>
            <div className="auth-right">
                <div className="c-title">
                    <h1>Inscription</h1>
                </div>
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
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    <button type="submit">S'inscrire</button>
                </form>
            </div>
        </div>
    );
}
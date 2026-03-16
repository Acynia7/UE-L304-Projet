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
            // send registration data as urlencoded form fields
            const form = new URLSearchParams();
            form.append("username", username);
            form.append("email", email);
            form.append("password", password);

            const response = await fetch("/register", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: form.toString(),
                redirect: "manual",
            });

            if (response.ok) {
                navigate("/login");
            } else {
                setError("Échec de l'inscription");
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
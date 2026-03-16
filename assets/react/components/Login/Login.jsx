import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.scss';
import logo from '../../../images/logo-ecobattle-alpha.png';

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
        <div className="auth-page o-container--centered">
            <div className="auth-left">
                <div className="flex--center">
                    <img src={logo} alt="Logo du projet ecobattle" className="login_img" />
                </div>
            </div>
            <div className="auth-right">
                <div className="c-title">
                    <h1>Connexion</h1>
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
                <div className="sign-up">
                    <p>Vous n'avez pas de compte ?</p>
                    <a href="/register"><button type='button'>Créer un compte</button></a>
                </div>
    
            </div>
        </div>
    );
}
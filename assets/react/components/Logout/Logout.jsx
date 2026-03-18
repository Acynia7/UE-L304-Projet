import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/logout", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: 'include', 
                });

                if (response.ok || response.status === 401) {
                    console.log("Déconnexion réussie");
                }
            } catch (err) {
                console.error("Erreur lors de la déconnexion :", err);
            } finally {
                navigate("/");
            }
        };

        handleLogout();
    }, [navigate]);

    return (
        <div className="auth-page o-container--centered">
            <div className="c-title">
                <h1>Déconnexion...</h1>
                <p>Veuillez patienter.</p>
            </div>
        </div>
    );
}
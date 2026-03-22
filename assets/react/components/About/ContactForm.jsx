import { useState } from "react";
import './About.scss';

export default function ContactForm() {
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");  
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            const contactData = {
                nom: nom,
                email: email,
                message: message,
                sujet: "Contact via Site"
            };

            const response = await fetch("http://127.0.0.1:8000/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(contactData),
            });

            if (response.ok) {
                setStatus({ type: "success", text: "Message envoyé avec succès !" });
                setNom("");
                setEmail("");
                setMessage("");
            } else {
                const data = await response.json();
                setStatus({ type: "error", text: data.error || "Erreur lors de l'envoi." });
            }
        } catch (error) {
            setStatus({ type: "error", text: "Impossible de contacter le serveur." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="contact-section o-container--centered" id='contact-us'>
            <div className="contact-card">
                <div className="contact-card__info">
                    <span className="about-data__span">CONTACTEZ-NOUS</span>
                    <h2 className="about-data__title">Une question ? Un projet ?</h2>
                    <p className="about-data__content">
                        L'équipe EcoBattle est à ton écoute. Remplis le formulaire et nous te répondrons dans les plus brefs délais.
                    </p>
                </div>
                
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="contact-form__group">
                        <input 
                            type="text" 
                            placeholder="Ton nom" 
                            className="contact-form__input" 
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="contact-form__group">
                        <input 
                            type="email" 
                            placeholder="Ton email" 
                            className="contact-form__input" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="contact-form__group">
                        <textarea 
                            placeholder="Ton message" 
                            className="contact-form__input contact-form__textarea" 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    {status && (
                        <p style={{ color: status.type === 'success' ? 'green' : 'red', marginBottom: '10px' }}>
                            {status.text}
                        </p>
                    )}

                    <button 
                        type="submit" 
                        className="contact-form__button"
                        disabled={loading}
                    >
                        {loading ? "Envoi en cours..." : "Envoyer le message"}
                    </button>
                </form>
            </div>
        </section>
    );
}
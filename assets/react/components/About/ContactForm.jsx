import './About.scss';

export default function ContactForm() {
    return (
        <section className="contact-section o-container--centered">
            <div className="contact-card">
                <div className="contact-card__info">
                    <span className="about-data__span">CONTACTEZ-NOUS</span>
                    <h2 className="about-data__title">Une question ? Un projet ?</h2>
                    <p className="about-data__content">
                        L'équipe EcoBattle est à ton écoute. Remplis le formulaire et nous te répondrons dans les plus brefs délais.
                    </p>
                </div>
                
                <form className="contact-form">
                    <div className="contact-form__group">
                        <input type="text" placeholder="Ton nom" className="contact-form__input" required />
                    </div>
                    <div className="contact-form__group">
                        <input type="email" placeholder="Ton email" className="contact-form__input" required />
                    </div>
                    <div className="contact-form__group">
                        <textarea placeholder="Ton message" className="contact-form__input contact-form__textarea" required></textarea>
                    </div>
                    <button type="submit" className="contact-form__button">
                        Envoyer le message
                    </button>
                </form>
            </div>
        </section>
    );
}
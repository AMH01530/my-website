export default function Footer() {
  return (
    <>
      <section id="about" className="about">
        <p className="section-kicker">About this project</p>
        <h2>An educational AI/ML project, built end to end</h2>
        <p>
          Egyptian House Price Predictor is a mini project covering the full journey
          from a raw Kaggle dataset of Egyptian real-estate listings to a working
          full-stack application: data cleaning, light EDA, a Random Forest
          regression model, and a React interface calling a Python REST API.
        </p>
      </section>

      <footer className="footer">
        <p className="footer-title">Egyptian House Price Predictor</p>
        <p>Educational AI/ML project</p>
        <p>Estimated listing price only — not an official property valuation.</p>
        <p className="footer-stack">React · REST API · Python · Machine Learning</p>
      </footer>
    </>
  );
}

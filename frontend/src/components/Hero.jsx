import CompoundScene from './CompoundScene.jsx';

export default function Hero({ reducedMotion }) {
  function scrollToPredict() {
    document.querySelector('#predict')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section id="home" className="hero">
      <CompoundScene reducedMotion={reducedMotion} />
      <div className="hero-scrim" />

      <div className="hero-content">
        <p className="hero-eyebrow">AI Solutions Lab, Real Estate Predictor</p>
        <h1 className="hero-title">
          Estimate your property&rsquo;s
          <br />
          <span>value in Egypt.</span>
        </h1>
        <p className="hero-subtitle">
          Get an AI-estimated listing price from your property&rsquo;s location, size,
          bedrooms, bathrooms and type — trained on real Egyptian listings.
        </p>
        <button className="btn btn-primary hero-cta" onClick={scrollToPredict}>
          Start property valuation →
        </button>
      </div>
    </section>
  );
}

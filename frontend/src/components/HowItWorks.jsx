const STEPS = [
  { n: '01', title: 'You enter property details', desc: 'Location, area, bedrooms, bathrooms and property type, filled in through the form above.' },
  { n: '02', title: 'React sends a request', desc: 'The interface packages your inputs and calls the REST API over HTTP.' },
  { n: '03', title: 'FastAPI receives it', desc: 'The Python backend validates the fields and passes them to the saved model pipeline.' },
  { n: '04', title: 'The Random Forest model predicts', desc: 'A regression model trained on real Egyptian listings estimates the price.' },
  { n: '05', title: 'The estimate returns to you', desc: 'The predicted price travels back through the API and appears in the result card.' },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="how-it-works">
      <p className="section-kicker">How it works</p>
      <h2>From your inputs to an estimated price</h2>
      <ol className="pipeline">
        {STEPS.map((step) => (
          <li key={step.n}>
            <span className="pipeline-number">{step.n}</span>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

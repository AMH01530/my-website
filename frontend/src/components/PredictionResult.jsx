import { useCountUp } from '../hooks/useCountUp.js';

const formatter = new Intl.NumberFormat('en-EG', { maximumFractionDigits: 0 });

export default function PredictionResult({ result, form, error, reducedMotion }) {
  const animatedPrice = useCountUp(result?.estimated_price_egp ?? 0, 900, reducedMotion);

  if (error) {
    return (
      <div className="result-card result-card-error" role="alert">
        <p className="result-error-title">Unable to generate the estimate right now.</p>
        <p>{error}</p>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="result-card">
      <div className="result-heading">
        <span className="result-check" aria-hidden="true">✓</span>
        <p>Estimated listing price</p>
      </div>
      <p className="result-price">
        {formatter.format(animatedPrice)} <span>EGP</span>
      </p>
      <p className="result-disclaimer">AI model estimate · not an official property valuation</p>

      <div className="result-profile">
        <p className="result-profile-title">Property profile</p>
        <ul>
          <li><span>📍 Location</span><span>{form.location}</span></li>
          <li><span>📐 Area</span><span>{form.area} m²</span></li>
          <li><span>🛏 Bedrooms</span><span>{form.bedrooms}</span></li>
          <li><span>🚿 Bathrooms</span><span>{form.bathrooms}</span></li>
          <li><span>🏠 Type</span><span>{form.property_type}</span></li>
        </ul>
      </div>
    </div>
  );
}

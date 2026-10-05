import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import PropertyForm from './components/PropertyForm.jsx';
import PropertyPreview from './components/PropertyPreview.jsx';
import PredictionResult from './components/PredictionResult.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Footer from './components/Footer.jsx';
import DeveloperSection from './components/DeveloperSection.jsx';
import { predictPrice } from './api.js';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion.js';

const INITIAL_FORM = {
  location: 'New Cairo City, Cairo',
  area: 150,
  bedrooms: 3,
  bathrooms: 2,
  property_type: 'Apartment',
};

function validate(form) {
  const errors = {};
  if (!form.location.trim()) errors.location = 'Please enter a location.';
  const area = Number(form.area);
  if (!form.area || Number.isNaN(area) || area <= 0) {
    errors.area = 'Please enter a property area greater than 0.';
  }
  return errors;
}

export default function App() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [apiError, setApiError] = useState('');
  const reducedMotion = usePrefersReducedMotion();

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setResult(null);
      setApiError('');
      return;
    }

    setLoading(true);
    setApiError('');
    setResult(null);
    try {
      const data = await predictPrice({
        location: form.location.trim(),
        area: Number(form.area),
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        property_type: form.property_type,
      });
      setResult(data);
    } catch (err) {
      setApiError(
        err.message === 'Failed to fetch'
          ? 'Unable to connect to the prediction server. Please check your connection and try again.'
          : err.message
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <Navbar />
      <Hero reducedMotion={reducedMotion} />

      <section id="predict" className="predict-section">
        <p className="section-kicker">Property valuation</p>
        <h2>Configure the property</h2>
        <div className="predict-grid">
          <PropertyForm
            form={form}
            onChange={updateField}
            onSubmit={handleSubmit}
            loading={loading}
            errors={errors}
          />
          <div className="predict-side">
            <PropertyPreview form={form} reducedMotion={reducedMotion} />
            <PredictionResult
              result={result}
              form={form}
              error={apiError}
              reducedMotion={reducedMotion}
            />
          </div>
        </div>
      </section>

      <HowItWorks />
      <Footer />
      <DeveloperSection location={form.location} />
    </div>
  );
}

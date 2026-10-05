import Stepper from './Stepper.jsx';
import PropertyTypeSelector from './PropertyTypeSelector.jsx';
import { SAMPLE_LOCATIONS } from '../data/propertyTypes.js';

export default function PropertyForm({ form, onChange, onSubmit, loading, errors }) {
  return (
    <form className="property-form" onSubmit={onSubmit} noValidate>
      <div className="form-row">
        <label htmlFor="location">Location</label>
        <input
          id="location"
          list="location-suggestions"
          value={form.location}
          onChange={(e) => onChange('location', e.target.value)}
          placeholder="e.g. New Cairo City, Cairo"
          aria-invalid={Boolean(errors.location)}
          aria-describedby={errors.location ? 'location-error' : undefined}
        />
        <datalist id="location-suggestions">
          {SAMPLE_LOCATIONS.map((loc) => (
            <option key={loc} value={loc} />
          ))}
        </datalist>
        {errors.location && <p className="field-error" id="location-error">{errors.location}</p>}
      </div>

      <div className="form-row">
        <label htmlFor="area">Property area (m²)</label>
        <input
          id="area"
          type="number"
          min="1"
          max="10000"
          value={form.area}
          onChange={(e) => onChange('area', e.target.value)}
          aria-invalid={Boolean(errors.area)}
          aria-describedby={errors.area ? 'area-error' : undefined}
        />
        {errors.area && <p className="field-error" id="area-error">{errors.area}</p>}
      </div>

      <div className="form-row form-row-split">
        <Stepper
          label="Bedrooms"
          value={form.bedrooms}
          onChange={(v) => onChange('bedrooms', v)}
          min={0}
          max={30}
        />
        <Stepper
          label="Bathrooms"
          value={form.bathrooms}
          onChange={(v) => onChange('bathrooms', v)}
          min={0}
          max={30}
        />
      </div>

      <PropertyTypeSelector
        value={form.property_type}
        onChange={(v) => onChange('property_type', v)}
      />

      <button className="btn btn-primary predict-btn" type="submit" disabled={loading}>
        {loading ? 'Analyzing property data…' : 'Predict property price →'}
      </button>
    </form>
  );
}

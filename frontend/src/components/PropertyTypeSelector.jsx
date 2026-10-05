import { PROPERTY_TYPES } from '../data/propertyTypes.js';

export default function PropertyTypeSelector({ value, onChange }) {
  return (
    <fieldset className="type-selector">
      <legend>Property type</legend>
      <div className="type-grid">
        {PROPERTY_TYPES.map((type) => {
          const selected = type.value === value;
          return (
            <button
              type="button"
              key={type.value}
              className={`type-card${selected ? ' is-selected' : ''}`}
              aria-pressed={selected}
              onClick={() => onChange(type.value)}
            >
              <span className="type-icon" aria-hidden="true">{type.icon}</span>
              <span className="type-name">{type.value}</span>
              <span className="type-desc">{type.description}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

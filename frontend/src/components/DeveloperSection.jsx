import { useState } from 'react';
import { useDeveloperDirectory } from '../hooks/useDeveloperDirectory.js';

function telHref(phone) {
  const cleaned = phone.replace(/[^\d+]/g, '');
  return cleaned ? `tel:${cleaned}` : null;
}

function whatsappHref(number) {
  const cleaned = number.replace(/[^\d]/g, '');
  return cleaned ? `https://wa.me/${cleaned}` : null;
}

function DeveloperRow({ developer, editing, onChange, onRemove }) {
  const tel = telHref(developer.phone || '');
  const wa = whatsappHref(developer.whatsapp || '');

  if (editing) {
    return (
      <div className="developer-row developer-row-editing">
        <input
          className="developer-edit-input"
          value={developer.name}
          onChange={(e) => onChange({ name: e.target.value })}
          aria-label="Developer name"
        />
        <input
          className="developer-edit-input"
          value={developer.phone}
          onChange={(e) => onChange({ phone: e.target.value })}
          placeholder="Phone number"
          aria-label="Phone number"
        />
        <input
          className="developer-edit-input"
          value={developer.whatsapp}
          onChange={(e) => onChange({ whatsapp: e.target.value })}
          placeholder="WhatsApp number"
          aria-label="WhatsApp number"
        />
        <button type="button" className="developer-remove-btn" onClick={onRemove} aria-label={`Remove ${developer.name}`}>
          Remove
        </button>
      </div>
    );
  }

  return (
    <div className="developer-row">
      <span className="developer-name">{developer.name}</span>
      <span className="developer-actions">
        <a
          className={`developer-icon-btn${tel ? '' : ' is-disabled'}`}
          href={tel ?? undefined}
          aria-disabled={!tel}
          aria-label={tel ? `Call ${developer.name}` : 'Phone number not available yet'}
          onClick={(e) => { if (!tel) e.preventDefault(); }}
        >
          📞
        </a>
        <a
          className={`developer-icon-btn${wa ? '' : ' is-disabled'}`}
          href={wa ?? undefined}
          target={wa ? '_blank' : undefined}
          rel={wa ? 'noopener noreferrer' : undefined}
          aria-disabled={!wa}
          aria-label={wa ? `WhatsApp ${developer.name}` : 'WhatsApp number not available yet'}
          onClick={(e) => { if (!wa) e.preventDefault(); }}
        >
          WhatsApp
        </a>
      </span>
    </div>
  );
}

export default function DeveloperSection({ location }) {
  const {
    developers,
    addDeveloper,
    updateDeveloper,
    removeDeveloper,
    setDevelopersForLocation,
    getDevelopersForLocation,
  } = useDeveloperDirectory();

  const [editing, setEditing] = useState(false);
  const [addingExistingId, setAddingExistingId] = useState('');

  const linked = getDevelopersForLocation(location);
  const linkedIds = new Set(linked.map((d) => d.id));
  const availableToAdd = developers.filter((d) => !linkedIds.has(d.id));

  function handleAddNew() {
    const name = window.prompt('Developer name');
    if (!name || !name.trim()) return;
    const id = addDeveloper(name.trim());
    setDevelopersForLocation(location, [...linked.map((d) => d.id), id]);
  }

  function handleLinkExisting(id) {
    if (!id) return;
    setDevelopersForLocation(location, [...linked.map((d) => d.id), id]);
    setAddingExistingId('');
  }

  function handleUnlink(id) {
    setDevelopersForLocation(location, linked.map((d) => d.id).filter((i) => i !== id));
  }

  return (
    <section id="developers" className="developer-section">
      <div className="developer-section-header">
        <div>
          <p className="section-kicker">Developers</p>
          <h2>{linked.length > 1 ? 'Developers for this location' : 'Developer for this location'}</h2>
        </div>
        <button type="button" className="developer-edit-toggle" onClick={() => setEditing((v) => !v)}>
          {editing ? 'Done' : 'Edit ✎'}
        </button>
      </div>

      <p className="developer-location-label">📍 {location || 'No location selected'}</p>

      <div className="developer-list">
        {linked.length === 0 && (
          <p className="developer-empty">No developer information listed for this location yet.</p>
        )}
        {linked.map((dev) => (
          <DeveloperRow
            key={dev.id}
            developer={dev}
            editing={editing}
            onChange={(patch) => updateDeveloper(dev.id, patch)}
            onRemove={() => handleUnlink(dev.id)}
          />
        ))}
      </div>

      {editing && (
        <div className="developer-add-row">
          <button type="button" className="btn-link" onClick={handleAddNew}>
            + Add new developer
          </button>
          {availableToAdd.length > 0 && (
            <select
              value={addingExistingId}
              onChange={(e) => handleLinkExisting(e.target.value)}
              aria-label="Link an existing developer to this location"
            >
              <option value="">Link existing developer…</option>
              {availableToAdd.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          )}
        </div>
      )}

      <p className="developer-disclaimer">
        Developer associations are a best-effort match, editable at any time.
      </p>
    </section>
  );
}

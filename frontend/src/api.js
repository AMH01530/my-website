// Talks to the existing FastAPI backend. The request/response shape here
// must match backend/main.py exactly — do not add or rename fields.
const API_BASE = 'http://localhost:8000';

export async function predictPrice(payload) {
  const res = await fetch(`${API_BASE}/api/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    // no JSON body
  }

  if (!res.ok) {
    const detail = data?.detail;
    const message = Array.isArray(detail)
      ? detail.map((d) => d.msg).filter(Boolean).join(' ')
      : typeof detail === 'string'
      ? detail
      : 'Please check the property details and try again.';
    throw new Error(message);
  }

  return data; // { estimated_price_egp, currency }
}

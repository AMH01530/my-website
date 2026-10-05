import { useCallback, useEffect, useState } from 'react';
import { KNOWN_DEVELOPERS, LOCATION_DEVELOPER_MAP } from '../data/developers.js';

const STORAGE_KEY = 'ehpp:developer-directory:v1';

function loadInitialState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // fall through to defaults
  }
  return {
    developers: KNOWN_DEVELOPERS,
    locationMap: LOCATION_DEVELOPER_MAP,
  };
}

function makeId(name) {
  const base = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return `${base || 'developer'}-${Date.now().toString(36)}`;
}

export function useDeveloperDirectory() {
  const [state, setState] = useState(loadInitialState);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage unavailable (private mode, quota, etc.) - edits still work in-session
    }
  }, [state]);

  const addDeveloper = useCallback((name) => {
    const id = makeId(name);
    setState((prev) => ({
      ...prev,
      developers: [...prev.developers, { id, name, phone: '', whatsapp: '' }],
    }));
    return id;
  }, []);

  const updateDeveloper = useCallback((id, patch) => {
    setState((prev) => ({
      ...prev,
      developers: prev.developers.map((d) => (d.id === id ? { ...d, ...patch } : d)),
    }));
  }, []);

  const removeDeveloper = useCallback((id) => {
    setState((prev) => ({
      developers: prev.developers.filter((d) => d.id !== id),
      locationMap: Object.fromEntries(
        Object.entries(prev.locationMap).map(([loc, ids]) => [loc, ids.filter((i) => i !== id)])
      ),
    }));
  }, []);

  const setDevelopersForLocation = useCallback((location, ids) => {
    setState((prev) => ({
      ...prev,
      locationMap: { ...prev.locationMap, [location]: ids },
    }));
  }, []);

  // Exact match first; falls back to a soft substring match so a typed
  // location like "New Cairo" can still surface a compound-level match.
  const getDevelopersForLocation = useCallback(
    (location) => {
      if (!location) return [];
      const trimmed = location.trim();
      let ids = state.locationMap[trimmed];
      if (!ids) {
        // Only attempt a fuzzy match on reasonably specific input (avoids a
        // short generic word like "Cairo" accidentally matching one of many
        // compounds and implying a false association).
        const lower = trimmed.toLowerCase();
        const matchKey =
          lower.length >= 6
            ? Object.keys(state.locationMap).find((key) => key.toLowerCase().includes(lower))
            : undefined;
        ids = matchKey ? state.locationMap[matchKey] : [];
      }
      return ids.map((id) => state.developers.find((d) => d.id === id)).filter(Boolean);
    },
    [state]
  );

  return {
    developers: state.developers,
    addDeveloper,
    updateDeveloper,
    removeDeveloper,
    setDevelopersForLocation,
    getDevelopersForLocation,
  };
}

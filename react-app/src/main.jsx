import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

// StrictMode intentionally omitted: its dev-only double-invoke of effects caused
// narration to fire twice (overlapping voices). Production behavior is unchanged.
createRoot(document.getElementById('root')).render(<App />);

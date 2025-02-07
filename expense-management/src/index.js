import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// This is the ID of the div in your index.html file
const rootElement = document.getElementById('root');

// Create a root element using the new API
const root = createRoot(rootElement);

// Render the App component inside the root element
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

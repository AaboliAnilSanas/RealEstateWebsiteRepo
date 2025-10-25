import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import PropertyListing from './components/PropertyPages/PropertListing.jsx'; // Added import for PropertyListing

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Theme>
      <App />
    </Theme>
  </StrictMode>
);
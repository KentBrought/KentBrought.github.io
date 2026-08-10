import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import HomePage from './HomePage.jsx';

document.title = 'Kent Brought';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HomePage />
  </StrictMode>,
);

import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

const isArtPage = window.location.pathname === '/art' || window.location.pathname.endsWith('/art.html');
const Page = lazy(() => (isArtPage ? import('./ArtPage.jsx') : import('./HomePage.jsx')));

document.title = isArtPage
  ? 'Kent Brought - Art & Assets'
  : 'Kent Brought - Software Developer & Entrepreneur';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={null}>
      <Page />
    </Suspense>
  </StrictMode>,
);

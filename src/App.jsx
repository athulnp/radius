import React, { useLayoutEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import RadiusCoreWebsite from './components/RadiusCoreWebsite.jsx';
import CareersPage from './components/CareersPage.jsx';
import ChatWidget from './components/ChatWidget.jsx';

// Reset scroll to top on every route change.
// The site sets `html { scroll-behavior: smooth }`, which would ANIMATE this
// jump (feels like "scrolling up"). Temporarily force an instant jump.
function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    // Instant jump (explicit behavior beats the CSS `scroll-behavior: smooth`).
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.body.scrollTop = 0;
    html.scrollTop = 0;
    // Keep `auto` for one frame so no late smooth animation kicks in, then restore.
    requestAnimationFrame(() => { html.style.scrollBehavior = prev; });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<RadiusCoreWebsite />} />
        <Route path="/careers" element={<CareersPage />} />
      </Routes>
      <ChatWidget />
    </BrowserRouter>
  );
}

export default App;

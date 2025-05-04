import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

// Context
import './index.css';
import ReduxProvider from 'core/store/contexts/Redux';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider>
      <App />
    </ReduxProvider>
  </StrictMode>
);

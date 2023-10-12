import React from 'react';
import ReactDOM from 'react-dom/client';
import { ProvideAuth } from './auth/auth';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ProvideAuth>
  <App />
</ProvideAuth>
);


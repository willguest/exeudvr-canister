import { createRoot } from 'react-dom/client';
import { ProvideAuth } from './auth/auth';
import App from './App';

function IslandApp() {
  return (
    <ProvideAuth>
      <App />
    </ProvideAuth>
  );
}

createRoot(document.getElementById('root')).render(<IslandApp />);
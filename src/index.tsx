import { createRoot } from 'react-dom/client';
import App from './App';
import { ProvideAuth } from './auth/auth';

function ICVRApp() {
	
  return (
    <ProvideAuth>
      <App />
    </ProvideAuth>
  );
}

createRoot(document.getElementById('root')).render(<ICVRApp />);
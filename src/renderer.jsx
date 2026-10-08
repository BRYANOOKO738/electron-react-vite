import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import ErrorBoundary from './Components/ErrorBoundary';
import Hello from './Components/Hello';

const App = () => <Hello />;

const container = document.getElementById('root');
createRoot(container).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);

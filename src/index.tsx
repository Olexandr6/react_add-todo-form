import { createRoot } from 'react-dom/client';
import { App } from './App';
import { GoodsProvider } from './components/GoodsContex/GoodsContex';

const Root = () => (
  <GoodsProvider>
    <App />
  </GoodsProvider>
);

createRoot(document.getElementById('root') as HTMLElement).render(<Root />);

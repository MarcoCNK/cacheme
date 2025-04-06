import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import LayoutProdvider from './layouts/layout.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <LayoutProdvider>
    <App />
  </LayoutProdvider>
  </BrowserRouter>,
)

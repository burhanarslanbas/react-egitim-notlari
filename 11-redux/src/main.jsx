import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.jsx'

createRoot(document.getElementById('root')).render(
  // Provider ile store'u App componentine veriyoruz. Böylece App componenti ve onun alt componentleri store'a erişebilir.
  // Provider: React-Redux kütüphanesinden gelen bir componenttir. Bu component, React uygulamasının Redux store ile bağlantı kurmasını sağlar. 
  // Provider componenti, store'u context aracılığıyla alt componentlere iletir. Bu sayede alt componentler, Redux store'a erişebilir ve state'i okuyabilir veya action dispatch edebilir. 
  <Provider store={store}>
    <App />
  </Provider>
)

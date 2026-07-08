import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import Header from '../components/Header'
import AboutHistory from './pages/AboutHistory'
import AboutTeam from './pages/AboutTeam'
import ProductDetails from './pages/ProductDetails'

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />}>
          <Route path='history' element={<AboutHistory />} />
          <Route path='team' element={<AboutTeam />} />
        </Route>
        <Route path='/product-details/:id' element={<ProductDetails />} />
        <Route path='/products' element={<Products />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
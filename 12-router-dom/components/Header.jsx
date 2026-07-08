import React from 'react'
import { Link } from 'react-router-dom'
import '../src/App.css'

function Header() {
    return (
        <header className='header'>
            <Link className='header-link' to='/'>Ana Sayfa</Link>
            <Link className='header-link' to='/products'>Ürünlerimiz</Link>
            <Link className='header-link' to='/about'>Hakkımızda</Link>
            <Link className='header-link' to='/contact'>İletişim</Link>
        </header>
    )
}

export default Header
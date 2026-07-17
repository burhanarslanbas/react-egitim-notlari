import React, { useState } from 'react'
import logo from '../images/logo.png'
import '../css/Header.css'
import '../App.css';
import { PiBasketThin } from "react-icons/pi";
import { CiLight } from "react-icons/ci";
import { PiMoonLight } from "react-icons/pi";
import Badge from '@mui/material/Badge';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDrawer } from '../redux/slices/basketSlice';

function Header() {
    const [theme, setTheme] = useState('light');
    const dispatch = useDispatch();

    const changeTheme = () => {
        const body = document.body;

        if (theme === 'light') {
            body.classList.add('dark-theme');
            setTheme('dark');
        } else {
            body.classList.remove('dark-theme');
            setTheme('light');
        }
    }

    const navigate = useNavigate();

    const { products } = useSelector((store) => store.basket);

    return (
        <div className="header-container">
            <div className="flex-row" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                <img className="logo" src={logo} alt="My E-Commerce Store" />
                <h2 className='logo-title'>Ticarethane</h2>
            </div>
            <div className="flex-row">
                <input className="search-input" type="text" placeholder="Ara..." />
                <div>
                    {theme === 'light' ? <CiLight onClick={changeTheme} className="light-mode-icon" alt="LightMode" /> : <PiMoonLight onClick={changeTheme} className="dark-mode-icon" alt="DarkMode" />}
                    <Badge badgeContent={products.length} color="primary">
                        <PiBasketThin className="basket-icon" alt="Basket" onClick={() => dispatch(toggleDrawer())} />
                    </Badge>
                </div>
            </div>
        </div>
    )
}

export default Header
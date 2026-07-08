import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function About() {
    return (
        <div>
            <h1>Hakkımızda</h1>
            <hr />
            <Link style={{ color: 'black', textDecoration: 'none', fontSize: '20px', margin: '0px 10px', marginLeft: '20px', marginRight: '20px' }} to="history">Tarihçe</Link>
            <br />
            <Link style={{ color: 'black', textDecoration: 'none', fontSize: '20px', margin: '0px 10px', marginLeft: '20px', marginRight: '20px' }} to="team">Takım</Link>
            <Outlet />
        </div>
    )
}

export default About
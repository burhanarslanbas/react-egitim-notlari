import React from 'react'

function Container({ children }) {
    return (
        <div>
            <div>Container Componenti</div>
            <hr />
            <div>
                {children}
            </div>
        </div>
    )
}

export default Container
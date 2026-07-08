import React from 'react'

function User({ user }) {
    return (
        <div>
            <h2>{user.firstName} {user.lastName}</h2>
        </div>
    )
}

export default User
import { React, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getAllUsers } from './redux/userSlice'
import { store } from './redux/store'

function UserList() {
    const dispatch = useDispatch();
    const { users } = useSelector(store => store.user)

    console.log('Users', users)
    useEffect(() => {
        dispatch(getAllUsers())
    }, []);

    return (
        <div>
            <h1>User List</h1>
            <div>
                {users.users.map((user) => (
                    <div key={user.id}>
                        <h2>{user.firstName} {user.lastName}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserList
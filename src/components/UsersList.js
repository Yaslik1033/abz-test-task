import React from 'react';
import { UserCard } from './UserCard';

export const UsersList = ({users}) => {
  return (
    <ul className='users-list'>
      {users.map(user => (
        <li key={user.id}>
          <UserCard user={user} />
        </li>
      ))}
    </ul>
  )
}
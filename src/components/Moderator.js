import React from 'react';
import { Link } from 'react-router-dom';

function Moderator() {
  return (
    <div>
        <h1>Moderator Page</h1>
        <div>
            <Link to={'/moderator/post-for-approval'}>See posts for approval</Link>
        </div>
        <div>
            <Link to={'/moderator/post-for-removal'}>See posts for removal</Link>
        </div>
    </div>
  )
}

export default Moderator;
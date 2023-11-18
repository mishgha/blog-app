import React from 'react';
import { Link } from 'react-router-dom';

function Admin() {
  return (
    <div>
        <h1>Admin Page</h1>
        <Link to = "/admin/manage-users">Manage User</Link>
        <div>
          <Link to = "/admin/manage-posts">Manage Posts</Link>
        </div>
        <div>
          <Link>Manage Comments</Link>
        </div>
        <Link>Manage Suggestions</Link>
    </div>
  )
}

export default Admin;
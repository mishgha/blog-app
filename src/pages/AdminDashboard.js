import React from 'react'
import Admin from '../components/Admin'
import Base from '../components/Base'
import { Container } from "reactstrap";

function AdminDashboard() {
  return (
    <Base>
        <Container>
            <h1>Admin Dashboard</h1>
            <Admin/>
        </Container>
    </Base>
  )
}

export default AdminDashboard
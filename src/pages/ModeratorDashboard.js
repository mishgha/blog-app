import React from 'react'
import { Container } from 'reactstrap'
import Base from '../components/Base';
import Moderator from '../components/Moderator'

function ModeratorDashboard() {
  return (  
    <Base>
      <Container>
        <h1>Moderator Dashboard</h1>
        <Moderator/>
      </Container>
    </Base>
    
  )
}

export default ModeratorDashboard
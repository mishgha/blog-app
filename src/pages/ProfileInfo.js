import React, { useEffect } from 'react'
import Base from '../components/Base';
import { Button, Container } from 'reactstrap';
import { useState } from 'react';
import { isLoggedIn } from "../authorization";
import { getCurrentUserDetail } from '../authorization';
import { Link } from 'react-router-dom';

const ProfileInfo = () => {
  
  const [login,setLogin]=useState(false)
  const [userDto,setUserDto]=useState(undefined)

  useEffect(()=>{
    setLogin(isLoggedIn())

    const userDetail = getCurrentUserDetail();
    setUserDto(userDetail);
  },[])

  return(
    <Base>
    {
      <div>
        <Container>
          <p>User E-mail: {userDto?.userEmail}</p>
          <Link to={"/user/updateEmail"}>Update</Link>
          <p>Password</p>
          <Link to={"/user/updatePassword"}>Update</Link>
        </Container>
      </div>
    }
      
    </Base>
  )
}

export default ProfileInfo
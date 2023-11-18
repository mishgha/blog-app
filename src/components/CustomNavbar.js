import React, { useEffect, useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { doLogout, isLoggedIn, isUser, isAdmin, isModerator } from '../authorization';
import { getCurrentUserDetail } from "../authorization";
import { useNavigate } from 'react-router-dom';

function CustomNavbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const [login,setLogin]=useState(false)
  const [userDto,setUserDto]=useState(undefined)

  useEffect(()=>{

    setLogin(isLoggedIn())

    const userDetail = getCurrentUserDetail();
    setUserDto(userDetail);

  },[]);

  const logout=()=>{
    doLogout(()=>{
      //logged out
      setLogin(false);
      navigate("/home");
    })
  }

  const toggle = () => setIsOpen(!isOpen);


  
  
  return (
    <div>
      <Navbar color="dark"
              dark
              expand="md"
              fixed=""
              >
        <NavbarBrand href="/home">Blog-App</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
      
          </Nav>

          <Nav navbar>
            {
              login && userDto?.userEmail && isUser() && (
                <>
                <NavItem>
                  <NavLink href='/user/my-posts' >
                    My Posts
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href='/user/profile-info'>
                    Profile Info
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink href='/user/dashboard'>
                    {userDto.userEmail}
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink onClick={logout}>
                    Logout
                  </NavLink>
                </NavItem>
                
                </>
              )
            }
            {
              login && userDto?.userEmail && isAdmin() && (
                <>
                 <NavItem>
                  <NavLink href='/user/my-posts'>
                    My Posts
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink href='/user/dashboard'>
                    Add Post
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink href='/user/profile-info'>
                    Profile Info
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink href='/admin/dashboard'>
                    {userDto.userEmail}
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink href='/moderator/dashboard'>
                    Moderator
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink onClick={logout}>
                    Logout
                  </NavLink>
                </NavItem>
                
                </>
              )
            }
            {
              login && userDto?.userEmail && isModerator() && (
                <>
                
                <NavItem>
                  <NavLink href='/user/profile-info'>
                    Profile Info
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink href='/moderator/dashboard'>
                    {userDto.userEmail}
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink onClick={logout}>
                    Logout
                  </NavLink>
                </NavItem>
                
                </>
              )
            }
            {
              !login && (
                <>
                  <NavItem>
                    <NavLink href="/login">
                      Login
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/signup">
                      Sign-up
                    </NavLink>
                  </NavItem>   
                </>
              )
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default CustomNavbar;
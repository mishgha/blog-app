import React from "react";
import { useState, useEffect } from "react";
import {toast} from 'react-toastify';
import { Card, Container, CardHeader, CardBody, FormGroup, Label, Input, Button, Row, Col} from "reactstrap";
import { login } from "../services/user-service";
import { doLogin, isAdmin, isModerator, isUser } from "../authorization";
import { useNavigate } from "react-router-dom";
import Base from '../components/Base';

 
const Login = () =>
{
    const [lockoutTime, setLockoutTime] = useState(0);
    const [attemptCount, setAttemptCount] = useState(0);
    const navigate = useNavigate();
    const [loginDetail,setLoginDetail] = useState({
        userEmail : "",
        userPassword : "" 
    })

    useEffect(() => {
        if (lockoutTime > 0) {
          const timer = setTimeout(() => {
            setLockoutTime(prevTime => prevTime - 1);
          }, 1000);
    
          if (lockoutTime === 1) {
            setAttemptCount(0);
          }
    
          return () => clearTimeout(timer);
        }
      }, [lockoutTime]);

    const handleChange = (event,field) =>{
        let actualValue = event.target.value
        setLoginDetail({
            ...loginDetail,
            [field]:actualValue
        })
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (attemptCount >= 5) {
            return;
          }

        console.log("Login detail submitted: ", loginDetail);

        if(loginDetail.userEmail.trim()==''){
            toast.error("User email is required");
            return;
        }
        
        //submit data to generate token
        login(loginDetail).then((jwtTokenData) => {
            console.log("user login: ", jwtTokenData)

            //save the data to localstorage
            doLogin(jwtTokenData,() => {
                console.log("login detail is saved to localstorage");
                
                //redirect to user dashboard page
                if(isUser()){
                    console.log("Navigating to User Dashboard");
                    navigate("/user/dashboard")
                }

                //redirect to admin dashboard page
                else if(isAdmin())
                {
                    console.log("Navigating to Admin Dashboard");
                    navigate("/admin/dashboard")
                }

                //redirect to moderator dashboard page
                else if(isModerator())
                {
                    console.log("Navigating to Moderator Dashboard");
                    navigate("/moderator/dashboard")
                }
                
                
            })

            toast.success("Login Successfully");
            
        }).catch(error => {
            console.log(error)
            setAttemptCount(prevCount => {
                const newCount = prevCount + 1;
                console.log("newCount: " , newCount);
                if (newCount >= 5) {
                  setLockoutTime(300); 
                }
                return newCount;
              });
            if(error.response.status == 403 || error.response.status == 400 || error.response.status == 404)
            {
                toast.error("Invalid password or email");
            }
        })

    }

   return(
    <Base>
    <div>
    <Container>
    <Row className="mt-4">
        <Col sm={{size:6,offset:3}}>
        <Card>
        <CardHeader>
            <Container className="text-center">
            <h1> Login </h1>
            </Container>
            
        </CardHeader>
        <CardBody>
            <form onSubmit={handleFormSubmit}>
                <FormGroup>
                    <Label for = "userEmail">Enter e-mail</Label> 
                    <Input
                    type = "text"
                    placeholder="Enter here"
                    id="userEmail"
                    value={loginDetail.userEmail}
                    onChange={(event) => handleChange(event,'userEmail')}
                    />

                    <Label for = "userPassword">Enter password</Label>
                    <Input
                    type="password"
                    placeholder="Enter here"
                    id="userPassword"
                    value={loginDetail.userPassword}
                    onChange={(event) => handleChange(event,'userPassword')}
                    />    
                </FormGroup>
                <Container className="text-center">
                    <Button color="dark" disabled={attemptCount >= 5}>Login</Button>
                    {attemptCount >= 5 && <p className="text-danger mt-2"> Locked for {lockoutTime} seconds due to too many wrong attempts</p>}
                </Container>              
            </form>
        </CardBody>
    </Card>
        </Col>
    </Row>
    </Container>
</div>
</Base>
   );
};

export default Login;
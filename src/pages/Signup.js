import React, { useEffect, useState } from "react";
import { Card, Container, CardHeader, CardBody, FormGroup, Label, Input, Button, Row, Col} from "reactstrap";
import { signup } from "../services/user-service";
import {toast} from 'react-toastify';
import Base from '../components/Base';
import { useNavigate } from "react-router-dom";

const Signup = () =>
{
    const navigate = useNavigate();
    const[data,setData] = useState({
        userEmail:'',
        userPassword:''
    })

    const[error,setError] = useState({
        errors:{},
        isError:false
    })

    
    const handleChange=(event,field)=>{
        setData({...data,[field]:event.target.value})
    }

    const resetData=()=>{
        setData({ 
            userEmail: '',
            userPassword: ''
        })
    }

    const submitForm=(event)=>{
        event.preventDefault()
        console.log(data)
        
        //call server api for sending data
        signup(data).then((response)=>
        {
            console.log(response)
            console.log("success log")
            toast.success("User is registered successfully");
            setData({
                userEmail:'',
                userPassword:''
            })
            navigate("/login");

        }).catch((error)=>{
            console.log(error)
            console.log("error log")
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
                <h1> Sign Up </h1>
                </Container>
                
            </CardHeader>
            <CardBody>
                <form onSubmit={submitForm}>
                    <FormGroup>
                        <Label for = "userEmail">Enter e-mail</Label> 
                        <Input
                        type = "text"
                        placeholder="Enter here"
                        id="userEmail"
                        onChange={(event)=>handleChange(event,'userEmail')}
                        value={data.userEmail}
                        />

                        <Label for = "userPassword">Enter password</Label>
                        <Input
                        type="password"
                        placeholder="Enter here"
                        id="userPassword"
                        onChange={(event)=>handleChange(event,'userPassword')}
                        value={data.userPassword}
                        />    
                    </FormGroup>
                    <Container className="text-center">
                        <Button color="dark">Sign Up</Button>
                        <Button onClick={resetData} color="secondary" type="reset" className="ms-2">Reset</Button>      
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

export default Signup;
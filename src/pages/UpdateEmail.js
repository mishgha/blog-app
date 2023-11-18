import React, { useEffect, useState } from "react";
import { Card, Container, CardHeader, CardBody, FormGroup, Label, Input, Button, Row, Col} from "reactstrap";
import { signup, updateUser } from "../services/user-service";
import {toast} from 'react-toastify';
import Base from '../components/Base';
import { useNavigate } from "react-router-dom";
import { getCurrentUserDetail } from "../authorization";
import { doLogout } from "../authorization";

const UpdateEmail = () =>
{
    const navigate = useNavigate();
    const [user,setUser] = useState(undefined);
    const [login,setLogin] = useState(true);

    const[data,setData] = useState({
        userEmail:''
    })


    useEffect( () => {
        const userDetail = getCurrentUserDetail();
        setUser(userDetail);
    }, []);
    
    const handleChange=(event,field)=>{
        setData({...data,[field]:event.target.value})
    }

    const submitForm=(event)=>{
        event.preventDefault()
        if(!user || !user.userId)
        {
            console.log("User id is missing or undefined");
            return;
        }
        data.userId = user.userId; 
        
        //call server api for sending data
        updateUser(data).then((response)=>
        {
            console.log(response)
            console.log("User Email updated successfully")
            toast.success("User Email is updated successfully");
            setData({
                userEmail:''
            })
            doLogout(()=>{
                setLogin(false);
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
                <h1> Update E-Mail </h1>
                </Container>
                
            </CardHeader>
            <CardBody>
                <form onSubmit={submitForm}>
                    <FormGroup>
                        <Label for = "userEmail">Enter new E-mail</Label> 
                        <Input
                        type = "text"
                        placeholder="Enter here"
                        id="userEmail"
                        onChange={(event)=>handleChange(event,'userEmail')}
                        value={data.userEmail}
                        />
                    </FormGroup>
                    <Container className="text-center">
                        <Button color="dark">Update</Button>
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

export default UpdateEmail;
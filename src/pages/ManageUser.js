import React, { useEffect } from 'react'
import Base from '../components/Base'
import { Button, Container } from 'reactstrap'
import { useState } from 'react';
import { deleteUser, loadAllUsers } from '../services/user-service';

function ManageUser() {

    const [userData,setUserData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const user = await loadAllUsers();
            setUserData(user);
            console.log("userData: ", user);
          } catch (error) {
            console.error("Error in fetchData:", error);
          }
        };
    
        fetchData();
      }, []); 
    
    const handleUserDelete = (userId) =>
    {
        console.log("User Id: ", userId);
        deleteUser(userId).then((response) => {
            console.log(response);
            const updatedUserData = userData.filter(user => user?.userId !== userId);
            setUserData(updatedUserData);

        }).catch(error => {
            console.log("Error is deleting the user, ", error);
        })

        window.location.reload();
    }

  return (
    <Base>
        <Container>
           <div>
            <h1>MANAGE USER</h1>
           </div>
           {
            userData?.map((user, index) => (                                  
                <div key={user?.userId} className="user p-3 border mb-3 rounded bg-white">
                    <p>User Email: {user?.userEmail}</p>
                    <Button onClick={() => handleUserDelete(user?.userId)}>Delete</Button>
                </div>
            ))
           }
        </Container>
    </Base>  
  )
}

export default ManageUser
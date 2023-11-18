import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardText } from 'reactstrap'

function Comment({comment = { commentText: "This is the default value"}}){

  return (
    <Card className='border-0 shadow-sm mt-3'>
        <CardBody>
            <CardText>
                {comment?.commentText}
            </CardText>
        </CardBody>
    </Card>
  )
}

export default Comment;
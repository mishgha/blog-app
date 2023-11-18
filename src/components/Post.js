import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardText } from 'reactstrap'

function Post({post = { postText: "This is the default value"}}){

  return (
    <Card className='border-0 shadow-sm mt-3'>
        <CardBody>
            <CardText>
                <div dangerouslySetInnerHTML={{ __html: post.postText.substring(0,50) + "..."}}>
                </div>
            </CardText>
            <div>
                <Link className='btn btn-secondary' to = {'/posts/'+post.postId}>Read More</Link>
            </div>
        </CardBody>
    </Card>
  )
}

export default Post;
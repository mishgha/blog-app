import React, { useState } from 'react';
import { useEffect } from 'react';
import { loadAllPosts } from '../services/post-service';
import {Row, Col, Card, Pagination, PaginationItem, PaginationLink, Container} from 'reactstrap';
import Post from './Post';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

function NewFeed() {

  const [postContent,setPostContent] = useState({
    content:[],
    totalPages:'',
    totalElements:'',
    pageSize:'',
    lastPage:false,
    pageNumber:''
  });

  useEffect(() => {
    changePage(0);
  },[])

  const changePage= (pageNumber=0,pageSize=5) => {
    if(pageNumber > postContent.pageNumber && postContent.lastPage)
    {
      return;
    }
    if(pageNumber < postContent.pageNumber && postContent.pageNumber==0)
    {
      return;
    }
    loadAllPosts(pageNumber,pageSize).then(data=>{
      setPostContent(data)
      window.scroll(0,0);
    }).catch(error=>{
      toast.error("Error in loading posts");
    })
  }

  return (
    <div className="container-fluid">
      <Row>
        <Col md={
          {
            size:10,
            offset:1
          }
        }>
          <h1>Welcome to Blog App</h1>
          {
            postContent && postContent.content && postContent.content.map((post,index)=>(
              <Post key={index} post = {post} />
            ))
          }
          
          <Container className='mt3'>
          <Pagination>
            <PaginationItem onClick={()=>changePage(postContent.pageNumber-1)}disabled={ postContent.pageNumber == 0}>
              <PaginationLink previous>

              </PaginationLink>
            </PaginationItem>

            {
              [...Array(postContent.totalPages)].map((item,index)=>(

                <PaginationItem onClick={()=>changePage(index)} active={index==postContent.pageNumber} key={index}>
                  <PaginationLink>
                      {index+1}
                  </PaginationLink>
                </PaginationItem>

              ))
            }

            <PaginationItem onClick={() => changePage(postContent.pageNumber+1)} disabled={postContent.lastPage}>
              <PaginationLink next>

              </PaginationLink>
            </PaginationItem>
          </Pagination>
          </Container>

        </Col>
      </Row>
    </div>
  )
}

export default NewFeed;
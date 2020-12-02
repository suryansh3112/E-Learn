import React, { useState ,useContext, useEffect} from 'react'
import UserContext from '../../context/UserContext'
import {Typography, Form, Input, Button,} from 'antd';
import axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

function AddCourse() {

  const { userData, setUserData } = useContext(UserContext);

  const [course,setCourse]=useState({
    cname:"",
    cprof:userData.user.name,
    cdesc:"",
    cimg:""

  })

  const handleChange = (e)=>{
    const { name, value } = e.target;

    setCourse((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  }

  const onSubmit = async (e)=>{
    e.preventDefault();
   console.log(course);
    try {
      const res = await axios.post('http://localhost:5000/faculty/course/add',course,{ headers: { 'x-auth-token': userData.token } })
      alert('Course Added');
    } catch (error) {
      console.log(error);
      alert("Please try again.")
    }

  }

  return (
    <div>
    <Title level={2}> Add Course</Title>
    <Form onSubmit={onSubmit} >

      <label>Course Name:</label>
      <Input name='cname' value={course.cname} onChange={handleChange}/>
      <br/><br/>

      <label>Course Description:</label>
      <TextArea name='cdesc' value={course.cdesc} onChange={handleChange}/>
      <br/><br/>

      <Button type="primary"  onClick={onSubmit}>Add Course</Button>  
    </Form>
    </div>
  )
}

export default AddCourse

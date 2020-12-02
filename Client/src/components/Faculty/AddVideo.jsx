import React, { useState ,useContext, useEffect} from 'react'
import UserContext from '../../context/UserContext'
import {Typography, Form, Input, Button,} from 'antd';
import axios from 'axios';
import VideoUpload from '../utils/VideoUpload';
import {useParams} from 'react-router-dom'

const { Title } = Typography;
const { TextArea } = Input;

function AddVideo() {

  const { userData, setUserData } = useContext(UserContext);

  const {cid} = useParams()
  const [video,setVideo]=useState({
    vname:"",
    vno:"",
    video:""

  })

  const handleChange = (e)=>{
    const { name, value } = e.target;

    setVideo((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  }

   const setVideoPath = (v)=>{
    setVideo((prev) => {
      return {
        ...prev,
        video:v
      };
    });
   } 

  const onSubmit = async (e)=>{
    e.preventDefault();
   console.log(video);
    try {
      const res = await axios.post(`http://localhost:5000/faculty/course/add-video/${cid}`,video,{ headers: { 'x-auth-token': userData.token } })
      alert('Video Added');
    } catch (error) {
      console.log(error);
      alert("Please try again.")
    }

  }

  return (
    <div>
    <Title level={2}> Add Course</Title>
    <Form onSubmit={onSubmit} >

      <VideoUpload video={video.video} addVideo={setVideoPath}/>

      <label>Topic:</label>
      <Input name='vname' value={video.vname} onChange={handleChange}/>
      <br/><br/>

      <label>Lecture no:</label>
      <Input name='vno' value={video.vno} onChange={handleChange}/>
      <br/><br/>

      <Button type="primary"  onClick={onSubmit}>Add Video</Button>  
    </Form>
    </div>
  )
}

export default AddVideo

import React, { useState ,useContext, useEffect} from 'react'
import UserContext from '../../context/UserContext'
import {Typography, Form, Input, Button,} from 'antd';
import axios from 'axios';
import PdfUpload from '../utils/PdfUpload';
import {useParams} from 'react-router-dom'

const { Title } = Typography;
const { TextArea } = Input;

function AddFile() {

  const { userData, setUserData } = useContext(UserContext);

  const {cid} = useParams()
  const [file,setFile]=useState({
    fname:"",
    fno:"",
    fpath:""

  })

  const handleChange = (e)=>{
    const { name, value } = e.target;

    setFile((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  }

   const setFilePath = (f)=>{
    setFile((prev) => {
      return {
        ...prev,
        fpath:f
      };
    });
   } 

  const onSubmit = async (e)=>{
    e.preventDefault();
   console.log(file);
    try {
      const res = await axios.post(`http://localhost:5000/faculty/course/add-file/${cid}`,file,{ headers: { 'x-auth-token': userData.token } })
      alert('File Added');
    } catch (error) {
      console.log(error);
      alert("Please try again.")
      console.log(error);
    }

  }

  return (
    <div>
    <Title level={2}> Add File</Title>
    <Form onSubmit={onSubmit} >

      <PdfUpload fpath={file.fpath} addFile={setFilePath}/>

      <label>Topic:</label>
      <Input name='fname' value={file.fname} onChange={handleChange}/>
      <br/><br/>

      <label>Note no:</label>
      <Input name='fno' value={file.fno} onChange={handleChange}/>
      <br/><br/>

      <Button type="primary"  onClick={onSubmit}>Add File</Button>  
    </Form>
    </div>
  )
}

export default AddFile

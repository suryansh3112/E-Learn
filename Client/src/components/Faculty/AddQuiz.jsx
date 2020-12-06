import React, { useState ,useContext, useEffect} from 'react'
import UserContext from '../../context/UserContext'
import {Typography, Form, Input, Button,DatePicker} from 'antd';
import axios from 'axios';
import {useParams} from 'react-router-dom'

import './addquiz.css'


function AddQuiz() {

  const { userData, setUserData } = useContext(UserContext);

  const {cid} = useParams()

  const [info,setInfo] = useState({
    qname:"",
    qno:"",
    qdate:"",
    // qna:[{
    //   q:"",
    //   a:"",
    //   b:"",
    //   c:"",
    //   d:"",
    //   ans:""
    // }]
    qna:[]
  })

  const [temp,setTemp] = useState({
    q:"",
    a:"",
    b:"",
    c:"",
    d:"",
    ans:"",
  })

  const handleChange = (e)=>{
    const { name, value } = e.target;

    setInfo((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  }

  const handleTemp = (e)=>{
    const { name, value } = e.target;

    setTemp((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  }

  const onSubmit = async (e)=>{
    e.preventDefault()
    console.log(info);
    try {
      const res = await axios.post(`http://localhost:5000/faculty/course/add-quiz/${cid}`,info,{ headers: { 'x-auth-token': userData.token } })
      alert('Quiz Added');
    } catch (error) {
      console.log(error);
      alert("Please try again.")
      
    }
    
  }

  return (
    <div style={{maxWidth:'600px' ,padding:'1rem 2rem',boxShadow:'6px 6px 15px 5px rgba(0, 0, 0,0.25)',borderRadius:"15px"}}>
     
      <div style={{textAlign:'center'}} >
        <h1>Create Quiz</h1>
      </div>
      <Form onSubmit={onSubmit}>

      <label>Quiz Name : </label>
      <Input name='qname' value={info.qname} onChange={handleChange} className='input-size'/>
      <br/><br/>

      <label>Quiz no.</label>
      <Input name='qno' type='Number' value={info.qno} onChange={handleChange} className='input-size'/>
      <br/><br/>

      <label>Quiz Due Date : </label>
      <DatePicker onChange={(d,dstring)=>{
        setInfo((prev) => {
          return {
            ...prev,
            qdate:dstring
          };
        });
      }} />
       <br/><br/>

      <hr/>
      <h3>Saved Question</h3>
      {
        info.qna && 
        <div>
          {info.qna.map((qna,idx)=>{
            return(<div style={{marginBottom:'10px'}}>
            <label>Question {idx+1} : </label>
              <Input value={qna.q}  className='question'  className='input-size' />  <br/>
              <label>A : </label>
              <Input value={qna.a}  className='question' className='input-size'/>  <br/>
              <label>B : </label>
              <Input value={qna.b} className='question' className='input-size' /> <br/>
              <label>C : </label>
              <Input value={qna.c} className='question' className='input-size' /> <br/>
              <label>D : </label>
              <Input value={qna.d} className='question' className='input-size' /> <br/>
              <label>Answer : </label>
              <Input value={qna.ans}  className='question' className='input-size'/>
            </div>)
          })}
        </div>
      }
      <hr/>

      <div 
      style={{position:'fixed', top:'6rem' ,right:'4rem',
              maxWidth:'500px',padding:'3rem',boxShadow:'6px 6px 15px 5px rgba(0, 0, 0,0.25)',
              borderRadius:"15px"}}
      >

      
      <div>
        <Input name="q" value={temp.q} placeholder='Question'  onChange={handleTemp}  className='question'  /> 
        <Input name="a" value={temp.a} placeholder='Option A' onChange={handleTemp}  className='question' /> 
        <Input name="b" value={temp.b} placeholder='Option B'  onChange={handleTemp} className='question' /> 
        <Input name="c" value={temp.c} placeholder='Option C'  onChange={handleTemp} className='question' /> 
        <Input name="d" value={temp.d} placeholder='Option D' onChange={handleTemp} className='question'  /> 
        <Input name="ans" value={temp.ans} placeholder='Answer (a,b,c,d)' onChange={handleTemp} className='question'  />
      </div>
      <br/><br/>

      <Button type="primary" style={{width:'100%'}}  onClick={(e)=>{
        e.preventDefault()
        setInfo(prev=>{
          return {...prev,qna:[...info.qna,temp]}
        })
        setTemp({
          q:"",
          a:"",
          b:"",
          c:"",
          d:"",
          ans:"",
        })
      }}>Add Question</Button>
      </div>
      <br/><br/>


      <Button type="primary" style={{width:'100%'}} onClick={onSubmit}>Add Quiz</Button>

      </Form>
    </div>
  )
}

export default AddQuiz

import React, { useEffect, useState,useContext } from 'react'
import {Typography, Avatar} from 'antd'
import axios from 'axios';
import UserContext from '../context/UserContext'
import {  PlusOutlined,UserOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom'

const { Title } = Typography;

function Courses() {

  const { userData, setUserData } = useContext(UserContext);

  const [courses,setCourses] = useState([])

  useEffect(()=>{
    axios
    .get('http://localhost:5000/faculty/course/all',{ headers: { 'x-auth-token': userData.token } })
    .then(res=>{
      console.log(res.data);
      setCourses(res.data);
    })
  },[])

  function CourseBox(props) {
    console.log(props.cimg);
    return(
      <div style={{borderRadius:"10px",boxShadow:'5px 5px 10px 5px rgba(31, 29, 29, 0.5)',margin:'1.5rem',width:'25%'}}>
        
        <div style={{backgroundColor:'#16697a',padding:'1rem',borderRadius:"10px"}}>
        <Link to={`/course/${props.id}`}> <Title level={2} style={{color:'#fff'}}>{props.cname}</Title> </Link>
          
          <h4 style={{color:'#fff'}}>{props.cprof}</h4>
        </div>
        <div>
          {props.cimg ? 
          
          <img src={`http://localhost:5000/${props.cimg}`} alt='Professor '
          height='120px' 
          width='120px' 
          style={{borderRadius:'50%',position:'relative' ,left:'55%',bottom:'60px' }}/> 
          
          : <Avatar size={120} icon={<UserOutlined />} 
              style={{borderRadius:'50%',position:'relative' ,left:'55%',bottom:'60px' }}/>
          }
        </div>
        

          <div style={{color:'black',padding:'0 1.5rem 1.5rem'}}>
            {props.cdesc}
          </div>
      </div>
    )
  }

  return (
    <div>
      <h1>Courses</h1>
      {
        !userData.student && <Link to='/add-course'>
        <div style={{position:'fixed' ,top:'7rem',right:'4rem'}}>
          <Avatar size={80} icon={ <PlusOutlined />} style={{borderRadius:'50%'}} />
          <Title level={5}>Add Course</Title>
        </div>
      </Link>
      }
      

      <div style={{display:'flex', flexWrap:'wrap'}}>
      {courses && courses.map((item)=>{
        return <CourseBox key={item._id} id={item._id} cname={item.cname} cimg={item.cimg} cprof={item.cprof} cdesc={item.cdesc}/>
      })}
      </div>
      
    </div>
  )
}

export default Courses

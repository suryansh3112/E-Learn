import React, { useState,useEffect ,useContext} from 'react'
import UserContext from '../context/UserContext'
import ReactPlayer from 'react-player'
import {  PlusOutlined,UserOutlined} from '@ant-design/icons';
import {Link,useParams} from 'react-router-dom'
import axios from 'axios'
import {Typography, Avatar} from 'antd'
const { Title } = Typography;

function SpecificCourse() {

  const { userData, setUserData } = useContext(UserContext);
  const {cid} = useParams();
  const [course,setCourse]=useState({})

  useEffect(()=>{
    axios
    .get(`http://localhost:5000/faculty/course/${cid}`,{ headers: { 'x-auth-token': userData.token } })
    .then(res=>setCourse(res.data))
  },[])
 

  function DisplayVideos(props){
    return(
      <div>
        <h3>Lecture {props.vno} : {props.vname}</h3>
        <video width="320" height="240" controls>
          <source src={`http://localhost:5000/${props.video}`}  />
        </video>
      </div>
    )
  }

  return (
    <div>
        
       {
        !userData.student && <Link to={`/add-video/${cid}`}>
        <div style={{position:'fixed' ,top:'7rem',right:'4rem'}}>
          <Avatar size={80} icon={ <PlusOutlined />} style={{borderRadius:'50%'}} />
          <Title level={5}>Add video</Title>
        </div>
      </Link>
      }

      {
        course && (
          <div>
           <h1>{course.cname}</h1>
           {course.videos && course.videos.map(item=>{
             return <DisplayVideos key={item._id} vname={item.vname} vno={item.vno} video={item.video}/>
           })}
          </div>
        )
      }
      


    </div>
  )
}

export default SpecificCourse


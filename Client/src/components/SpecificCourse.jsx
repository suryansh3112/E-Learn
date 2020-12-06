import React, { useState,useEffect ,useContext} from 'react'
import UserContext from '../context/UserContext'
import ReactPlayer from 'react-player'
import {  PlusOutlined,UserOutlined,CaretRightOutlined } from '@ant-design/icons';
import {Link,useParams} from 'react-router-dom'
import axios from 'axios'
import {Typography, Avatar,  Collapse, Tabs, Button} from 'antd'
import './specificCourse.css'


const { Panel } = Collapse;

const { Title } = Typography;

const { TabPane } = Tabs;


function SpecificCourse() {

  const { userData, setUserData } = useContext(UserContext);
  const {cid} = useParams();
  const [course,setCourse]=useState({})

  useEffect(()=>{
    axios
    .get(`http://localhost:5000/faculty/course/${cid}`,{ headers: { 'x-auth-token': userData.token } })
    .then(res=>setCourse(res.data))
  },[])
 
  console.log(course);
  function DisplayVideos({header, video, idx, ...props}){

    console.log(props);
    return(
      
        <Collapse.Panel header={header} key={idx} className="site-collapse-custom-panel" {...props}>
          <video width="320" height="240" controls muted>
            <source src={`http://localhost:5000/${video}`}  />
          </video>
        </Collapse.Panel>
    )
  }

  function DisplayFiles({header, fpath, idx, ...props}){
    return(
      
         
        <Collapse.Panel header={header}  className="site-collapse-custom-panel" {...props}>
          <embed src={`http://localhost:5000/${fpath}`} height="300px" width="60%"></embed>
       
        </Collapse.Panel> 
    )
  }

  function Scores({name,rollno,score}){
    return(
      <tr>
        <td>{rollno}</td>
        <td>{name}</td>
        <td>{score}</td>
      </tr>
    )
  }

  function DisplayQuiz({results,date,header,qna,qid,...props}){
    
    return(
      <Collapse.Panel header={header}  className="site-collapse-custom-panel" {...props}>
        <hr/>
        <div>
          <p><strong>Due :</strong> {date.substring(0,10)}  <strong>Points :</strong> {qna.length} <strong>Questions:</strong> {qna.length} </p>
          <p><strong>Time Limit : </strong> 60 minutes</p>
          <p><strong>Allowed Attempts : </strong> Unlimited</p>
        
        </div>
        <hr/>
          <h3>Instructions </h3>
          <p>Quick Quiz</p>

          {userData.student ? <Button type='primary' >
            <Link to={`/attempt-quiz/${qid}`}>
              Attempt Quiz
            </Link>
          </Button> : <Button disabled type='primary' >
            <Link to={`/attempt-quiz/${qid}`}>
              Attempt Quiz
            </Link>
          </Button>}

          {results && !userData.student &&
            <div>
            <h3>Scores</h3>
            <table>
              <tr>
                <th>Rollno</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
              {results.map((item,idx)=>{
                return <Scores key={idx} name={item.name} rollno={item.rollno} score={item.score} />
              })}
            </table>
            </div>
          }

          
          

          
       
        </Collapse.Panel> 
    )
  }


  return (
    <div style={{textAlign:'center'}}>
        
       {
        !userData.student && <Link to={`/add-video/${cid}`}>
        <div style={{position:'fixed' ,top:'7rem',right:'4rem'}}>
          <Avatar size={80} icon={ <PlusOutlined />} style={{borderRadius:'50%'}} />
          <Title level={5}>Add video</Title>
        </div>
      </Link>
      }

      {
        !userData.student && <Link to={`/add-file/${cid}`}>
        <div style={{position:'fixed' ,top:'15rem',right:'4rem'}}>
          <Avatar size={80} icon={ <PlusOutlined />} style={{borderRadius:'50%'}} />
          <Title level={5}>Add File</Title>
        </div>
      </Link>
      }

      {
        !userData.student && <Link to={`/add-quiz/${cid}`}>
        <div style={{position:'fixed' ,top:'23rem',right:'4rem'}}>
          <Avatar size={80} icon={ <PlusOutlined />} style={{borderRadius:'50%'}} />
          <Title level={5}>Add Quiz</Title>
        </div>
      </Link>
      }

      {course && <h1>{course.cname}</h1>}

      <div style={{width:'80%' ,margin:'1rem auto'}}>

      <Tabs defaultActiveKey="1" centered >
        <TabPane tab="Videos" key="1">
        {
          <div>    
            <Collapse
              bordered={false}
              defaultActiveKey={['1']}
              expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
              className="site-collapse-custom-collapse"
            >
           {course.videos && course.videos.map((item,idx)=>{
             const header = 'Lecture '+item.vno+' : '+item.vname;
             return <DisplayVideos key={item._id} idx={idx+1} header={header} video={item.video}/>
           })}

           </Collapse>
          </div>  
      }
        </TabPane>
        <TabPane tab="Notes" key="2">
        {
          <div>    
            <Collapse
              bordered={false}
              defaultActiveKey={['1']}
              expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
              className="site-collapse-custom-collapse"
            >
              {course.files && course.files.map((item,idx)=>{
                const header = 'Note '+item.fno+' : '+item.fname;
                return <DisplayFiles key={item._id} idx={idx+1} header={header} fpath={item.fpath}/>
              })}
            </Collapse>
          </div> 
        }
        </TabPane>
        <TabPane tab="Quiz" key="3">
          <Collapse
            bordered={false}
            defaultActiveKey={['1']}
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            className="site-collapse-custom-collapse"
          >
            {course.quizs && course.quizs.map((item,idx)=>{
                const header = 'Quiz #'+item.qno+' : '+item.qname;
                return <DisplayQuiz key={item._id} results={item.results} idx={idx+1} qid={item._id} date={item.qdate} header={header} qna={item.qna} />
              })}

          </Collapse>
        </TabPane>
      </Tabs>

      </div>

      



      

    </div>
  )
}

export default SpecificCourse


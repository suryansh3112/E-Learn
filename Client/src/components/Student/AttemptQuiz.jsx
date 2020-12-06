import React, { useState,useEffect ,useContext} from 'react'
import {Radio,Form,Button } from 'antd'
import UserContext from '../../context/UserContext'
import axios from 'axios'
import {useParams} from 'react-router-dom'

function AttemptQuiz() {

  
  const {qid} = useParams()
  const [check,setCheck]=useState({a:"",b:"",c:"",d:""})
  const [qna,setQna] = useState()
  console.log('qna =' ,qna);
  const { userData, setUserData } = useContext(UserContext);

  useEffect(()=>{
    axios
    .get(`http://localhost:5000/faculty/course/get-quiz/${qid}`,{ headers: { 'x-auth-token': userData.token } })
    .then(res=>{
      if(res.data){
       setQna(res.data.qna)
      }
    })
    .catch(error=>{
      console.log(error);
    })
  },[])

  // function Display({q,a,b,c,d,idx,check,setQna}){

  //   const [value,setValue] = useState()

  //   return(
  //     <div style={{margin:'10px'}}>
  //       <p>Q{idx} : {q}</p>
  //       <Radio.Group name = {`${idx}`} onChange={(e)=>{
          
  //         setQna(prev=>{
  //           prev[idx].check = e.tartget.value;
  //           return prev;
  //          })
  //         console.log('value==',value)
          
  //       }} value={check}>
  //         <Radio value="a">{a}</Radio>
  //         <Radio value="b">{b}</Radio>
  //         <Radio value="c">{c}</Radio>
  //         <Radio value="d">{d}</Radio>
  //       </Radio.Group>
  //     </div>
  //   )
  // }

  // const [value, setValue] = React.useState(1);

  const onChange = e => {
    const {name,value} = e.target
    setCheck(prev=>{
      return {...prev,
        [name]:value
      }
    })
    
    
  };

  const onSubmit = async(e)=>{
    e.preventDefault()
    console.log(check,qna);
    const arr = [check.a,check.b,check.c,check.d]
    let i,score=0;
    for (i=0;i<4;i++){
      if(qna[i].ans===arr[i])
        score++
    }
    alert(score)
    const data = {name:userData.user.name,rollno:userData.user.username,score:score}
    axios
    .post(`http://localhost:5000/faculty/course/submit-quiz/${qid}`,data,{ headers: { 'x-auth-token': userData.token } })
    .then(res=>{
      alert(`Test Submitted \nScore=${score}`)
    })
    .catch(error=>{
      alert('Please try again')
      console.log(error);
    })

  }

  return (
    <div style={{maxWidth:'500px', margin:'0 auto' ,padding:'1rem 2rem',boxShadow:'6px 6px 15px 5px rgba(0, 0, 0,0.25)',borderRadius:"15px"}}> 
    {/* <Radio.Group onChange={onChange} value={value}>
          <Radio value="a">hi</Radio>
          <Radio value="b">bye</Radio>
          <Radio value="c">uy</Radio>
          <Radio value="d">sdg</Radio>
        </Radio.Group> */}
      <h1>Test</h1>
      <Form onSubmit={onSubmit}>
      
      {qna && <div>
        <p><b>Q1 : </b>{qna[0].q}</p>
      <Radio.Group name='a' onChange={onChange} value={check.a}>
          <Radio value="a">{qna[0].a}</Radio>
          <Radio value="b">{qna[0].b}</Radio>
          <Radio value="c">{qna[0].c}</Radio>
          <Radio value="d">{qna[0].d}</Radio>
        </Radio.Group>
        <br/><br/>

        <p><b>Q2 : </b>{qna[1].q}</p>
        <Radio.Group name='b'  onChange={onChange} value={check.b}>
          <Radio value="a">{qna[1].a}</Radio>
          <Radio value="b">{qna[1].b}</Radio>
          <Radio value="c">{qna[1].c}</Radio>
          <Radio value="d">{qna[1].d}</Radio>
        </Radio.Group>
        <br/><br/>

        <p><b>Q3 : </b>{qna[2].q}</p>
        <Radio.Group name='c' onChange={onChange}  value={check.c}>
          <Radio value="a">{qna[2].a}</Radio>
          <Radio value="b">{qna[2].b}</Radio>
          <Radio value="c">{qna[2].c}</Radio>
          <Radio value="d">{qna[2].d}</Radio>
        </Radio.Group>
        <br/><br/>

        <p><b>Q4 : </b>{qna[3].q}</p>
        <Radio.Group name='d' onChange={onChange} value={check.d}>
          <Radio value="a">{qna[3].a}</Radio>
          <Radio value="b">{qna[3].b}</Radio>
          <Radio value="c">{qna[3].c}</Radio>
          <Radio value="d">{qna[3].d}</Radio>
        </Radio.Group>
        <br/><br/>
        
      </div>}
      
        



      <Button type="primary"  onClick={onSubmit}>Submit</Button>  
      </Form>
    </div>
  )
}

export default AttemptQuiz

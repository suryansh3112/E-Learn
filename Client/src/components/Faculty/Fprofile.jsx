import React, { useState ,useContext, useEffect} from 'react'
import ImageUpload from '../utils/ImageUpload'
import UserContext from '../../context/UserContext'
import { Form, Input, Button, Checkbox ,Select} from 'antd';
import axios from 'axios'
import './facultyProfile.css'
const { Option } = Select;

function Fprofile() {

  const { userData, setUserData } = useContext(UserContext);

  const [profileExist,setProfileExist] = useState(false)

  const[info,setInfo] = useState({
    name:userData.user.name,
    regno:"",
    department:"",
    q1:"",
    q2:"",
    image:""
  })

  useEffect(()=>{
    axios
    .get('http://localhost:5000/faculty/profile',{ headers: { 'x-auth-token': userData.token } })
    .then(res=>{
      if(res.data){
        setProfileExist(true)
        setInfo(res.data)
      }
    })
    .catch(error=>{
      console.log(error);
    })
  },[])

  const handleChange = (e)=>{
    const { name, value } = e.target;

    setInfo((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  }


  const departments = [
    { key: 1, value: "Computer Eng." },
    { key: 2, value: "I.T" },
    { key: 3, value: "E.C.S" },
    { key: 4, value: "Mechanical Eng." }   
  ]

  const qualifications = [
    { key: 1, value: "B.E" },
    { key: 2, value: "B.Tech" },
    { key: 3, value: "M.E" },
    { key: 4, value: "M.Tech" }   
  ]

  const onSubmit = async (e)=>{
    e.preventDefault();
      
    try {
      let res;
      if (profileExist){
        res = await axios.patch('http://localhost:5000/faculty/profile',info,{ headers: { 'x-auth-token': userData.token } })
      }else{
        res = await axios.post('http://localhost:5000/faculty/profile',info,{ headers: { 'x-auth-token': userData.token } })
      }
        alert('Profile Saved');
    } catch (error) {
      console.log(error);
      alert("Please try again.")
    }

  }

  
  
  return (
    <div style={{maxWidth:'500px', margin:'0 auto' ,padding:'1rem 2rem',boxShadow:'6px 6px 15px 5px rgba(0, 0, 0,0.25)',borderRadius:"15px"}}>
      
      <div style={{textAlign:'center'}} >
      <h1 style={{marginBottom:'0'}} >Profile</h1>
      </div>
      <Form>
      
      <div style={{margin:'0 0 1rem 10rem'}} >
        <ImageUpload image={info.image} setImage={setInfo}/>
        </div>
        

        <label>Name : </label>
        <Input name='name' value={info.name} style={{width:'80%'}}/>
        <br/><br/>

        <label>Reg no. </label>
        <Input type='number' name='regno' value={info.regno} onChange={handleChange} style={{width:'100px'}}/>
        <br/><br/>

        <label>Department : </label>
        <Select name='department' value={info.department} onChange ={v=>{
          setInfo(prev=>{
            return{...prev,department:v}
          })
        }} 
        style={{ width: 150 }} placeholder='Branch' >
            {departments.map(item=>
              <Option key={item.key} value={item.value}>{item.value}</Option>
            )}
        </Select>

              <br/><br/>

        <label>Qualification : </label>
        <Input.Group compact>
          <Select name='q1' value={info.q1} onChange ={v=>{
            setInfo(prev=>{
              return{...prev,q1:v}
            })
          }} 
          style={{ width: 120 }} placeholder='Branch' >
              {qualifications.map(item=>
                <Option key={item.key} value={item.value}>{item.value}</Option>
              )}
          </Select>

          <Select name='q2' value={info.q2} onChange ={v=>{
            setInfo(prev=>{
              return{...prev,q2:v}
            })
          }} 
          style={{ width: 150 }} placeholder='Branch' >
              {departments.map(item=>
                <Option key={item.key} value={item.value}>{item.value}</Option>
              )}
          </Select>
        </Input.Group>

        <br/><br/>
     
        <Button type="primary" style = {{width:'100%'}} onClick={onSubmit}>Save</Button> 
   
      </Form>
    </div>
    
  )
  
}

export default Fprofile

import React, { useState ,useContext, useEffect} from 'react'
import ImageUpload from '../utils/ImageUpload'
import UserContext from '../../context/UserContext'
import { Form, Input, Button, Checkbox ,Select} from 'antd';
import axios from 'axios'
import './profile.css'

const { Option } = Select;

function Sprofile() {

  const { userData, setUserData } = useContext(UserContext);

  const [profileExist,setProfileExist] = useState(false)

  const [info,setInfo]=useState({
    name:userData.user.name,
    department:'',
    image:'',
    rollno:userData.user.username,
    age:'',
    mobile:'',
    altmobile:'',
  })

  useEffect(()=>{
    axios
    .get('http://localhost:5000/student/profile',{ headers: { 'x-auth-token': userData.token } })
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
  

  const departments = [
    { key: 1, value: "Computer Eng." },
    { key: 2, value: "I.T" },
    { key: 3, value: "E.C.S" },
    { key: 4, value: "Mechanical Eng." }   
  ]

  const handleChange = (e)=>{
    const { name, value } = e.target;

    setInfo((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  }


  const onSubmit = async (e)=>{
    e.preventDefault();
      
    try {
      let res;
      if (profileExist){
        res = await axios.patch('http://localhost:5000/student/profile/add',info,{ headers: { 'x-auth-token': userData.token } })
      }else{
        res = await axios.post('http://localhost:5000/student/profile/add',info,{ headers: { 'x-auth-token': userData.token } })
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

      <Form onSubmit={onSubmit} >


      
        <div style={{margin:'0 0 1rem 10rem'}} >
        <ImageUpload image={info.image} setImage={setInfo}/>
        </div>
      
      

      <label>Name : </label>
      <Input name='name' value={info.name}  className='input-size'/>
      <br/><br/>

      <label>Roll no. </label>
      <Input name='rollno' value={info.rollno} className='input-size'/>
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

      <label>Age : </label>
      <Input name='age' value={info.age} onChange={handleChange} style={{width:'60px'}}/>
      <br/><br/>

      <label>Mobile : </label>
      <Input name='mobile' value={info.mobile} onChange={handleChange} className='input-size'/>
      <br/><br/>

      <label>Alt-mobile : </label>
      <Input name='altmobile' value={info.altmobile} onChange={handleChange} className='input-size'/>
      <br/><br/>

      <Button type="primary" style = {{width:'100%'}} onClick={onSubmit}>Save</Button>  

      </Form>
    </div>
  )
}

export default Sprofile

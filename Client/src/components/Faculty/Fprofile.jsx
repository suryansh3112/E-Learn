import React, { useState ,useContext, useEffect} from 'react'
import ImageUpload from '../utils/FileUpload'
import UserContext from '../../context/UserContext'
import { Form, Input, Button, Checkbox ,Select} from 'antd';
import axios from 'axios'
import './facultyProfile.css'
const { Option } = Select;

function Fprofile() {

  const [image,setImage] = useState("aaaa");

  // const[profileData,setProfileData] = useState({
  //   name:"",
  //   regno:"",
  //   department:"",
  //   q1:"",
  //   q2:"",
  //   image:""
  // })

  const { userData, setUserData } = useContext(UserContext);


  // useEffect(() => {
  //   axios
  //   .get('http://localhost:5000/faculty/profile/get', { headers: { 'x-auth-token': userData.token } })
  //   .then(res=>{
  //     if(res.data){
  //       let name = res.data.name
  //       let regno = res.data.regno
  //       let department = res.data.department
  //       let q1 = res.data.q1
  //       let q2 = res.data.q2
  //       let image = res.data.image

        
  //       setProfileData({
  //         name,
  //         regno,
  //         department,
  //         q1,
  //         q2,
  //         image
  //       });
  //       console.log('p==',profileData);

  //   }
  //   })
      
  // }, [])
  
  const addImage = (imagePath)=> setImage(imagePath);



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

  const formItemLayout = {
     labelCol: { span: 2,offset:0},
    wrapperCol: { span: 14 ,offset:0},
  };

  const onFinish = async(values)=>{
    
    const data = {...values,image}
    console.log(data);
    try {
      const res = await axios.post('http://localhost:5000/faculty/profile/add',data,{ headers: { 'x-auth-token': userData.token } });
      alert('Profile Saved.')
    } catch (error) {
      alert('Please try again!!')
      console.log(error.response.data.message);
    }
    
    
  }

  
  
  return (
    <div>
      
      <Form 
        onFinish={onFinish}
        {...formItemLayout}
      >
      <div >
        <ImageUpload addImage={addImage}/>
      </div>
     

      <Form.Item
        name='name'
        label='Name'
        initialValue={userData.user.name}
        
        
      >
        <Input />
        
      </Form.Item>

      <Form.Item
        name='regno'
        label='Reg. Number'
      >
       
        <Input type='number'/>
      </Form.Item>
        
      <Form.Item
        name='department'
        label='Department'
        
      >
        <Select style={{ width: 150 }} placeholder='Branch' >
          {departments.map(item=>
            <Option key={item.key} value={item.value}>{item.value}</Option>
          )}
        </Select>
      </Form.Item>  
         
      <Form.Item  label='Qualification'>
      <Input.Group compact>
        <Form.Item name='q1'>
          <Select style={{ width: 100 }} placeholder='Degree'>
            {qualifications.map(item=>
              <Option key={item.key} value={item.value}>{item.value}</Option>
            )}
          </Select>
        </Form.Item>
        <Form.Item name='q2'>
          <Select  style={{ width: 150 }} placeholder='Branch'>
              {departments.map(item=> 
                <Option key={item.key} value={item.value}>{item.value}</Option>
              )}
            </Select> 
        </Form.Item>
      </Input.Group>
        
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">Save</Button>    
      </Form.Item>
       
        
        

      </Form>

    </div>
    
  )
  // return(
  //   <>
  //     <h1>Name = {profileData.name}</h1>
  //     <h1>Image = {profileData.image}</h1>
  //     <input value={profileData.q1}/>
  //     <input value={profileData.q2}/>
  //   </>
  // )
}

export default Fprofile

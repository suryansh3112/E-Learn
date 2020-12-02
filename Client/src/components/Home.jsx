import React, { useState, useContext ,useEffect} from 'react';
import axios from 'axios'
import UserContext from '../context/UserContext';
import {Button } from 'antd';

function Home() {
 
  const { userData, setUserData } = useContext(UserContext);
  console.log('Home',userData);
  let salutation = 'Welcome to Home Page';
  if (userData.user) {
    salutation = `Welcome ${userData.user.name} you are a ${userData.student}`;

  }

  // useEffect(()=>{
  //   async function getProfile(){
  //     const res = await axios.get('http://localhost:5000/faculty/profile/get',
  //                         { headers: { 'x-auth-token': userData.token } });
      
      // if(res.data){
      //   let name = res.data.name
      //   let regno = res.data.regno
      //   let department = res.data.department
      //   let q1 = res.data.q1
      //   let q2 = res.data.q2
      //   let image = res.data.image

        
      //   setProfileData({
      //     name,
      //     regno,
      //     department,
      //     q1,
      //     q2,
      //     image
      //   });
  //       console.log(name,q1,q2);
  //     }
      
  //     console.log('HOME=' ,profileData);
  //   }
     
      
    

  //   getProfile();

  // },[])


  const[profileData,setProfileData] = useState({
    name:"",
    regno:"",
    department:"",
    q1:"",
    q2:"",
    image:""
  })


  return (
    <div>
      <h1>{salutation}</h1>
      <Button type='primary ' danger>Click me</Button>
      <h1>lskjdfkljslfjl</h1>
      <h1>lskjdfkljslfjl</h1>
      <h1>lskjdfkljslfjl</h1>
      <h1>lskjdfkljslfjl</h1>
      <h1>lskjdfkljslfjl</h1>
      <h1>lskjdfkljslfjl</h1>
      <h1>lskjdfkljslfjl</h1>
      <h1>lskjdfkljslfjl</h1>
      <h1>lskjdfkljslfjl</h1>
      <h1>lskjdfkljslfjl</h1>
      <h1>lskjdfkljslfjl</h1>
      <h1>lskjdfkljslfjl</h1>
    </div>
  );
}

export default Home;

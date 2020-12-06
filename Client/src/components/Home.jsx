import React, { useState, useContext ,useEffect} from 'react';
import axios from 'axios'
import UserContext from '../context/UserContext';
import {Button } from 'antd';

function Home() {
 
  const { userData, setUserData } = useContext(UserContext);
  
  let salutation = 'Welcome to Home Page';
  if (userData.user) {
    salutation = `Welcome ${userData.user.name}, this is the Homepage `;

  }

  


  return (
    <div style={{maxWidth:'500px', margin:'0 auto' ,padding:'2rem ',boxShadow:'6px 6px 15px 5px rgba(0, 0, 0,0.25)',borderRadius:"15px"}}>
      <h2>{salutation}</h2>
      <h2>This is an E Learning Platform</h2>
      <h1><em>Developed By:</em></h1>
      <h1>8610 : Sahil Jain</h1>
      <h1>8630 : Suryansh Purohit</h1>
      <h1>8641 : Rahul Shinde</h1>
      
    </div>
  );
}

export default Home;

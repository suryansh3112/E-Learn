import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './register.css';
import Error from '../Errors/Errors';

function Register() {
  console.log('REG');
  const history = useHistory();
  const [error, setError] = useState('');
  const [check, setCheck] = useState(false);

  const formItemLayout = {
    labelCol: {
      span: 24
    }
    // wrapperCol: {
    //   span: 10
    // }
  };

  const onFinish = async (values) => {
    
    let url;
    if(check){
      url='http://localhost:5000/faculty/register';
    }else{
      url='http://localhost:5000/student/register';
    }
    try {
      const res = await axios.post(
        url,
        values
      );
      
      alert('Registered Successfully.')
      history.push('/login');
    } catch (error) {
      setError(error.response.data.message);
      //alert('Something went wrong,Please try again.');
    }
  };

  const clearError = () => setError(undefined);

  return (
    <div className="reg-container">
      <h1>Register</h1>

      <Form
        name="registeration-form"
        onFinish={onFinish}
       {...formItemLayout}
        labelAlign='right'
        className="reg-form"
      >
        {error && <Error message={error} clearError={clearError} />}
        <Form.Item style={{ marginBottom: 0 }}>
        <Form.Item
         
          name="fn"
          rules={[
            {
              required: true,
              message: 'Please input your First name!'
            }
          ]}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
        >
          <Input placeholder='First Name'/>
        </Form.Item>

        <Form.Item
          
          name="ln"
          rules={[
            {
              required: true,
              message: 'Please input your Last Name!'
            }
          ]}
          style={{ display: 'inline-block', width: 'calc(50% )', margin: '0 0 0 8px' }}
        >
          <Input placeholder='Last Name'/>
        </Form.Item>
        </Form.Item>

        <Form.Item
          
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!'
            },
            {
              required: true,
              message: 'Please input your E-mail!'
            }
          ]}
        >
          <Input placeholder='E-mail'/>
        </Form.Item>

        {!check && <Form.Item
          
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!'
            }
          ]}
        >
          <Input placeholder='Username' type='Number'/>
        </Form.Item>}

        <Form.Item
         
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            }
          ]}
        >
          <Input.Password placeholder='Password'/>
        </Form.Item>

        <Form.Item
          
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            }
          ]}
        >
          <Input.Password placeholder='Confirm Password'/>
        </Form.Item>

        {check && <Form.Item
         
          name="code"
          rules={[
            {
              required: true,
              message: 'Please enter the code!'
            }
          ]}
        >
          <Input.Password placeholder='Security Code'/>
        </Form.Item>}
        <Form.Item >
        <Checkbox checked={check} onChange={()=>setCheck(!check)}>
          Faculty
        </Checkbox>
      </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="reg-form-button">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register;

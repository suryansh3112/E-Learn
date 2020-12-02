import React, { useContext, useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link,useHistory } from 'react-router-dom';
import axios from 'axios';
import Error from '../Errors/Errors';
import UserContext from '../../context/UserContext';
import './login.css';


function Login() {
  console.log('LOGIN');
  const {userData, setUserData } = useContext(UserContext);
  const [error, setError] = useState('');
  const [check, setCheck] = useState(false);
  const history = useHistory();

  const onFinish = async (values) => {
    
    let url;
    if(check){
      url='http://localhost:5000/faculty/login';
    }else{
      url='http://localhost:5000/student/login';
    }
    try {
      const loginRes = await axios.post(
        url,
        values
      );
      // console.log(loginRes.data);
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
        student: loginRes.data.student
      });
     
      localStorage.setItem('auth-token', loginRes.data.token);
      localStorage.setItem('student', loginRes.data.student);
      
      history.push('/home');
    } catch (error) {
      setError(error.response.data.message);
      // alert('Something went wrong,Please try again.');
    }
  };

  const clearError = () => setError(undefined);

  return (
    <div className="login-container">
      <h1>Login</h1>

      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true
        }}
        onFinish={onFinish}
      >
        {error && <Error message={error} clearError={clearError} />}
        <Form.Item
          name="emailOrUsername"
          rules={[
            {
              required: true,
              message: 'Please input your Username or E-mail!'
            }
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username or email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!'
            }
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
        
        <Form.Item noStyle>
        <Checkbox checked={check} onChange={()=>setCheck(!check)}>
          Faculty
        </Checkbox>
      </Form.Item>

          <Link className="login-form-forgot" to="/">
            Forgot password
          </Link>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <Link to="/register">register now!</Link>
        </Form.Item>
      </Form>
      
    </div>
  );
}

export default Login;

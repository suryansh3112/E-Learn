import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/index';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, Courses, Register, Login,SpecificCourse } from './components';
import UserContext from './context/UserContext';
import axios from 'axios';
import './App.css';

//Faculty
import Fprofile from './components/Faculty/Fprofile'
import AddCourse from './components/Faculty/AddCourse'
import AddVideo from './components/Faculty/AddVideo'
import AddFile from './components/Faculty/AddFile'


//Student
import Sprofile from './components/Student/Sprofile'

function App() {
  console.log('APP');
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
    student:undefined
  });

  const NotLoggedIn = ()=>{
    return(
      <Switch>
              <Route path="/home" component={Home} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
      </Switch>
    )
  }

  const Student = ()=>{
    return(
      <Switch>
              <Route path="/home" component={Home} />
              <Route path="/courses" component={Courses} />
              <Route path="/course/:cid" component={SpecificCourse} />
              <Route path="/profile" component={Sprofile} />
              
      </Switch>
    )
  }

  const Faculty = ()=>{
    return(
      <Switch>
              <Route path="/home" component={Home} />
              <Route path="/profile" component={Fprofile} />
              <Route path="/courses" component={Courses} />
              <Route path="/add-course" component={AddCourse} />
              <Route path="/add-video/:cid" component={AddVideo} />
              <Route path="/add-file/:cid" component={AddFile} />
              <Route path="/course/:cid" component={SpecificCourse} />
      </Switch>
    )
  }

  const InnerFunction = ()=>{
    if(userData.student===undefined)
      return <NotLoggedIn/>
    else if(userData.student===false)
      return <Faculty/>
    else
      return <Student/>
  }

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');
      let student = localStorage.getItem('student');
      // console.log(student);
      // if(!student){
      //   console.log('yes asd asd asd asdfg f ')
      // }
      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }
      if (student === null) {
        localStorage.setItem('student', 'true');
        student = true;
      }
      student=JSON.parse(student);
      let temp = student ? 'student' : 'faculty';
      const tokenRes = await axios.post(
        `http://localhost:5000/${temp}/tokenIsValid`,
        null,
        { headers: { 'x-auth-token': token } }
      );
      if (tokenRes.data) {
        const userRes = await axios.get(`http://localhost:5000/${temp}/`, {
          headers: { 'x-auth-token': token }
        });
        setUserData({
          token,
          user: userRes.data,
          student
        });
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <>
      <Router>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Navbar />
          <div className="container">
            <InnerFunction/>
          </div>
        </UserContext.Provider>
      </Router>
    </>
  );
}

export default App;



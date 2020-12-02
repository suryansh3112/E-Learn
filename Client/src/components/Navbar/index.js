import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../../context/UserContext';
import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu';
import Mobile from './Mobile';
import { Drawer, Button } from 'antd';
import { useLocation } from 'react-router-dom';
import './navbar.css';

function Navbar() {
  console.log('NAV');
  const { userData, setUserData } = useContext(UserContext);

  const [current, setCurrent] = useState('');

  const [visible, setVisible] = useState(false);
  const handleNav = (e) => {
    setCurrent(e.key);
  };
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
      student: undefined
    });
    localStorage.setItem('auth-token', '');
    localStorage.setItem('student', '');
  };

  return (
    <nav className="menuBar">
      <div className="logo">
        <a href="#">logo</a>
      </div>
      <div className="menuCon">
        <div className="leftMenu">
          <LeftMenu
            handleNav={handleNav}
            current={current}
            userLoggedIn={userData}
          />
        </div>
        <div className="rightMenu">
          <RightMenu
            handleNav={handleNav}
            current={current}
            userLoggedIn={userData}
            logout={logout}
          />
        </div>

        <Button className="barsMenu" type="primary" onClick={showDrawer}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </Button>

        <Drawer
          title="Basic Drawer"
          placement="right"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <Mobile
            handleNav={handleNav}
            current={current}
            userLoggedIn={userData}
            logout={logout}
          />
        </Drawer>
      </div>
    </nav>
  );
}

export default Navbar;

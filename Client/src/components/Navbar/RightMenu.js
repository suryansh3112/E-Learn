import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function RightMenu(props) {
  const user = props.userLoggedIn.user;
  return (
    <div>
      <Menu
        mode="horizontal"
        onClick={props.handleNav}
        selectedKeys={[props.current]}
      >
        {!user && (
          <Menu.Item key="Login">
            <Link to="/login">Login</Link>
          </Menu.Item>
        )}
        {!user && (
          <Menu.Item key="Register">
            <Link to="/register">Register</Link>
          </Menu.Item>
        )}
     
        {user && (
          <Menu.Item key="Profile">
            <Link to='/f-profile'>Profile</Link>
          </Menu.Item>
        )}
        {user && (
          <Menu.Item key="logout">
            <Link onClick={props.logout}>Logout</Link>
          </Menu.Item>
        )}
      </Menu>
    </div>
  );
}

export default RightMenu;

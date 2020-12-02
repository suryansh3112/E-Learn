import React, { useState } from 'react';
import { Menu, Button } from 'antd';
import { Link } from 'react-router-dom';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function Mobile(props) {
  const user = props.userLoggedIn.user;

  return (
    <Menu
      onClick={props.handleNav}
      selectedKeys={[props.current]}
      // className="mobile-menu"
    >
      <Menu.Item key="home">
        <Link to="/home">Home</Link>
      </Menu.Item>
      <SubMenu title={<span>Blogs</span>}>
        <MenuItemGroup title="Item 1">
          <Menu.Item key="setting:1">Option 1</Menu.Item>
          <Menu.Item key="setting:2">Option 2</Menu.Item>
        </MenuItemGroup>
        <MenuItemGroup title="Item 2">
          <Menu.Item key="setting:3">Option 3</Menu.Item>
          <Menu.Item key="setting:4">Option 4</Menu.Item>
        </MenuItemGroup>
      </SubMenu>
      <Menu.Item key="contact">
        <Link to="/contact">Contact</Link>
      </Menu.Item>
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
        <Menu.Item key="logout">
          <Link onClick={props.logout}>Logout</Link>
        </Menu.Item>
      )}
    </Menu>
  );
}

export default Mobile;

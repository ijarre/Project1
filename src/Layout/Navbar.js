import React, { useContext } from "react";
import "../App.css";
import { Layout, Menu, Breadcrumb, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import LogOutButton from "../Pages/LogOutButton";
import ChangePassword from "../Pages/ChangePassword";

const NavBar = () => {
  const { Header, Content, Footer } = Layout;
  const [user] = useContext(UserContext);

  const menu = (
    <Menu>
      <Menu.Item>
        <Menu.Item key="8">
          <Link to="/tabel-movie/form">Movie</Link>
        </Menu.Item>
        <Menu.Item key="9">
          <Link to="/tabel-game/form">Game</Link>
        </Menu.Item>
      </Menu.Item>
    </Menu>
  );
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>
          {user && (
            <>
              <Menu.Item key="2">
                <Link to="/tabel-movie">Tabel Movie</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/tabel-game">Tabel Game</Link>
              </Menu.Item>
              <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                  Form
                  <DownOutlined />
                </a>
              </Dropdown>
            </>
          )}

          {user === null && (
            <>
              <Menu.Item key="4" style={{ float: "right" }}>
                <Link to="/login">Login</Link>
              </Menu.Item>
              <Menu.Item key="5" style={{ float: "right" }}>
                <Link to="/register">Register</Link>
              </Menu.Item>
            </>
          )}
          {user && (
            <>
              <Menu.Item key="6" style={{ float: "right" }}>
                <LogOutButton />
              </Menu.Item>
              <Menu.Item key="7" style={{ float: "right" }}>
                <Link to="/changePassword">Change Password</Link>
              </Menu.Item>
            </>
          )}
        </Menu>
      </Header>
    </Layout>
  );
};
export default NavBar;

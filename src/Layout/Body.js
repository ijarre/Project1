import React, { useContext } from "react";
import "../App.css";
import { Layout, Menu } from "antd";
import { UserContext } from "../context/UserContext";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "../Pages/Home";
import GameForm from "../Pages/GameForm";
import MovieForm from "../Pages/MovieForm";
import RegisterAntd from "../Pages/RegisterAntd";
import LoginAntd from "../Pages/LoginAntd";
import ChangePassword from "../Pages/ChangePassword";
import LogOutButton from "../Pages/LogOutButton";
import MovieListTable from "../Pages/MovieListTable";

import MovieCRUD from "../Pages/MovieCRUD";
import GameCRUD from "../Pages/GameCRUD";

const Body = () => {
  const [user] = useContext(UserContext);
  const { Content } = Layout;
  return (
    <Layout>
      <Content style={{ padding: "0 50px" }}>
        <div className="site-layout-content">
          <Switch>
            <Route exact path="/" user={user} component={Home} />
            <Route exact path="/register" user={user} component={RegisterAntd} />
            <Route exact path="/login" user={user} component={LoginAntd} />
            <Route exact path="/changePassword" user={user} component={ChangePassword} />
            <Route exact path="/tabel-movie" user={user} component={MovieCRUD} />
            <Route exact path="/tabel-game" user={user} component={GameCRUD} />
            <Route exact path="/tabel-movie/form" user={user} component={MovieForm} />
            <Route exact path="/tabel-game/form" user={user} component={GameForm} />
          </Switch>
        </div>
      </Content>
    </Layout>
  );
};
export default Body;

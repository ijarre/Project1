import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "./Pages/Home";
import GameForm from "./Pages/GameForm";
import MovieForm from "./Pages/MovieForm";
import RegisterAntd from "./Pages/RegisterAntd";
import LoginAntd from "./Pages/LoginAntd";
import ChangePassword from "./Pages/ChangePassword";
import LogOutButton from "./Pages/LogOutButton";
import NavBar from "./Layout/Navbar";
import MovieCRUD from "./Pages/MovieCRUD";
import GameCRUD from "./Pages/GameCRUD";
import { UserContext } from "../context/UserContext";

const Routing = () => {
  return (
    <Switch>
      <Route exact path="/" user={user} component={Home} />
      <Route exact path="/register" user={user} component={RegisterAntd} />
      <Route exact path="/login" user={user} component={LoginAntd} />
      <Route exact path="/tabel-movie" user={user} component={MovieCRUD} />
      <Route exact path="/tabel-game" user={user} component={GameCRUD} />
    </Switch>
  );
};

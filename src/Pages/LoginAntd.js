import React, { useContext, useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserContext } from "../context/UserContext";
import LogOutButton from "./LogOutButton";
import axios from "axios";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const RegisterAntd = () => {
  const [user, setUser] = useContext(UserContext);
  const [input, setInput] = useState({ email: "", password: "" });

  const handleSubmit = (event) => {
    axios
      .post("https://backendexample.sanbersy.com/api/user-login", {
        email: event.email,
        password: event.password,
      })
      .then((res) => {
        var user = res.data.user;
        var token = res.data.token;
        var currentUser = { name: user.name, email: user.email, token };
        setUser(currentUser);
        localStorage.setItem("user", JSON.stringify(currentUser));
        console.log("masuksetUser");
        console.log(res);
      })
      .catch((err) => {
        alert(JSON.stringify(err.response.data));
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default RegisterAntd;

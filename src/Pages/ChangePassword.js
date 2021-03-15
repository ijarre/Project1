import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Form, Input, Button, Checkbox } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
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
const ChangePassword = () => {
  const [user, setUser] = useContext(UserContext);

  const handleSubmit = (event) => {
    console.log(event);
    axios
      .post(
        `https://backendexample.sanbersy.com/api/change-password`,
        { current_password: event.current_password, new_password: event.new_password, new_confirm_password: event.new_confirm_password },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      .then((res) => {
        alert("success");
      })
      .catch((err) => {
        alert(JSON.stringify(err.response.data));
      });
  };

  return (
    <>
      <Form {...layout} name="basic" onFinish={handleSubmit} onFinishFailed="asd">
        <Form.Item
          label="Current Password"
          name="current_password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label=" New Password"
          name="new_password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label=" Confirm New Password"
          name="confirm_new_password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
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

export default ChangePassword;

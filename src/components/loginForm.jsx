import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { login } from "../services/authService";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    // call service
    const { username: email, password } = this.state.data;
    try {
      await login(email, password);
      window.location = this.props.pathname;
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
        toast.error(ex.response.data);
      }
    }
  };

  render() {
    const { user } = this.props;
    if (user) return <Navigate to="/" />;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;

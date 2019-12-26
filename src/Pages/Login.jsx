import React, { Component } from "react";

//dung link thi se phai click vao nut, => dung history.push(no nam trong login. history) de xu ly ham
import { loginForm } from "../api";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      email: "",
      error: ""
    };
  }

  onChange = e => {
    this.setState({
      // computed
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    loginForm({ email, password }, this.props.history)
      .then(res => {
        this.props.updateApp();
      })
      .catch(error => {
        this.setState({ error });
      });
    //login thi truyeen history sang index, de xu ly
  };

  render() {
    const { email, password, error } = this.state;
    return (
      <div className="container text-left">
        <h1>LOGIN</h1>
        {error.message && <h2 className="text-danger">{error.message}</h2>}
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="email"> Email: </label>
            <input
              type="text"
              className="form-control"
              name="email"
              id="email"
              value={email}
              onChange={this.onChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password"> Password: </label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              value={password}
              onChange={this.onChange}
            />
          </div>

          <button className="btn btn-success"> Login</button>
        </form>
      </div>
    );
  }
}

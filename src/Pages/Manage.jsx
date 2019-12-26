import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Manage extends Component {
  render() {
    return (
      <div>
        <h1>MANAGE</h1>
        <Link to="/manage/categories">Categories</Link>
        <br />
        <Link to="manage/products">Product</Link>
      </div>
    );
  }
}

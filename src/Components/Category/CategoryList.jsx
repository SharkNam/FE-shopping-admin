import React, { Component } from "react";
import Category from "./Category";
import Modal from "./Modal";
import { getCategories } from "../../api";

export default class CategoryList extends Component {

    /**
     * @componentWillMount() {}: chua dom xong da hien thi => trang web bi trong, sap bo
     * 
     */

  constructor(props) {
    super(props);
    this.state = {
      categoryList: []
    };
  }

  getCategories = async() => {  
    const categoryList = await getCategories();
    this.setState({ categoryList });
  }

  async componentDidMount() {
    await this.getCategories();
  }

  renderCategory = () => {
    return this.state.categoryList.map((cate, index) => {
      return (
        <Category
          index={index + 1}
          key={index}
          category={cate}
          listenDeleteCategory={this.listenDeleteCategory}
        />
      );
    });
  };

  listenDeleteCategory = async () => {
    await this.getCategories();
  };

  listenCreateCategory = async () => {
    await this.getCategories();
  };

  render() {
    return (
      <div className="container">
        <h2 className="text-left my-3">QUAN LY CATEGORY</h2>
        <div className="text-left my-2">
          <button
            className="btn btn-info text-left my-2"
            data-toggle="modal"
            data-target="#modelId"
          >
            Add new category
          </button>
        </div>
        <div className="container">
          <div className="row">
            <table className="table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{this.renderCategory()}</tbody>
            </table>
          </div>
        </div>
        <Modal listenCreateCategory={this.listenCreateCategory}/>
      </div>
    );
  }
}

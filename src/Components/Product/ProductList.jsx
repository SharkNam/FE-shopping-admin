import React, { Component } from "react";
import Product from "./Product";
import Modal from "./Modal";
import { getProducts } from "../../api";

export default class ProductList extends Component {
  /**
   * @componentWillMount() {}: chua dom xong da hien thi => trang web bi trong, sap bo
   *
   */

  constructor(props) {
    super(props);
    this.state = {
      productList: [], //du lieu hien thi ra trang web
      productEditing: {}, //du lieu khi nhan nao nut update
      isEdit: false //phan biet nut update vs nut Add new product de khi nhan Add new product thi xoa du lieu
    };
  }

  getProducts = async () => {
    const productList = await getProducts();
    this.setState({ productList });
  };

  async componentDidMount() {
    await this.getProducts();
  }

  renderProduct = () => {
    return this.state.productList.map((prod, index) => {
      return (
        <Product
          index={index + 1}
          key={prod.id}
          product={prod}
          listenDeleteProduct={this.listenDeleteProduct}
          getProductEditing={this.getProductEditing}
        />
      );
    });
  };

  listenDeleteProduct = async () => {
    await this.getProducts();
  };

  listenCreateProduct = async () => {
    await this.getProducts();
  };

  getProductEditing = productEditing => {
    this.setState({ productEditing, isEdit: true });
  };

  handleAddNewProduct = () => {
    this.setState({
      isEdit: false,
      productEditing: {
        id: "",
        name: "",
        image: "",
        price: -1,
        categoryId: ""
      }
    });
  };

  render() {
    // console.log(this.state.productEditing);
    return (
      <div className="container">
        <h2 className="text-left my-2">QUAN LY PRODUCTS</h2>
        <div className="text-left my-2">
          <button
            className="btn btn-info text-left my-2"
            data-toggle="modal"
            data-target="#productModal"
            onClick={this.handleAddNewProduct}
          >
            Add new Product
          </button>
        </div>
        <div className="container">
          <div className="row">
            <table className="table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category Name</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{this.renderProduct()}</tbody>
            </table>
          </div>
        </div>

        <Modal
          listenCreateProduct={this.listenCreateProduct}
          productEditing={this.state.productEditing}
          isEdit={this.state.isEdit}
        />
      </div>
    );
  }
}

import React, { Component } from "react";
import { deleteProductById } from "../../api";

export default class Product extends Component {
  render() {
    const { index, product } = this.props;
    return (
      <tr>
        <td>{index}</td>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td>{product.categoryName}</td>
        <td>
          <img src={product.image} width="100px" alt="imgProduct" />
        </td>
        <td>
          <button
            className="btn btn-warning mr-2"
            data-toggle="modal"
            data-target="#productModal"
            onClick={() => this.props.getProductEditing(product)}
          >
            Update
          </button>
          <button
            className="btn btn-danger"
            onClick={async () => {
              await deleteProductById(product.id);
              await this.props.listenDeleteProduct();
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

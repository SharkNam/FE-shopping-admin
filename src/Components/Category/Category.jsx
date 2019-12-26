import React, { Component } from "react";
import { deleteCategoryById } from "../../api";

export default class Category extends Component {
  render() {
    const { index, category } = this.props;
    return (
          <tr>
            <td>{index}</td>
            <td>{category.name}</td>
            <td>
              <img src={category.image} width="100px" alt="imgCategory" />
            </td>
            <td>
              <button
                className="btn btn-warning mr-2"
                data-toggle="modal"
                data-target="#modelId"
              >
                Update
              </button>
              <button
                className="btn btn-danger"
                onClick={async () => {
                  await deleteCategoryById(category.id);
                  await this.props.listenDeleteCategory();
                }}
              >
                Delete
              </button>
            </td>
          </tr>


    );
  }
}

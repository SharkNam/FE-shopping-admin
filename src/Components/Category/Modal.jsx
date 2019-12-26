import React, { Component } from "react";
import { createCategory, getCategories } from "../../api";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      image: "",
      categoryList: [],
      error: {}
    };
  }

  async componentDidMount() {
    const categoryList = await getCategories();
    this.setState({ categoryList });
  }

  onChange = e => {
    this.setState({
      // computed
      [e.target.name]: e.target.value
    });
  };

  onSubmit = async e => {
    e.preventDefault();
    await createCategory({
      name: this.state.name,
      image: this.state.image
    });
    await this.props.listenCreateCategory();
  };

  render() {
    return (
      <div>
        <div
          className="modal fade"
          id="modelId"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="modelTitleId"
          aria-hidden="true"
        >
          <form onSubmit={this.onSubmit}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">CATEGORY</h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group text-left">
                    <label htmlFor="name">Name:</label>
                    <input
                      onChange={this.onChange}
                      type="text"
                      className="form-control"
                      name="name"
                      id="name"
                      placeholder="Enter name"
                    />
                  </div>
                  <div className="form-group text-left">
                    <label htmlFor="image">Image:</label>
                    <input
                      onChange={this.onChange}
                      type="text"
                      className="form-control"
                      name="image"
                      id="image"
                      placeholder="Enter image"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  > Close
                  </button>
                  <button className="btn btn-primary">Save</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Modal;

import React, { Component } from "react";
import { createProduct, getCategories, updateProductById } from "../../api";

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      name: "",
      image: "",
      price: -1,
      categoryId: "",
      errors: {}, //js tu them obj vao
      productEditing: {}
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

  onClear = () => {
    this.setState({
      name: "",
      image: "",
      price: -1,
      categoryId: ""
    });
  };

  onSubmit = async e => {
    e.preventDefault();
    if (!this.state.isEdit) {
      const result = await createProduct({
        name: this.state.name,
        image: this.state.image,
        price: this.state.price,
        categoryId: this.state.categoryId
      });

      if (result.status === 200) {
        this.setState({
          errors: {}
        });
        this.onClear();
      }

      if (result.status === 422) {
        this.setState({
          errors: result.messages
        });
      }
    } else {
      await updateProductById(this.state.id, {
        name: this.state.name,
        image: this.state.image,
        price: this.state.price,
        categoryId: this.state.categoryId
      });
    }

    await this.props.listenCreateProduct();
  };

  renderCategoryOptions = () => {
    return this.state.categoryList.map((cate, index) => {
      return (
        <option key={index} value={cate.id}>
          {cate.name}
        </option>
      );
    });
  };

  //ben prodict rendet roi nhung ben modal ko render lai, dung them 1 component rece
  //CÒN LỖI CHƯA FIX ĐƯỢC: KHI LẦN ĐẦU START , KO NHẤN VÀO NÚT ADD NEW PRODUCT VÀ NHẤN VÀO NÚT UPDATE
  //DA FIX
  static getDerivedStateFromProps(props, state) {
    // console.log(props.productEditing.id);
    // console.log(state.id);
    if (props.productEditing.id !== state.id) {
      //return de thay doi state
      return {
        id: props.productEditing.id,
        name: props.productEditing.name,
        image: props.productEditing.image,
        // productEditing: props.productEditing,
        price: props.productEditing.price,
        categoryId: props.productEditing.categoryId,
        isEdit: props.isEdit
      };
    } else {
      //cung 1 product
      return null;
    }
  }

  render() {
    const { name, image, price, categoryId, errors } = this.state;
    // console.log(this.props)
    return (
      <div>
        <div
          className="modal fade"
          id="productModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="modelTitleId"
          aria-hidden="true"
        >
          <form onSubmit={this.onSubmit}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">PRODUCT</h5>
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
                    <label htmlFor="name">
                      Name:
                      <span className="text-danger">
                        {this.state.errors.name}
                      </span>
                    </label>
                    <input
                      onChange={this.onChange}
                      value={name}
                      type="text"
                      className="form-control"
                      name="name"
                      id="name"
                      placeholder="Enter name"
                    />
                  </div>
                  <div className="form-group text-left">
                    <label htmlFor="image">
                      Image:
                      <span className="text-danger">
                        {this.state.errors.image}
                      </span>
                    </label>
                    <input
                      onChange={this.onChange}
                      value={image}
                      type="text"
                      className="form-control"
                      name="image"
                      id="image"
                      placeholder="Enter image"
                    />
                  </div>
                  <div className="form-group text-left">
                    <label htmlFor="price">
                      Price:
                      <span className="text-danger">
                        {this.state.errors.price}
                      </span>
                    </label>
                    <input
                      onChange={this.onChange}
                      value={price}
                      type="number"
                      className="form-control"
                      name="price"
                      id="price"
                      placeholder="Enter price"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="categoryId">
                      Category:
                      <span className="text-danger">{errors.categoryId}</span>
                    </label>
                    <select
                      className="form-control"
                      name="categoryId"
                      id="categoryId"
                      onChange={this.onChange}
                      value={categoryId}
                    >
                      <option>Select Category</option>
                      {this.renderCategoryOptions()}
                    </select>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
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

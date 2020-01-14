import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import CategoryList from './Components/Category/CategoryList'
import ProductList from './Components/Product/ProductList';
import Login from './Pages/Login'
import Manage from './Pages/Manage'
import NotFound from './Pages/NotFound'
import Navbar from "./Components/Navbar";

import { setAccessToken } from "./api"

const access_token = localStorage.getItem("access_token")

// if (token) {
//     const decoded = jwtDecode(token)
//     if (decoded.exp > new Date().getTime() / 1000) {
//         setAuthToken(token);
//     }
// }

if (access_token) {
    setAccessToken()
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowCategory: true
        }
    }
    /**
     * arr funciton ko suport class trong es6, day la es7
     * //dung function binh thuong thi phia duoi phai dung blind(this)  
     * onClick={this.toggleCategory.blind(this)}
     */

    // toggleCategory = () => {
    //     this.setState({
    //         isShowCategory: !this.state.isShowCategory
    //     })
    // }

    //goi render lai, co the dat this.setState(truyen cai gi do ko su dung)
    updateApp = () => {
        this.forceUpdate();
    }

    render() {
        const access_token = localStorage.getItem("access_token")
        return (
            <div className="App">
                <BrowserRouter>
                    {access_token && <Navbar updateApp={this.updateApp} />}
                    <Switch>
                        {/* <Route path="/" exact component={Login} /> */}
                        {/* chi truyen js express, ko truyen duoc ham */}
                        <Route path='/' exact render={(props) => {
                            //props: {history, match, location} 
                            if (access_token) return <Redirect to="/manage" />
                            return <Login {...props} updateApp={this.updateApp} />
                            // cach viet gon hon Login acc = {props}, ko truyen duong dan this.props.acc.history
                        }}></Route>
                        <Route path="/manage" exact component={access_token ? Manage : NotFound} />
                        <Route path="/manage/categories" exact component={access_token ? CategoryList : NotFound} />
                        <Route path="/manage/products" exact component={access_token ? ProductList : NotFound} />
                        <Route path="/" component={NotFound} />
                    </Switch>
                </BrowserRouter>
            </div>
        );

    }
}

export default App;

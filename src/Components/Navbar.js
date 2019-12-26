import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom";
import { logout } from "../api"
//im port hitory maf ko co san: withrouter
class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-light bg-light">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <Link
                        to="/"
                        onClick={async () => {
                            await logout()
                            localStorage.removeItem("access_token")
                            this.props.updateApp();
                            this.props.history.push("/")
                        }}
                    >Logout</Link>
                </nav>
            </div>
        )
    }
}


export default withRouter(Navbar)
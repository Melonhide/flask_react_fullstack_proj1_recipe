import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth, logout } from '../auth'





const LoggedInLinks = () => {

    const navigate = useNavigate();
    const handleLogout =()=>{
        logout();
        navigate('/');
    }

    return (
        <>
            <li className="nav-item">
                <Link className="nav-link active" to="/">Home </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" to="/create_recipe">Create Recipes</Link>
            </li>

            <li className="nav-item">
                <a className="nav-link active" href="#" onClick={handleLogout}>Log Out</a>
            </li>
        </>
    )
}

const LoggedOutLinks = () => {
    return (
        <>
            <li className="nav-item">
                <Link className="nav-link active" to="/">Home </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" to="/signup">Sign Up</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" to="/login">Login</Link>
            </li>
        </>
    )
}

const NavBar = () => {

    const [logged] = useAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#">Recipes</a>
            <button
                className="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    {logged?<LoggedInLinks/>:<LoggedOutLinks/>}



                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown"
                            role="button" data-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false">
                            Dropdown
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">Something else here</a>
                        </div>
                    </li>

                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <div className="input-group">
                        <input className="form-control mr-sm-2" type="search"
                            placeholder="Search" aria-label="Search" />
                        <div className="input-group-append">
                            <button className="btn btn-outline-success my-2 my-sm-0"
                                type="submit">Search</button>
                        </div>
                    </div>
                </form>
            </div>
        </nav>
    )
}

export default NavBar

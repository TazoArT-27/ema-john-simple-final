import React, { useContext } from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Header = () => {
    const [ loggedInUser, setLoggedInUser] = useContext(UserContext)
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#"><img src={logo} alt=""/></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                    <Link className="nav-link nav-title" to="/shop">Shop</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link nav-title" to="/review">Order Review</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link nav-title" to="/inventory">Inventory</Link>
                </li>
                </ul>
                <button onClick={() => setLoggedInUser({})}>Sign Out</button>
                <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>
        </>
    );
};

export default Header;
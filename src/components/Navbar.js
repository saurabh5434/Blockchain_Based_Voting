import React from 'react';

import {
  Link
} from "react-router-dom";

const Navbar = ({account, admin})=> {
  return (
    
      <div>
          <div className="container">
            <nav className="navbar navbar-expand-sm navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow" >
            <div className="navbar-header">
                <Link to="/" className="text-white navbar-brand col-sm-3 col-md-2 mr-0">BlockchainVoting</Link>            </div>
                <ul className="navbar-nav ml-auto">
                <li className="nav-item text-nowrap d-none d-sm-none d-sm-block" style={{marginRight:"20px"}}>
                  <Link to="/vote" className="text-white">Vote</Link>
                </li>
                { (admin === account) && 
                  <li className="nav-item  text-nowrap d-none d-sm-none d-sm-block" style={{marginRight:"20px"}}>
                    <Link to="/manage" className="text-white">Manage</Link>
                  </li>
                }
                <li className="nav-item  text-nowrap d-none d-sm-none d-sm-block" style={{marginRight:"20px"}}>
                  <Link to="/result" className="text-white">Result</Link>
                </li>

                <li className="nav-item text-nowrap d-none d-sm-none d-sm-block" style={{marginRight:"20px"}}>
                 <small className="text-white"><span id="account">{account}</span></small>
               </li>
              </ul>
            </nav>
          </div>
      </div>
    )
};
export default Navbar;

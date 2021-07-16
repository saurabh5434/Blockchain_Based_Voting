import React from 'react';
import logo from '../logo.ico';
const Main = ()=> {

  return (
     <div className="container" style={{marginTop:"100px"}}>
		  <div className="row">
		    <div className="col text-center">
		    	<h1>Welcome to Blockchain Voting</h1>
		    	<br/>
		    	<br/>
		    	<div className="container">
		    	<img style={{width:"100%", height:"auto", maxHeight:"500px", maxWidth:"500px"}} src={logo}/>
		    	</div>
		    </div>
		  </div>
	</div>
    )
};
export default Main;

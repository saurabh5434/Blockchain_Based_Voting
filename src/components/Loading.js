import React from 'react';
// import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
	return(
		<>
		<main role="main" style = {{marginTop:"80px"}} className="col-lg-12 d-flex">
			<div className="container">
					<span className="visually-hidden">Loading...</span>
			</div>
		</main>
		</>

	);
}
export default Loading;
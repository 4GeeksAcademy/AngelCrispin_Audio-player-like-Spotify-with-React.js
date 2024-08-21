import React from "react";
import Content from './content.jsx'

//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<h1 className="text-center"><i className="fa-brands fa-spotify my-auto"></i></h1>
			<Content/>
		</div>
	);
};

export default Home;

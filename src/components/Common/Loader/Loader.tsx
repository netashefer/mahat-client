import React from "react";
import './Loader.scss'

export const Loader: React.FC = () => {
  const loadingImg = "https://cdn.auth0.com/blog/hello-auth0/loader.svg";

  return (
	<div className="page-layout">
		<div className="page-layout__content">	
			<div className="loader">
				<img src={loadingImg} alt="Loading..." />
  			</div>
		</div>
   </div>
  );
};

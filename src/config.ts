export const config = {
    processingService: {
		url: 'http://localhost:3012',
		auth0:{
			domain: "graphit.us.auth0.com",
			client_id: "3LgivwedUyOayOiLcHOg0HOWwpUZkPgT",
			audience: "https://localhost:8000", // NEW - add the audience value
			//scope: "read:dashboards"
		}
	},
    graphServer: {
		url: 'https://localhost:8000',
		auth0:{
			domain: "graphit.us.auth0.com",
			client_id: "3LgivwedUyOayOiLcHOg0HOWwpUZkPgT",
			audience: "https://localhost:8000", // NEW - add the audience value
			//scope: "read:dashboards"
		}
	},
};
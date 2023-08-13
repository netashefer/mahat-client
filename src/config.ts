export const config = {
    processingService: {
		url: process.env.PS_URL || 'https://local.graphit.com:3012',
		auth0:{
			domain: "graphit.us.auth0.com",
			client_id: "3LgivwedUyOayOiLcHOg0HOWwpUZkPgT",
			client_secret: 'GSbhabWuFJiysBgZLrUpokgpommprKYAz79jvFkTEPijPqHGQMd9RGP7ZSaJdCtc',
			audience: process.env.PS_AUDIENCE || "https://local.graphit.com:3012",
		}
	},
    graphServer: {
		url: process.env.GS_URL || 'https://local.graphit.com:8000',
		auth0:{
			domain: "graphit.us.auth0.com",
			client_id: "3LgivwedUyOayOiLcHOg0HOWwpUZkPgT",
			client_secret: 'GSbhabWuFJiysBgZLrUpokgpommprKYAz79jvFkTEPijPqHGQMd9RGP7ZSaJdCtc',
			audience: process.env.GS_AUDIENCE || "https://local.graphit.com:8000",
		}
	},
};
import createAuth0Client, { Auth0Client, Auth0ClientOptions } from '@auth0/auth0-spa-js';

class Communicator {
    private baseURL;
	protected auth0: Auth0Client;

    constructor(baseURL: string, auth0Config: Auth0ClientOptions) {
        this.baseURL = baseURL;
		this._initAuth0(auth0Config);
    }

	async getSecureHeaders(){
		const token = await this.auth0.getTokenSilently();
		const headers = {
			Authorization: `Bearer ${token}`
		};
		return headers;
	}

    protected getFullURL(url: string) {
        return `${this.baseURL}/${url}`;
    }

	private async _initAuth0(auth0Config: Auth0ClientOptions){
		this.auth0 = await createAuth0Client({...auth0Config});
	}
}

export default Communicator;
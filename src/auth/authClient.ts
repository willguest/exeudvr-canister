import { Identity } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';

/*
 * A simple wrapper for the official auth client to initialize it and wrap
 * some of the methods in promises
 */
class AuthClientWrapper {
  public authClient?: AuthClient;
  public ready = false;
  constructor() {
    return this;
  }

  // Create a new auth client and update it's ready state
  async create() {
    this.authClient = await AuthClient.create();
    await this.authClient?.isAuthenticated();
    this.ready = true;
  }

  async login(): Promise<Identity | undefined> {
    return new Promise(async (resolve) => {

      const localII = "http://localhost:4943/?canisterId=" + process.env.CANISTER_ID_INTERNET_IDENTITY;
      
      console.log("process II: " + localII);

      await this.authClient?.login({
        identityProvider: 
		process.env.NODE_ENV === "production"
          ? "https://identity.ic0.app/#authorize"
          : localII,
        onSuccess: async () => {  
          resolve(this.authClient?.getIdentity());
        },
      });
    });
  }

  async logout() {
    return this.authClient?.logout({ returnTo: '/' });
  }

  async getIdentity() {
    return this.authClient?.getIdentity();
  }

  async isAuthenticated() {
    return this.authClient?.isAuthenticated();
  }
}

export const authClient = new AuthClientWrapper();

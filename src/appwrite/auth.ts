import { Client, Account, ID } from 'appwrite';
import config from '../conf/config';

class AuthService {
  client: Client = new Client();
  account: Account;

  constructor() {
    this.client
      .setEndpoint(config.appWriteUrl)
      .setProject(config.appWriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      }
    } catch (error) {
      console.log('Error in CreateAccount:: ' + error);
    }
    return null;
  }

  async login({ email, password }: { email: string; password: string }) {
    try {
      const session = await this.account.createSession(email, password);
      return session;
    } catch (error) {
      console.log('Error in Login:: ' + error);
      return null;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
      return true;
    } catch (error) {
      console.log('Error in Logout:: ' + error);
      return false;
    }
  }

  async getCurrentUser() {
    try {
      const user = await this.account.get();
      return user;
    } catch (error) {
      console.log('Error in getCurrentUser:: ' + error);
      return null;
    }
  }
}

export default new AuthService();

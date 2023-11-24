import axios from "axios";

export default class AuthService {
  static async login(login, password) {
    const response = await axios.post("http://localhost:3001/api/auth/login", {
      login,
      password,
    }, {
      withCredentials: true,
    });
    return response;
  }

  static async register(login, password, email, full_name) {
    const response = await axios.post(
      "http://localhost:3001/api/auth/register",
      {
        login,
        password,
        email,
        full_name,
      }
    );
    return response;
  }

  static async resetPassword(email) {
    const response = await axios.post(
      "http://localhost:3001/api/auth/password-reset",
      {
        email,
      }
    );
    return response;
  }

  static async setNewPassword(password, id, token) {
    const response = await axios.post(
      `http://localhost:3001/api/auth/password-reset/${id}/${token}`,
      {
        password,
      }
    );
    return response;
  }

  static async logout() {
    const response = await axios.post("http://localhost:3001/api/auth/logout", {}, {
      withCredentials: true,
    });
    return response;
  }

  static async whoAmI() {
    try {
      const response = await axios.get("http://localhost:3001/api/auth/", {
      withCredentials: true,
    });
    return response;
    } catch (error) {
      return null;
    }
  }
}

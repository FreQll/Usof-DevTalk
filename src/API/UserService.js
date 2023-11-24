import axios from "axios";

export default class UserService {
  static async getAvatar(login) {
    const response = await axios.get(
      `http://localhost:3001/api/users/avatar/${login}.jpg`
    );
    return response;
  }

  static async getAllUsers() {
    const response = await axios.get("http://localhost:3001/api/users");
    return response;
  }

  static async getUserById(id) {
    const response = await axios.get(`http://localhost:3001/api/users/${id}`);
    return response;
  }

  static async getUserByLogin(login) {
    const response = await axios.get(
      `http://localhost:3001/api/users/profile/${login}`
    );
    return response;
  }

  static async updateProfile(id, full_name, email, login) {
    const response = await axios.patch(
      `http://localhost:3001/api/users/${id}`,
      { full_name, email, login },
      { withCredentials: true }
    );
    return response;
  }

  static async createUser(login, password, full_name, email, role) {
    const response = await axios.post(
      "http://localhost:3001/api/users",
      { login, password, full_name, email, role },
      { withCredentials: true }
    );
    return response;
  }

  static async toggleAdmin(id, role) {
    let newRole = "";
    if (role === "admin") {
      newRole = "user";
    }
    if (role === "user") {
      newRole = "admin";
    }
    const response = await axios.patch(
      `http://localhost:3001/api/users/${id}`,
      { role: newRole },
      { withCredentials: true }
    );
    return response;
  }

  static async updateAvatar(formData) {
    try {
      const response = await axios.patch(
        `http://localhost:3001/api/users/avatar/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data) {
        return response.data;
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Error updating avatar:", error);
      throw error;
    }
  }

  static async deleteUser(id) {
    const response = await axios.delete(
      `http://localhost:3001/api/users/${id}`,
      { withCredentials: true }
    );
    return response;
  }

  static async getFavoritePosts(id) {
    const response = await axios.get(
      `http://localhost:3001/api/users/${id}/favorites`
    );
    return response;
  }

  static async addToFavorites(postId) {
    const response = await axios.post(
      `http://localhost:3001/api/users/${postId}/favorites`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
      { withCredentials: true }
    );
    return response;
  }

  static async deleteFromFavorites(postId) {
    const response = await axios.delete(
      `http://localhost:3001/api/users/${postId}/favorites`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      }
    );
    return response;
  }
}

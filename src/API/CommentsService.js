import axios from "axios";

export default class CommentsService {
  static async createLikeUnderComment(id, type, user_id) {
    const response = await axios.post(
      `http://localhost:3001/api/comments/${id}/like`,
      {
        user_id,
        type,
      }
    );
    return response;
  }

  static async getLikesUnderComment(id) {
    const response = await axios.get(
      `http://localhost:3001/api/comments/${id}/like`,
      { withCredentials: true }
    );
    return response;
  }

  static async deleteLikeFromComment(id) {
    const response = await axios.delete(
      `http://localhost:3001/api/comments/${id}/like`,
      { withCredentials: true }
    );
    return response;
  }

  static async editComment(id, content) {
    const response = await axios.patch(
      `http://localhost:3001/api/comments/${id}`,
      { content },
      { withCredentials: true }
    );
    return response;
  }

  static async deleteComment(id) {
    const response = await axios.delete(
      `http://localhost:3001/api/comments/${id}`,
      { withCredentials: true }
    );
    return response;
  }
}

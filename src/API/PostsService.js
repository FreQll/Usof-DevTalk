import axios from "axios";

export default class PostsService {
  static async getAllPosts() {
    const response = await axios.get("http://localhost:3001/api/posts/");
    return response;
  }

  static async getPosts(
    page = "",
    pageSize = "",
    sortBy = "publish_date",
    sortOrder = "",
    dateFrom = "",
    dateTo = "",
    statusFilter = "active",
    selectedCategory = "",
    search = ""
  ) {
    //console.log(selectedCategory);
    if (selectedCategory) {
      const response = await axios.get(
        `http://localhost:3001/api/categories/${selectedCategory}/posts?page=${page}`
      );
      console.log(response);
      return response;
    }
    const response = await axios.get(
      `http://localhost:3001/api/posts/?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}&dateFrom=${dateFrom}&dateTo=${dateTo}&statusFilter=${statusFilter}&titleSearch=${search}`
    );
    return response;
  }

  static async getPostById(id) {
    const response = await axios.get(`http://localhost:3001/api/posts/${id}`);
    return response;
  }

  static async getCommentsUnderPost(id) {
    const response = await axios.get(
      `http://localhost:3001/api/posts/${id}/comments`
    );
    return response;
  }

  static async createCommentUnderPost(id, content, author_id) {
    const response = await axios.post(
      `http://localhost:3001/api/posts/${id}/comments`,
      {
        content,
        author_id,
      }
    );
    return response;
  }

  static async createNewPost(title, content, author_id, categories) {
    const response = await axios.post("http://localhost:3001/api/posts", {
      title,
      content,
      author_id,
      categories,
    });
    return response;
  }

  static async createLikeUnderPost(id, type, user_id) {
    const response = await axios.post(
      `http://localhost:3001/api/posts/${id}/like`,
      {
        type,
        user_id,
      }
    );
    return response;
  }

  static async updatePost(id, title, content, status) {
    const headers = {
      'Content-Type': 'application/json',
      'withCredentials': true,
    };
    const response = await axios.patch(
      `http://localhost:3001/api/posts/${id}`,
      {
        title,
        content,
        status,
      },
      {
        headers
      }
    );
    return response;
  }

  static async getUserPostsById(id) {
    const response = await axios.get(
      `http://localhost:3001/api/posts/author/${id}`
    );
    return response;
  }

  static async deleteLikeUnderPost(id) {
    const response = await axios.delete(
      `http://localhost:3001/api/posts/${id}/like`,
      { withCredentials: true }
    );
    return response;
  }

  static async deletePost(id) {
    const response = await axios.delete(
      `http://localhost:3001/api/posts/${id}`,
      { withCredentials: true }
    );
    return response;
  }
}

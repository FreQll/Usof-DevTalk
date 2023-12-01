import axios from "axios";

export default class CategoriesService {
    static async getAllCategories() {
        const response = await axios.get("http://localhost:3001/api/categories");
        return response;
    }

    static async getCategoryById(id) {
        const response = await axios.get(`http://localhost:3001/api/categories/${id}`);
        if (response.status !== 200) {
            return null;
        }
        return response;
    }

    static async getCategoriesForPost(postId) {
        const response = await axios.get(`http://localhost:3001/api/posts/${postId}/categories`);
        return response;
    }

    static async updateCategory(id, title, description) {
        const response = await axios.patch(
            `http://localhost:3001/api/categories/${id}`,
            { title, description },
            { withCredentials: true }
        );
        return response;
    }

    static async createCategory(title, description) {
        const response = await axios.post(
            "http://localhost:3001/api/categories",
            { title, description },
            { withCredentials: true }
        );
        return response;
    }

    static async deleteCategory(id) {
        const response = await axios.delete(
            `http://localhost:3001/api/categories/${id}`,
            { withCredentials: true }
        );
        return response;
    }
}
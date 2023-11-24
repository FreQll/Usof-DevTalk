const Category = require("../models/CategoryModel");

class CategoriesController {
  async getAllCategories(req, res) {
    const categories = new Category();
    categories
      .getAllCategories()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send({ status: 500, err: err.message });
      });
  }

  async getCategoryById(req, res) {
    const { id } = req.params;
    const category = new Category();
    category
      .find(id)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send({ status: 500, message: err.message });
      });
  }

  async getPostsByCategoryId(req, res) {
    const { id } = req.params;
    const { page, pageSize } = req.query;

    const currentPage = page ? parseInt(page) : 1;
    const limit = pageSize ? parseInt(pageSize) : 5;
    const offset = (currentPage - 1) * limit;

    const total = await new Category().query(`SELECT COUNT(*) as total FROM posts RIGHT JOIN post_categories ON posts.post_id = post_categories.post_id WHERE post_categories.category_id=${id};`);

    const category = new Category();
    category
      .getPostsByCategory(id, limit, offset)
      .then((result) => {
        const totalCount = total[0].total;
        res.status(200).send({totalCount, posts: result});
      })
      .catch((err) => {
        res.status(500).send({ status: 500, err: err.message });
      });
  }

  async createCategory(req, res) {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).send({ status: 400, message: "Missing title!" });
    }

    const categoryCheck = new Category();
    const titleUnique = await categoryCheck.isCategoryUnique(title);

    if (titleUnique) {
      try {
        const category = new Category(title, description);
        category.save();
        return res.status(200).send({
          status: 200,
          message: "Category created!",
          category: category,
        });
      } catch (err) {
        return res.status(500).send({ status: 500, message: err.message });
      }
    }
    return res
      .status(400)
      .send({ status: 400, message: "Category already exists!" });
  }

  async updateCategory(req, res) {
    const { id } = req.params;
    const { title, description } = req.body;
    const category = new Category();
    category
      .find(id)
      .then((result) => {
        if (result.category_id) {
          category.category_id = result.category_id;
          category.title = title ? title : result.title;
          category.description = description ? description : result.description;
          category.save();
          res.status(200).send({
            status: 200,
            message: "Category updated successfully!",
            category: category,
          });
        } else {
          res
            .status(404)
            .send({ status: 404, message: "Category does not exist!" });
        }
      })
      .catch((err) => {
        res.status(500).send({ status: 500, message: err.message });
      });
  }

  async deleteCategory(req, res) {
    const { id } = req.params;
    const category = new Category();
    category
      .find(id)
      .then((result) => {
        if (result.category_id) {
          category.delete(id);
          res
            .status(200)
            .send({ status: 200, message: "Category deleted successfully!" });
        } else {
          res
            .status(404)
            .send({ status: 404, message: "Category does not exist!" });
        }
      })
      .catch((err) => {
        res.status(500).send({ status: 500, message: err.message });
      });
  }
}

module.exports = new CategoriesController();

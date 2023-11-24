import React from "react";
import CategoryChip from "./CategoryChip";
import "./Categories.css";

const CategoriesList = ({ categories }) => {
  return (
    <div className="categories-container">
      {categories.length
        ? categories.map((item) => (
            <CategoryChip key={item.title} title={item.title} />
          ))
        : ""}
    </div>
  );
};

export default CategoriesList;

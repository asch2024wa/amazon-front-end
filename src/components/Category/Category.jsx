import React from "react";
import "./Category.module.css";
import CategoryCard from "./CategoryCard";
import { categoryImage } from "./CategoryFullinfo";
import classes from "./Category.module.css";
function Category() {
  return (
    <section className={classes.category_container}>
      {categoryImage?.map((info, i) => {
        return <CategoryCard key={i} data={info} />;
      })}
    </section>
  );
}

export default Category;

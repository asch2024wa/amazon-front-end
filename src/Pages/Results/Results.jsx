import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useParams } from "react-router-dom";
import { productUrl } from "../../API/EndPoints";
import ProductCard from "../../components/Product/ProductCard";
import axios from "axios";
import classes from "./Results.module.css";

function Results() {
  const [products, setProduct] = useState([]);
  const { categoryName } = useParams();
  console.log(categoryName);
  useEffect(() => {
    axios.get(`${productUrl}/products/category/${categoryName}`).then((res) => {
      
      setProduct(res.data);
    });
  }, []);
  console.log(products);
  return (
    <Layout>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category/{categoryName}</p>
        <div className={classes.products_container}>
          {products?.map((product) => (
            <ProductCard key={products.id} product={product} renderAdd={true} />
          ))}
        </div>
      </section>
    </Layout>
  );
}

export default Results;

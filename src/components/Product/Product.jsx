import React, { useState, useEffect } from "react";
import classes from "./Product.module.css";
import axios from "axios";
import ProductCard from "./ProductCard";
function Product() {
  const [product, setProduct] = useState([]);
  const [isloading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios.get("https://fakestoreapi.com/products").then((res) => {
      setProduct(res.data);
      setLoading(false);
    })
    .catch((err) => console.log(err));
    setLoading(false);
  }, []);

  return (
    //  {isLoading?(<Loader/>):()}
    <div className={classes.product_container}>
      {product.map((singleProduct, i) => (
        <ProductCard key={i} product={singleProduct} renderAdd={true}/>
      ))}
    </div>
  );
}

export default Product;

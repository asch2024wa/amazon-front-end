import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";

import axios from "axios";
import ProductCard from "../../components/Product/ProductCard";
import { productUrl } from "../../API/EndPoints";
import { useParams } from "react-router-dom";

function ProductDetail() {
  const [products, setProduct] = useState({});
  const [isloading, setLoading] = useState(false);
  const { productID } = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${productUrl}/products/${productID}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  }, []);
  return (
    <Layout>
      {isloading ? <Loader /> : <ProductCard product={products} flex={true}
      renderDescription={true} renderAdd={true}/>}
      
    </Layout>
  );
}

export default ProductDetail;

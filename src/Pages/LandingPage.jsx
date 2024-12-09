import React from "react";
import Category from "../components/Category/Category.jsx";
import Product from "../components/Product/Product.jsx";
import Layout from "../components/Layout/Layout.jsx";
import CarouselEffect from "../components/Carousel/CarouselEffect.jsx";

function LandingPage() {
  return (
    <Layout>
      <CarouselEffect />
      <Category />
      <Product />
    </Layout>
  );
}

export default LandingPage;

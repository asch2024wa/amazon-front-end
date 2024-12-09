import React, { useContext, useState } from "react";
import Layout from "../../components/Layout/Layout";
import classes from "./Payment.module.css";
import ProductCard from "../../components/Product/ProductCard";

import CurrencyFormatter from "../../components/CurrencyFormatter/CurrencyFormatter";
import { db } from "../../Utility/firebase";
import { ClipLoader } from "react-spinners";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { axiosInstant } from "../../API/base";
import { useNavigate } from "react-router-dom";
import { TYPE } from "../../Utility/action.type";
function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  // console.log(basket);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  const totalPrice = basket?.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const stripe = useStripe();
  const elements = useElements();
  const handleChange = (e) => {
    e.error?.message ? setError(e.error.message) : setError("");
  };
  console.log(user?.uid);
  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axiosInstant({
        method: "POST",
        url: `/payment/create?total=${totalPrice * 100}`,
      });
      const clientSecret = response.data.clientSecret;
      console.log(clientSecret)
      const {paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });
      console.log(paymentIntent)
      await db
        .collection("user")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
        console.log("inserted to db")
      
      dispatch({
        type:TYPE.EMPTY_BASKET
      })
      navigate("/orders");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <Layout>
      <div classesName={classes.payment_header}>Checkout{totalItem} items </div>
      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3>Delivery Adress</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 Addis road 23</div>
            <div> 4 kilo,AAU</div>
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item, i) => {
              return <ProductCard key={i} product={item} flex={true} />;
            })}
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Payment method</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_detail}>
              <form onSubmit={handlePayment}>
                {error && (
                  <smal1 style={{ color: "red", gap: "10px" }}>{error}</smal1>
                )}

                <CardElement onChange={handleChange} />
                <div className={classes.payment_price}>
                  <div>
                    <span>
                      Total Order|
                      <CurrencyFormatter amount={totalPrice} />
                    </span>
                  </div>
                  <button type="submit">
                    {loading ? (
                      <div className={classes.loading}>
                        <ClipLoader size={12} color="gray" />
                        <p>Please wait...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;

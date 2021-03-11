import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../components/StripeCheckout";
import "../stripe.css";

// load stripe outside of components render to avoid recreating stripe object on every render
const promise = loadStripe('pk_test_51IT5MNF65edSYYnPIWlhfyKWQd53gpXVeipWx7JZ3Yg9eeYioncz1kSLh8mKiBOrHzs6IfRcIKmJKgiwoMq9CKeO00TPxQffbS');

const Payment = () => {
    console.log('process.env.REACT_APP_STRIPE_KEY', process.env.REACT_APP_STRIPE_KEY)
    return (
        <div className="container p-5 text-center">
            <h4>Complete your purchase</h4>
            <Elements stripe={promise}>
                <div className="col-md-8 offset-md-2">
                    <StripeCheckout />
                </div>
            </Elements>
        </div>
    );
};

export default Payment;


import React from "react";

import Jumbotron from "../components/cards/Jumbotron";
import CategoryList from "../components/category/CategoryList";
import BestSellers from "../components/home/BestSellers";

import NewArrivals from "../components/home/NewArrivals";
import SubList from "../components/subs/SubList";

const Home = () => {



    return (
        <>
            <div className='jumbotron text-danger h1 font-weight-bold text-center'>
                <Jumbotron text={["New Collection", "Latest Products"]} />


            </div>
            <h5 className='text-center p-3 mt-5 mb-5 display-4 
            jumbotron'> New Arrivals</h5>
            <NewArrivals />
            <h5 className='text-center p-3 mt-5 mb-5 display-4 
            jumbotron'> Best Sellers</h5>
            <BestSellers />

            <h5 className='text-center p-3 mt-5 mb-5 display-4 
            jumbotron'> Categories</h5>
            <CategoryList />

            <h5 className='text-center p-3 mt-5 mb-5 display-4 
            jumbotron'> Sub Categories</h5>
            <SubList />

        </>

    );
};

export default Home;

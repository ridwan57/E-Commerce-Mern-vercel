import React, { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { Link, useHistory } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Laptop from "../../images/laptop.png";
import ProductListItems from "./ProductListItems";
import ReactStars from 'react-stars'
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/ratings";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList } from "../../functions/user";
import { toast } from "react-toastify";


const { TabPane } = Tabs;

const SingleProduct = ({ product, onStarClick, rating, onOkClick }) => {
    const { title, images, description, quantity } = product;

    const [toolTip, setToolTip] = useState('Click to add')
    const dispatch = useDispatch()
    const history = useHistory()
    const { user } = useSelector(state => ({ ...state }))

    const handleAddToCart = () => {
        let cart = []
        if (window.localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))

        }
        cart.push(({
            ...product,
            count: 1

        }))
        // eslint-disable-next-line no-undef
        let unique = _.uniqWith(cart, _.isEqual)
        console.log('unique:', unique)
        window.localStorage.setItem('cart', JSON.stringify(unique))
        setToolTip('Added')
        dispatch({
            type: 'ADD_TO_CART',
            payload: unique
        })
        dispatch({
            type: 'SET_VISIBLE',
            payload: true
        })
    }

    const handleAddToWishlist = (e) => {
        e.preventDefault();
        addToWishList(product._id, user.token).then((res) => {
            console.log("ADDED TO WISHLIST", res.data);
            toast.success("Added to wishlist");
            history.push("/user/wishlist");
        });
    };


    return (
        <>

            <div className="col-md-7">
                {images && images.length ? (
                    <Carousel
                        showArrows={true} autoPlay infiniteLoop >
                        {images && images.map((i) => <img key={i.public_id} alt={i.public_id} src={i.url} />)}
                    </Carousel>
                ) : (
                    <Card cover={<img alt={Laptop} src={Laptop} className="mb-3 card-image" />}></Card>
                )}

                <Tabs type='card' defaultActiveKey="1">
                    <TabPane tab="Description" key="1">
                        {description ? description : 'No description for this product'}
                    </TabPane>
                    <TabPane tab="More" key="2">
                        Tab 2
                        </TabPane>

                </Tabs>
            </div>

            <div className="col-md-5 text-center">
                <h1 className='bg-info p-3'> {title}</h1>
               rating

               {product && product.ratings && product.ratings.length > 0 ? showAverage(product) : <div className='text-center pt-2 pb-3 '> No rating yet</div>}

                <Card
                    actions={[
                        <>
                            <Tooltip title={quantity <= 0 ? 'Out of stock' : toolTip}>

                                <a onClick={handleAddToCart} disabled={quantity <= 0 ? true : false}>



                                    <ShoppingCartOutlined
                                        className="text-danger" /> <br /> {quantity <= 0 ? 'Out of stock' : 'Add to Cart'}


                                </a>  </Tooltip>
                        </>
                        ,
                        // eslint-disable-next-line jsx-a11y/anchor-is-valid
                        <a onClick={handleAddToWishlist}>
                            <HeartOutlined className="text-info" /> <br /> Add to Wishlist
                           </a>,

                        <RatingModal onOkClick={onOkClick}><ReactStars
                            count={5}
                            onChange={onStarClick}
                            size={54}
                            value={rating}
                            color2={'#660000'}

                            half={false}

                        /></RatingModal>,
                    ]

                    }

                >

                    <ProductListItems product={product} />

                </Card>
            </div>
        </>
    );
};

export default SingleProduct

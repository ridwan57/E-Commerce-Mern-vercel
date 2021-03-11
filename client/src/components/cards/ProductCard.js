import React, { useState } from "react";
import { Card, Empty, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined, StockOutlined } from "@ant-design/icons";
import laptop from "../../images/laptop.png";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/ratings";
import { set, uniqWith } from 'lodash'
import { useDispatch } from "react-redux";

const { Meta } = Card;

const ProductCard = ({ product }) => {
    const [toolTip, setToolTip] = useState('Click to add')
    const dispatch = useDispatch()

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
    // destructure
    const { images, title, description, slug, price, quantity } = product;
    return (
        <>
            {/* {product && product.ratings && product.ratings.length > 0 ? (
                showAverage(product)
            ) : (
                <div className="text-center pt-1 pb-3">No rating yet</div>
            )} */}

            <Card
                cover={
                    <img
                        alt={images && images.length ? images[0].public_id : '90'}
                        src={images && images.length ? images[0].url : laptop}
                        style={{ height: "150px", objectFit: "cover" }}
                        className="p-1"
                    />
                }
                actions={[
                    <Link to={`/product/${slug}`}>
                        <EyeOutlined className="text-warning" /> <br /> View Product
          </Link>, <Tooltip title={quantity <= 0 ? 'Out of stock' : toolTip}>
                        <a onClick={handleAddToCart} disabled={quantity <= 0 ? true : false}>



                            <ShoppingCartOutlined
                                className="text-danger" /> <br /> {quantity <= 0 ? 'Out of stock' : 'Add to Cart'}


                        </a>  </Tooltip>
                    ,
                ]}
            >



                <Meta
                    title={`${title} - $${price}`}
                    description={`${description && description.substring(0, 40)}...`}
                />
            </Card>
        </>
    );
};

export default ProductCard;

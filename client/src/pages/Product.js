import React, { useEffect, useState } from 'react'
import { getProduct, getRelated, productStar } from '../functions/product'
import SingleProduct from '../components/cards/SingleProduct'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import ProductCard from '../components/cards/ProductCard'
import { showAverage } from '../functions/ratings'

const Product = ({ match: { params } }) => {
    const [product, setProduct] = useState({})
    const [relatedProduct, setRelatedProduct] = useState({})
    const [rating, setRating] = useState()
    const { user } = useSelector(state => ({ ...state }))

    const onStarClick = (rating) => {
        // console.log('rating:', rating)
        setRating(() => rating)


    }
    const onOkClick = () => {
        productStar(product._id, rating, user.token)
            .then(res => {
                console.log(res.data)
                toast.success(`Rating updated: ${res.data}`)
                // loadSingleProduct()
            }).catch(er => {
                console.log(er)
            })

    }
    useEffect(() => {
        // console.log('back')
        loadSingleProduct()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, params.slug])



    const loadSingleProduct = () => {
        getProduct(params.slug).then(res => {

            setProduct(res.data)
            // console.log('user_id', user ? user._id : '')
            // console.log('ratings', product.ratings)

            if (product.ratings && user) {
                let existingRatingObject = product.ratings.find(
                    (ele) => ele.postedBy.toString() === user._id.toString()
                );
                existingRatingObject && setRating(() => existingRatingObject.star); // current user's star
            }
        

            getRelated(product._id).then(res => {
                // console.log('related', res.data)
                setRelatedProduct(res.data)
                // loadSingleProduct()
            }).catch(err => {
                console.log(err)
            })
        })


    }
    return (
        <div className='container-fluid'>
            <div className='row pt-4 h-75' >
                <SingleProduct product={product}
                    onOkClick={onOkClick}
                    onStarClick={onStarClick} rating={rating} />

            </div>
            <div className='row'>
                <div className='col text-center pt-5 pb-5'>
                    <hr />
                    <h4>Related Product </h4>


                    <div className="container">

                        {/* {JSON.stringify(relatedProduct)} */}
                        <div className="row">
                            {relatedProduct && relatedProduct.length > 0 ? relatedProduct.map((product) => (
                                <div key={product._id} className="col-md-4 mb-4">
                                    {product && product.ratings && product.ratings.length > 0 ? showAverage(product) : <div className='text-center pt-2 pb-3 '> No rating yet</div>}
                                    <ProductCard key={product._id}
                                        product={product}
                                    />
                                </div>
                            )) :
                                'No Related Product'
                            }

                        </div>



                    </div>
                    <hr />
                </div>

            </div>
        </div>
    )
}

export default Product

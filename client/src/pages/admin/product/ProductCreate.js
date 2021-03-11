import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
    createProduct,

} from "../../../functions/product";



import AdminNav from "../../../components/nav/AdminNav";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";

const initialState = {
    title: "Nokia x7",
    description: "Best Phone",
    price: "25500",
    categories: [],
    category: "",
    subs: [],
    shipping: "Yes",
    quantity: "50",
    images: [
        //     {
        //     "public_id": "x0vydnubetho0d04tkfi",
        //     "url": "https://res.cloudinary.com/dhhstdwuq/image/upload/v1614983744/x0vydnubetho0d04tkfi.jpg"
        // },
        // {
        //     "public_id": "owjhdb8gzazgfwnddisf",
        //     "url": "https://res.cloudinary.com/dhhstdwuq/image/upload/v1614983874/owjhdb8gzazgfwnddisf.jpg"
        // }
    ],
    colors: ["Black", "Brown", "Silver", "White", "Blue"],
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
    color: "Black",
    brand: "Nokia",
};

const ProductCreate = () => {
    const [values, setValues] = useState(initialState);
    const { user } = useSelector(state => ({ ...state }))
    const [subOptions, setSubOptions] = useState([]);
    const [loading, setLoading] = useState(false)
    const [key, setKey] = useState("1")

    useEffect(() => {
        console.log('use effect product create')
        loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadCategories = () =>
        getCategories().then((c) =>
            setValues({ ...values, categories: c.data })


        )
            .catch(err => console.log(err))



    const handleSubmit = (e) => {
        e.preventDefault();
        createProduct(values, user.token)
            .then(res => {

                window.alert(`"${res.data.title}" is created`);
                window.location.reload()
                setValues(initialState)
            })
            .catch(err => {
                console.log(err);

                // if (err.response.status === 400) toast.error(err.response.message);
                // else
                toast.error(err.response.data.err);
            })
        //
    };

    const handleChange = (e) => {
        setValues((prev) => ({
            ...prev,
            [e.target.name]: e.target.value

        }))
        // console.log(e.target.name, '------------', e.target.value)
        //
    };

    const handleCategoryChange = (e) => {
        e.preventDefault()
        console.log('handleCategoryChange', e.target.value)
        setValues((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
            subs: []
        }))
        getCategorySubs(e.target.value).then(res => {

            console.log(res.data)
            setSubOptions(res.data)
        })
            .catch(err => {
                console.log(err)
            })
        // console.log(e.target.name, '------------', e.target.value)
        //
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col-md-10">
                    {loading ? <LoadingOutlined className='text-danger h1' /> : <h4>Product create</h4>}
                    <hr />
                    <div className='p-3'>
                        <FileUpload
                            key={key}
                            setKey={setKey}
                            values={values}
                            setValues={setValues}
                            setLoading={setLoading}
                        />

                    </div>


                    <ProductCreateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        values={values}
                        handleCategoryChange={handleCategoryChange}
                        subOptions={subOptions}
                        setValues={setValues}
                    />




                </div>
            </div>
        </div>
    );
};

export default ProductCreate;


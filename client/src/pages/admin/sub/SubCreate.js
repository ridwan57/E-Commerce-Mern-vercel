import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
    createSub,
    getSubs,
    removeSub,
} from "../../../functions/sub";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import AdminNav from "../../../components/nav/AdminNav";
import CategoryForm from "../../../components/forms/CategoryForms";
import LocalSearch from "../../../components/forms/LocalSearch";
import { getCategories } from "../../../functions/category";

const SubCreate = () => {
    const { user } = useSelector((state) => ({ ...state }));

    const [name, setName] = useState("");
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subs, setSubs] = useState([]);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        loadCategories();
        loadSubs()
    }, []);

    const loadCategories = () =>
        getCategories().then((c) => setCategories(c.data));

    const loadSubs = () =>
        getSubs().then((c) => setSubs(c.data));

    const handleRemove = (slug) => {
        let answer = window.confirm(`Are you sure you want to delete ${slug} ?`)
        console.log(answer)
        if (answer) {
            setLoading(true)
            removeSub(slug, user.token)
                .then(res => {
                    console.log('res:', res)
                    setLoading(false)
                    toast.error(`${res.data.name} Deleted`)
                    loadSubs()
                })
                .catch(err => {
                    console.log('err:', err)
                    setLoading(false)
                    if (err.response.status === 400) toast.error(err.response.data);
                    else toast.error(err.response.data);
                })

        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name);
        setLoading(true);
        createSub({ name, parent: category }, user.token)
            .then((res) => {
                // console.log(res)
                setLoading(false);
                setName("");
                toast.success(`"${res.data.name}" is created`);
                loadSubs()
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
                else toast.error(err.response.data);
            });
    };


    const searchCallBack = (search) => (c) => c.name.toLowerCase().includes(search.toLowerCase())
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    {loading ? (
                        <h4 className="text-danger">Loading..</h4>
                    ) : (
                        <h4>Create sub category</h4>
                    )}

                    <div className='form-group'>
                        <label>Parent Category</label>
                        <select name='category' className='form-control'
                            onChange={e => setCategory(e.target.value)}
                        >
                            <option>Please Select</option>
                            {categories.length > 0 && categories.map((c, id) => (
                                <option key={c._id} value={c._id}>{c.name}</option>

                            ))}



                        </select>

                    </div>

                    <CategoryForm
                        handleSubmit={handleSubmit}
                        name={name}
                        setName={setName}
                    />


                    <LocalSearch keyword={keyword} setKeyword={setKeyword} />
                    {subs.filter(searchCallBack(keyword)).map((c, id) => (
                        <div key={id} className='alert alert-secondary'>
                            {c.name} <span className='btn btn-sm float-right'>

                                <DeleteOutlined disabled={loading}
                                    onClick={() => handleRemove(c.slug)}
                                    className='text-danger' /></span>{" "}
                            <Link to={`/admin/sub/${c.slug}`}>


                                <span className='btn btn-sm float-right'> <EditOutlined className='text-warning' /></span>{" "}



                            </Link>
                        </div>

                    ))}
                </div>
            </div>
        </div>
    );
};

export default SubCreate;

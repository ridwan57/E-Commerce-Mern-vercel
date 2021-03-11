import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { useSelector } from "react-redux";


const ForgotPassword = ({ history }) => {
    const [email, setEmail] = useState("ridwananik57@gmail.com");
    const { user } = useSelector(state => ({ ...state }))

    useEffect(() => {
        if (user && user.token) history.push('/')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const [loading, setLoading] = useState(false);
    // const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        setLoading(true)
        // console.log(process.env.REACT_APP_REGISTER_REDIRECT_URL)
        e.preventDefault();
        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
            handleCodeInApp: true,
        };


        await auth.sendPasswordResetEmail(email, config)
            .then(() => {
                setLoading(false)
                setEmail('')

                toast.success('Email Sent')
            })
            .catch(error => {
                setLoading(false)
                console.log('error:', error)
                toast.error(error.message)


            })

    };


    const forgotPasswordForm = () => (

        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter your email'
                    autoFocus
                />
            </div>


            <button disabled={!email || loading} type="submit" className="btn btn-raised">
                Confirm Email
          </button>


        </form>
    );

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {loading ? <h4 className='text-danger'>Loading... </h4> : <h4>Forgot Password</h4>}

                    {forgotPasswordForm()}
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
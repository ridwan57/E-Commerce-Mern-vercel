import React, { useState } from "react";
import { Badge, Menu } from "antd";
import {
    AppstoreOutlined,
    SettingOutlined,
    UserOutlined,
    UserAddOutlined,
    LogoutOutlined,
    ShoppingCartOutlined,
    ShoppingOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Search from "../forms/Search";

const { SubMenu, Item } = Menu;

const Header = () => {
    const [current, setCurrent] = useState("home");

    let dispatch = useDispatch();
    let { user, cart } = useSelector((state) => ({ ...state }));

    let history = useHistory();

    const handleClick = (e) => {
        // console.log(e.key);
        setCurrent(e.key);
    };

    const logout = () => {
        firebase.auth().signOut();
        dispatch({
            type: "LOGOUT",
            payload: null,
        });
        history.push("/login");
    };

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" className='sticky-top'>
            <Item key="home" icon={<AppstoreOutlined />}>
                <Link to="/">Home</Link>
            </Item>

            <Item key="shop" icon={<ShoppingOutlined />}>
                <Link to="/shop">Shop</Link>
            </Item>



            <Item key="cart" icon={<ShoppingCartOutlined />}>
                <Link to="/cart">
                    <Badge count={cart ? cart.length : 0} offset={[9, 0]}>
                        Cart
                        </Badge>
                </Link>
            </Item>






            {!user && (
                <Item key="register" icon={<UserAddOutlined />} className="float-right">
                    <Link to="/register">Register</Link>
                </Item>
            )}

            {!user && (
                <Item key="login" icon={<UserOutlined />} className="float-right">
                    <Link to="/login">Login</Link>
                </Item>
            )}


            {user && (
                <SubMenu

                    icon={<SettingOutlined />}
                    title={user.email && user.email.split("@")[0]}
                    className="float-right"
                >
                    {user && user.role === 'subscriber' && <Item key='user' ><Link to='/user/history'> DashBoard</Link></Item>}
                    {user && user.role === 'admin' && <Item key='admin'><Link to='/admin/dashboard'> DashBoard</Link></Item>}


                    <Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
                        Logout
                      </Item>
                </SubMenu>
            )
            }
            <div className='float-right p-1' key='search'>

                <Search />
            </div>
        </Menu >
    );
};

export default Header;

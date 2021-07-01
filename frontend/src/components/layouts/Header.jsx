import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import '../../App.css';
import { Link } from 'react-router-dom';
import Search from './Search';
import { logout } from '../../actions/userActions';

const Header = () => {
    const cartquatity = useRef();

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, user, error } = useSelector((state) => state.auth);
    const { totalItems } = useSelector((state) => state.cart);

    // useEffect(() => {
    //     cartquatity.current = cartItems.reduce(
    //         (acc, item) => item.quantity + acc,
    //         0
    //     );
    // }, [totalItems]);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <>
            <nav className="navbar row">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand">
                        <Link to="/">
                            <img src="/images/logo.png" />
                        </Link>
                    </div>
                </div>

                <div className="col-12 col-md-6 mt-2 mt-md-0">
                    {/* <Route
                        render={({ history }) => (
                            <Search
                                history={history}
                            />
                        )}
                    /> */}
                    <Search />
                </div>

                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                    <Link to="/me" className="dropdown-item">
                        Profile
                    </Link>
                    <Link to="/cart">
                        <span id="cart" className="ml-3">
                            Cart
                        </span>
                        <span className="ml-1" id="cart_count">
                            {totalItems}
                        </span>
                    </Link>
                    {user ? (
                        <div className="ml-4 dropdown d-inline">
                            <Link
                                to="#"
                                className="btn dropdown-toggle text-white"
                                type="button"
                                id="dropDownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                <figure className="avatar avatar-nav">
                                    <img
                                        src={user.avatar && user.avatar.url}
                                        alt={user && user.name}
                                        className="rounded-circle"
                                    />
                                </figure>
                                <span>{user && user.name}</span>
                            </Link>
                            <div
                                className="dropdown-menu"
                                aria-labelledby="dropDownMenuButton">
                                {user && user.role !== 'admin' ? (
                                    <Link
                                        to="/order/me"
                                        className="dropdown-item">
                                        Orders
                                    </Link>
                                ) : (
                                    <Link
                                        to="/dashboard"
                                        className="dropdown-item">
                                        Dashboard
                                    </Link>
                                )}
                                <Link to="/me" className="dropdown-item">
                                    Profile
                                </Link>
                                <Link
                                    to="/"
                                    className="dropdown-item text-danger"
                                    onClick={handleLogout}>
                                    Logout
                                </Link>
                            </div>
                        </div>
                    ) : (
                        !loading && (
                            <Link
                                to="/login"
                                className="btn ml-4"
                                id="login_btn">
                                Login
                            </Link>
                        )
                    )}
                </div>
            </nav>
        </>
    );
};

export default Header;

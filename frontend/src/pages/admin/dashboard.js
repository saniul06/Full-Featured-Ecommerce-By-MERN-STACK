import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar'
import { getAdminProducts } from '../../actions/productActions'
import { adminOrders } from '../../actions/orderActions'
import { getAllUsers } from '../../actions/userActions'
import MetaData from '../../components/layouts/MetaData'
import Error from '../../components/layouts/ErrorBoundary'

const Dashboard = () => {

    const { products } = useSelector(state => state.allProducts)
    const { orders, totalAmount } = useSelector(state => state.adminOrders)
    const { users } = useSelector(state => state.allUsers)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAdminProducts())
        dispatch(adminOrders())
        dispatch(getAllUsers())
    }, [dispatch])

    const outOfStock = products.filter(product => product.stock === 0)

    return (
        <>
            <MetaData title='Dashboard' />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <h1 className="my-4">Dashboard</h1>
                    <div className="row pr-4">
                        <div className="col-xl-12 col-sm-12 mb-3">
                            <div className="card text-white bg-primary o-hidden h-100">
                                <div className="card-body">
                                    <div className="text-center card-font-size">Total Amount<br /> <b>${totalAmount && totalAmount}</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row pr-4">
                        <div className="col-xl-3 col-sm-6 mb-3">
                            <div className="card text-white bg-success o-hidden h-100">
                                <div className="card-body">
                                    <div className="text-center card-font-size">Products<br /> <b>{products && products.length}</b></div>
                                </div>
                                <Link to="/admin/products" className="card-footer text-white clearfix small z-1">
                                    <span className="float-left">View Details</span>
                                    <span className="float-right">
                                        <i className="fa fa-angle-right"></i>
                                    </span>
                                </Link>
                            </div>
                        </div>


                        <div className="col-xl-3 col-sm-6 mb-3">
                            <div className="card text-white bg-danger o-hidden h-100">
                                <div className="card-body">
                                    <div className="text-center card-font-size">Orders<br /> <b>{orders && orders.length}</b></div>
                                </div>
                                <Link to="/admin/orders" className="card-footer text-white clearfix small z-1">
                                    <span className="float-left">View Details</span>
                                    <span className="float-right">
                                        <i className="fa fa-angle-right"></i>
                                    </span>
                                </Link>
                            </div>
                        </div>


                        <div className="col-xl-3 col-sm-6 mb-3">
                            <div className="card text-white bg-info o-hidden h-100">
                                <div className="card-body">
                                    <div className="text-center card-font-size">Users<br /> <b>{users && users.length}</b></div>
                                </div>
                                <Link to="/admin/users" className="card-footer text-white clearfix small z-1">
                                    <span className="float-left">View Details</span>
                                    <span className="float-right">
                                        <i className="fa fa-angle-right"></i>
                                    </span>
                                </Link>
                            </div>
                        </div>


                        <div className="col-xl-3 col-sm-6 mb-3">
                            <div className="card text-white bg-warning o-hidden h-100">
                                <div className="card-body">
                                    <div className="text-center card-font-size">Out of Stock<br /> <b>{outOfStock.length}</b></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard

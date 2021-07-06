import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../../components/layouts/MetaData'
import Loader from '../../components/layouts/Loader'
import Sidebar from '../../components/admin/Sidebar'
import { allOrders, clearErrors, deleteOrder } from '../../actions/orderActions'
import { DELETE_PRODUCT_RESET, SINGLE_PRODUCT_RESET } from '../../actions/actionTypes'

const OrdersList = () => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, orders, error } = useSelector(state => state.allOrders)
    // const { error: deleteProductError, message } = useSelector(state => state.deleteProduct)


    useEffect(() => {
        dispatch(allOrders())
    }, [])

    useEffect(() => {

        // dispatch({ type: SINGLE_PRODUCT_RESET })
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        // if (deleteProductError) {
        //     alert.error(deleteProductError)
        //     dispatch(clearErrors())
        // }
        // if (message) {
        //     alert.success(message)
        //     dispatch({ type: DELETE_PRODUCT_RESET })
        // }

    }, [dispatch, error, alert])

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order Id',
                    field: 'id',
                    sort: 'asc',
                },
                {
                    label: 'No. of items',
                    field: 'numOfItems',
                    sort: 'asc',
                },
                {
                    label: 'Total amount',
                    field: 'totalPrice',
                    sort: 'asc',
                },
                {
                    label: 'Payment',
                    field: 'payment',
                    sort: 'asc',
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc',
                },

                {
                    label: 'Action',
                    field: 'action',
                }
            ],
            rows: []
        }

        orders && orders.forEach(order => data.rows.push({
            id: order._id,
            numOfItems: order.orderItems.length,
            totalPrice: `$${order.totalPrice}`,
            payment: order.paymentInfo.status.includes('succeeded') ? <p className="text-success font-weight-bold text-uppercase">Paid</p> : <p className="text-success font-weight-bold text-upprercase">not paid</p>,
            status: <p className={`font-weight-bold text-uppercase ${order.orderStatus.includes('Delivered') ? "text-success" : order.orderStatus.includes('processing') ? "text-danger" : "text-primary"}`}>{order.orderStatus}</p>,
            action: (
                <>
                    <Link to={`/admin/order/${order._id}`} className='btn btn-primary py-1'><i className="fa fa-eye" aria-hidden="true"></i></Link>
                    <button onClick={() => handleDelete(order._id)} className="btn btn-danger py-1 px-2 ml-2"><i className="fa fa-trash" aria-hidden="true"></i></button>
                </>
            )
        }))
        return data
    }

    const handleDelete = id => {
        // dispatch(deleteProduct(id))
    }

    return (
        <>
            <MetaData title='All Orders' />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <h1 className='my-5'>All Orders</h1>
                    {loading ? <Loader /> : (
                        <MDBDataTable
                            data={setOrders()}
                            className='px-3'
                            hover
                            bordered
                            striped
                        />
                    )}
                </div>
            </div>

        </>
    )
}

export default OrdersList

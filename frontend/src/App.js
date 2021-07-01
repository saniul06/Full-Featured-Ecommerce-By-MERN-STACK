import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'
import Home from './pages/home'
import ProductDetails from './pages/productDetails'
import Login from './pages/user/login'
import Register from './pages/user/register'
import store from './store'
import { loadUser } from './actions/userActions'
import profile from './pages/user/profile'
import UpdateProfile from './pages/user/updateProfile'
import UpdatePassword from './pages/user/updatePassword'
import ForgotPassword from './pages/user/forgotPassword'
import ResetPassword from './pages/user/resetPassword'
import ShippingInfo from './pages/shippingInfo'
import ConfirmOrder from './pages/confirmOrder'
import Payment from './pages/payment'
import ProtectedRoute from './components/route/ProtectedRoute'
import AuthRoute from './components/route/AuthRoute'
import Cart from './pages/cart'
import OrderSuccess from './pages/orderSuccess'

store.dispatch(loadUser())

function App() {

	const [stripeApiKey, setStripeApiKey] = useState()

	useEffect(() => {
		async function getStripeApiKey() {
			const { data } = await axios.get('/api/v1/stripeapi')
			setStripeApiKey(data.stripteApiKey)
		}
		getStripeApiKey()
	})

	return (
		<Router>
			<div className="App">
				<Header />
				<div className="container container-fluid">
					<Route path='/' component={Home} exact />
					<Route path='/search/:keyword' component={Home} />
					<Route path='/product/:id' component={ProductDetails} />
					<AuthRoute path='/login' component={Login} />
					<AuthRoute path='/register' component={Register} />
					<AuthRoute path='/forgot-password' component={ForgotPassword} />
					<AuthRoute path='/reset-password/:token' component={ResetPassword} />
					<ProtectedRoute path='/me' component={profile} exact />
					<ProtectedRoute path='/me/edit' component={UpdateProfile} />
					<ProtectedRoute path='/me/password' component={UpdatePassword} />
					<ProtectedRoute path='/shipping' component={ShippingInfo} />
					<ProtectedRoute path='/confirm/order' component={ConfirmOrder} />
					<ProtectedRoute path='/success' component={OrderSuccess} />
					{stripeApiKey && (
						<Elements stripe={loadStripe(stripeApiKey)}>
							<ProtectedRoute path='/payment' component={Payment} />
						</Elements>
					)}
					<Route path='/cart' component={Cart} />
				</div>
				<Footer />
			</div>
		</Router>
	);
}

export default App;

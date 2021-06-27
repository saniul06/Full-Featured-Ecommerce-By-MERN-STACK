import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useEffect } from 'react'
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
import ProtectedRoute from './components/route/ProtectedRoute'
import AuthRoute from './components/route/AuthRoute'

store.dispatch(loadUser())

function App() {

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
				</div>
				<Footer />
			</div>
		</Router>
	);
}

export default App;

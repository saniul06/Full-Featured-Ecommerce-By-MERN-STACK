import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AuthRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated, loading } = useSelector((state) => state.auth);
    return (
        <>
            {loading === false && (
                <Route
                    {...rest}
                    render={(props) => {
                        if (isAuthenticated === true) {
                            return <Redirect to="/" />;
                        }
                        return <Component {...props} />;
                    }}
                />
            )}
        </>
    );
};

export default AuthRoute

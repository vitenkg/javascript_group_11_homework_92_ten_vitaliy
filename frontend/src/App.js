import Layout from "./components/UI/Layout/Layout";
import {Redirect, Route, Switch} from "react-router-dom";
import Login from "./containers/Login/Login";
import Chat from "./containers/Chat/Chat";
import {useSelector} from "react-redux";
import Register from "./containers/Register/Register";

const App = () => {
    const user = useSelector(state => state.users.user);

    const ProtectedRoute = ({isAllowed, redirectTo, ...props}) => {
        return isAllowed ?
            <Route {...props}/> :
            <Redirect to={redirectTo}/>
    };

    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Login}/>
                <ProtectedRoute
                    path="/chat"
                    component={Chat}
                    isAllowed={!!user}
                    redirectTo="/"
                />
                <Route path="/register" component={Register}/>
            </Switch>
        </Layout>
    );
};

export default App;

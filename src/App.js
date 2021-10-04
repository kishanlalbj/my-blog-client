import { Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Home from './containers/Home';
import Article from './containers/Article';
import NewArticle from './containers/NewArticle';
import './App.css';
import Footer from './components/Footer';
import checkAuth from './utils/checkAuth';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setCurrentUser } from './actions';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const { isAuth, user } = checkAuth();

    dispatch(setCurrentUser(user, isAuth));
  }, []);

  return (
    <>
      <Header></Header>

      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Container>
          <ProtectedRoute
            exact
            path="/new"
            component={NewArticle}
          ></ProtectedRoute>
          <Route exact path="/article/:id" component={Article}></Route>
        </Container>
      </Switch>

      <Footer />
    </>
  );
}

export default App;

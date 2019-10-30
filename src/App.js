import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './views/Home'
import Category from './views/Category'
import Cart from './views/Cart'
import My from './views/My'
import MyNoLogin from './views/MyNoLogin'
import Pay from './views/Pay'
import AddressInfo from './views/AddressInfo'
import OrderList from './views/OrderList'
import Login from './views/Login'
import Register from './views/Register'
import GoodsDetail from './views/GoodsDetail'
import SearchField from './views/SearchField'
import SearchGoods from './views/SearchGoods'
import ErrorPage from './views/ErrorPage'
import PrivateRoute from './components/PrivateRoute'


function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div style={{ height: '100%' }}>
        <Switch>
          <Route path='/' exact render={props => <Layout {...props}><Home></Home></Layout>}></Route>
          <Route path='/category' render={props => <Layout {...props}><Category></Category></Layout>}></Route>
          <Route path='/login' render={props => <Layout {...props}><Login></Login></Layout>}></Route>
          <Route path='/mynologin' render={props => <Layout {...props}><MyNoLogin></MyNoLogin></Layout>}></Route>
          <Route path='/my' render={props => <Layout {...props}><PrivateRoute component={My}></PrivateRoute></Layout>}></Route>
          <Route path='/cart' render={props => <Layout {...props}><PrivateRoute path="/cart" component={Cart}></PrivateRoute></Layout>}></Route>
          <Route path='/pay' render={props => <PrivateRoute {...props} component={Pay}></PrivateRoute>}></Route>
          <Route path='/address' render={props => <PrivateRoute {...props} component={AddressInfo}></PrivateRoute>}></Route>
          <Route path='/order' render={props => <PrivateRoute {...props} component={OrderList}></PrivateRoute>}></Route>
          <Route path='/register' render={props => <Layout {...props}><Register></Register></Layout>}></Route>
          <Route path='/goodsdetail/:id' render={props => <GoodsDetail {...props}></GoodsDetail>}></Route>
          <Route path='/searchfield' render={props => <SearchField {...props}></SearchField>}></Route>
          <Route path='/searchgoods/:goodsvalue' render={props => <SearchGoods {...props}></SearchGoods>}></Route>
          <Route path='/404' render={props => <ErrorPage {...props}></ErrorPage>}></Route>
          <Redirect to="/404"></Redirect>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

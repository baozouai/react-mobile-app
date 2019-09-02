import React from 'react';
import Layout from './layout/Layout'
import Home from './views/Home'
import Cart from './views/Cart'
import My from './views/My'
import Pay from './views/Pay'
import Login from './views/Login'
import Register from './views/Register'
import GoodsDetail from './views/GoodsDetail';
import SearchField from './views/SearchField';
import SearchGoods from './views/SearchGoods';
import PrivateRoute from './components/PrivateRoute'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div style={{ height: '100%' }}>
        <Switch>
          <Route path='/' exact render={props => <Layout {...props}><Home></Home></Layout>}></Route>
          <Route path='/my' render={props => <Layout {...props}><PrivateRoute component={My}></PrivateRoute></Layout>}></Route>
          <Route path='/pay' render={props => <Layout {...props}><PrivateRoute path="/pay" component={Pay}></PrivateRoute></Layout>}></Route>
          <Route path='/cart' render={props => <Layout {...props}><PrivateRoute path="/cart" component={Cart}></PrivateRoute></Layout>}></Route>
          <Route path='/login' render={props => <Layout {...props}><Login></Login></Layout>}></Route>
          <Route path='/register' render={props => <Layout {...props}><Register></Register></Layout>}></Route>
          <Route path='/goodsdetail/:id' render={props => <GoodsDetail {...props}></GoodsDetail>}></Route>
          <Route path='/searchfield' render={props => <SearchField {...props}></SearchField>}></Route>
          <Route path='/searchgoods/:goodsvalue' render={props => <SearchGoods {...props}></SearchGoods>}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

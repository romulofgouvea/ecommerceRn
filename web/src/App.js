import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import './config/global.css';
import { Orders, Products, Collect } from './screens';
import useWindowDimensions from './hooks/dimensions';


const renderNavBar = (w) => (
  <div className={`topnav ${w < 600 ? "responsive" : ""}`}>
    <Link to='/'>Pedidos</Link>
    <Link to='/products'>Produtos</Link>
    <Link to='/collect'>Relatório de Coleta</Link>
  </div>
)

const App = () => {
  const { width } = useWindowDimensions();

  return (
    <Router>
      {renderNavBar(width)}
      <Switch>
        <Route path="/" exact component={Orders} />
        <Route path="/products" component={Products} />
        <Route path="/collect" component={Collect} />
      </Switch>
    </Router>
  )
}

export default App;

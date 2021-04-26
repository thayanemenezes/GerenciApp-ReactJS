import React, {Component} from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import addEstabs from './components/addEstabs';
import estabsList from './components/estabsList';
import estabs from './components/estabs';


class App extends Component {
  render(){
    return(
      <div>
        <nav className="navbar navbar-expand">
          <a href="#" className="navbar-brand">
            GerenciApp :)
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/estabs"} className="nav-link">
                Estabelecimentos
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Cadastrar
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/estabs"]} component={estabsList} />
            <Route exact path="/add" component={addEstabs} />
            <Route path="/estabs/:id" component={estabs} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import EstabDataService from '../services/estabs.service';
import { Link } from 'react-router-dom';

import './estabsList.css'

import SearchIcon from '@material-ui/icons/Search';

export default class estabsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveEstabs = this.retrieveEstabs.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveEstab = this.setActiveEstab.bind(this);
    this.removeAllEstabs = this.removeAllEstabs.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      estabs: [],
      currentEstab: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveEstabs();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrieveEstabs() {
    EstabDataService.getAll()
      .then(response => {
        this.setState({
          estabs: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveEstabs();
    this.setState({
      currentEstab: null,
      currentIndex: -1
    });
  }

  setActiveEstab(estab, index) {
    this.setState({
      currentEstab: estab,
      currentIndex: index
    });
  }

  removeAllEstabs() {
    EstabDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchName() {
    EstabDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          estabs: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchName, estabs, currentEstab, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Pesquisar"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
              >
                <SearchIcon/>
                
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Estabelecimentos cadastrados</h4>

          <ul className="list-group">
            {estabs &&
              estabs.map((estab, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveEstab(estab, index)}
                  key={index}
                >
                  {estab.name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllEstabs}
          >
            Excluir todos
          </button>
        </div>
        <div className="col-md-6">
          {currentEstab ? (
            <div>
              <h4>Estab</h4>
              <div>
                <label>
                  <strong>Nome:</strong>
                </label>{" "}
                {currentEstab.name}
              </div>
              <div>
                <label>
                  <strong>CNPJ</strong>
                </label>{" "}
                {currentEstab.cnpj}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentEstab.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/estabs/" + currentEstab.id}
                className="badge badge-warning"
              >
                Editar
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Escolha um estabelecimento...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
import React, { Component } from 'react';
import EstabDataService from '../services/estabs.service'

export default class addEstabs extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCnpj = this.onChangeCnpj.bind(this);
        this.saveEstab = this.saveEstab.bind(this);
        this.newEstab = this.newEstab.bind(this);

        this.state = {
            id: null,
            name: "",
            cnpj: "",
            published: false,

            submitted: false
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeCnpj(e) {
        this.setState({
            cnpj: e.target.value
        });
    }

    saveEstab() {
        var data = {
            name: this.state.name,
            cnpj: this.state.cnpj
        };

        EstabDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    name: response.data.name,
                    cnpj: response.data.cnpj,
                    published: response.data.published,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newEstab() {
        this.setState({
            id: null,
            name: "",
            cnpj: "",
            published: false,

            submitted: false
        });
    }

    render() {
        return (
          <div className="submit-form">
            {this.state.submitted ? (
              <div>
                <h4>Estabelecimento cadastrado com sucesso!</h4>
                <button className="btn btn-success" onClick={this.newEstab}>
                    Cadastrar
                </button>
              </div>
            ) : (
              <div>
                <div className="form-group">
                  <label htmlFor="name">Nome</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    value={this.state.name}
                    onChange={this.onChangeName}
                    name="name"
                  />
                </div>
    
                <div className="form-group">
                  <label htmlFor="cnpj">CNPJ</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cnpj"
                    required
                    value={this.state.cnpj}
                    onChange={this.onChangeCnpj}
                    name="cnpj"
                  />
                </div>
    
                <button onClick={this.saveEstab} className="btn btn-success">
                  Enviar
                </button>
              </div>
            )}
          </div>
        );
      }
    }

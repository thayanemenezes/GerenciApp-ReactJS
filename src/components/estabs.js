import React, { Component } from "react";
import EstabDataService from "../services/estabs.service";

export default class Estab extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeCnpj = this.onChangeCnpj.bind(this);
    this.getEstab = this.getEstab.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateEstab = this.updateEstab.bind(this);
    this.deleteEstab = this.deleteEstab.bind(this);

    this.state = {
      currentEstab: {
        id: null,
        name: "",
        cnpj: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getEstab(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentEstab: {
          ...prevState.currentEstab,
          name: name
        }
      };
    });
  }

  onChangeCnpj(e) {
    const cnpj = e.target.value;
    
    this.setState(prevState => ({
      currentEstab: {
        ...prevState.currentEstab,
        cnpj: cnpj
      }
    }));
  }

  getEstab(id) {
    EstabDataService.get(id)
      .then(response => {
        this.setState({
          currentEstab: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentEstab.id,
      name: this.state.currentEstab.name,
      cnpj: this.state.currentEstab.cnpj,
      published: status
    };

    EstabDataService.update(this.state.currentEstab.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentEstab: {
            ...prevState.currentEstab,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateEstab() {
    EstabDataService.update(
      this.state.currentEstab.id,
      this.state.currentEstab
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "Dados atualizados com sucesso!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteEstab() {    
    EstabDataService.delete(this.state.currentEstab.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/estabs')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentEstab } = this.state;

    return (
      <div>
        {currentEstab ? (
          <div className="edit-form">
            <h4>Estabelecimentos</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  id="Name"
                  value={currentEstab.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cnpj">CNPJ</label>
                <input
                  type="text"
                  className="form-control"
                  id="cnpj"
                  value={currentEstab.cnpj}
                  onChange={this.onChangeCnpj}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentEstab.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentEstab.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                Cancelar
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Enviar
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteEstab}
            >
              Excluir
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateEstab}
            >
              Atualizar
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Escolha um estabelecimento...</p>
          </div>
        )}
      </div>
  );
}
}
import { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import "./ComponentesCSS.css";




export default class Colaboradores extends Component{

    state = {
        id: "",
        nome: "",
        cpf: "",
        colaboradores: []
    }


    funcCpfChange = (event) => {
        this.setState({cpf: event.target.value})
    }

    funcNomeSocialChange = (event) => {
        this.setState({nome: event.target.value})
    }


    preencherTabela = () => {
        const url = 'http://localhost:8080/colaborador/'
        fetch(url).then(response => response.json())
            .then(data => this.setState({colaboradores: data}))
    }


    componentDidMount(){
        this.preencherTabela()
    }


    editarColaboradorAux = (colaborador) => {
        this.setState({nome: colaborador.nome})
        this.setState({cpf: colaborador.cpf})
        this.setState({id: colaborador.id})
    }

    editarColaborador = () => {
        const alterarcolaborador = {
            nome: this.state.nome,
            cpf: this.state.cpf
        }


        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(alterarcolaborador)
        }

        const url = 'http://localhost:8080/colaborador/alterar/'+this.state.id


        fetch(url, requestOptions)
            .then((response) => {
                if(response.status===200){
                    toast.success("Colaborador alterado com sucesso.")
                    this.preencherTabela()
                    this.setState({nome: "", cpf:""})
                }else{
                    toast.error("Falha ao alterar colaborador")
                }
            })

    }

    zerarVariaveis = () => {
        this.setState({nome: "", cpf:""})
    }


    gravarNovoColaborador = () => {
        const colaborador = {
            "nome": this.state.nome,
            "cpf": this.state.cpf
        }


        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(colaborador)
        }

        const url = 'http://localhost:8080/colaborador/incluir'


        fetch(url, requestOptions)
            .then((response) => {
                if(response.status===200){
                    toast.success("Colaborador inserido com sucesso.")
                    this.preencherTabela()
                    this.setState({nome: "", cpf:""})
                }else{
                    toast.error("Falha ao inserir novo colaborador")
                }
            })

    }
    

    deletarColaborador = (colaborador) => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const url = 'http://localhost:8080/colaborador/'+colaborador.id

        fetch(url, requestOptions)
            .then(response => {
                if(response.status === 200){
                    toast.warning('O Colaborador "'+colaborador.nome+'" foi removido com sucesso.')
                    this.preencherTabela()
                }else{
                    toast.error('Falha ao remover Colaborador')
                }
            })
        
    }


    render(){
        return(
            <div className="row mt-5">  
            <ToastContainer/>       
                    <h3 className="text-center mt-5">Lista de Colaboradores</h3>
                <div className="row">
                    <div className="botaoleft mt-3 p-3"> 
                            <button onClick={() => this.zerarVariaveis()} data-bs-toggle="modal" data-bs-target="#ModalNovoColaborador" type="button" className="btn btn-dark "><i className="bi bi-plus-circle"></i> Novo Colaborador</button>
                    </div>
                    <div>
                    {/* MODAL PARA INSERIR UM NOVO COLABORADOR */}
                    <div className="modal fade" id="ModalNovoColaborador"  aria-labelledby="ModalNovoColaboradorLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="ModalNovoColaboradorLabel">Adicionar novo Colaborador</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form className="form-group textoright">
                                    <div className="col-3">
                                        <label className="form-label">Nome</label>
                                        <input value={this.state.nome} onChange={this.funcNomeSocialChange} maxLength='30' type="text" className="form-control" autoFocus></input>
                                    </div>
                                    <div className="col-5 mt-2">
                                        <label className="form-label">Cpf</label>
                                        <input value={this.state.cpf} onChange={this.funcCpfChange} maxLength='11' type="text" className="form-control" ></input>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button onClick={() => this.gravarNovoColaborador()} data-bs-dismiss="modal" type="button" className="btn btn-primary">Adicionar</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    {/* MODAL PARA ALTERAR UM COLABORADOR */}
                    <div className="modal fade" id="ModalAlterarColaborador"  aria-labelledby="ModalAlterarColaboradorLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="ModalAlterarColaboradorLabel">Alterar Colaborador</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form className="form-group textoright">
                                    <div className="col-3">
                                        <label className="form-label">Nome</label>
                                        <input value={this.state.nome} onChange={this.funcNomeSocialChange} maxLength='30' type="text" className="form-control" autoFocus></input>
                                    </div>
                                    <div className="col-5 mt-2">
                                        <label className="form-label">Cpf</label>
                                        <input value={this.state.cpf} onChange={this.funcCpfChange} maxLength='11' type="text" className="form-control" ></input>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button onClick={() => this.editarColaborador()} data-bs-dismiss="modal" type="button" className="btn btn-primary">Adicionar</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                        <table className="table table-striped table-hover table-responsive mt-4 mb-5">
                                <thead>
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Nome</th>
                                        <th scope="col">Cpf</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.colaboradores && this.state.colaboradores.map(cliente => {
                                        return <tr key={cliente.id}>
                                            <th scope="row">{cliente.id}</th>
                                            <td>{cliente.nome}</td>
                                            <td>{cliente.cpf}</td>
                                            <td>
                                                <div className="btn-group">
                                                    <div className="m-1">
                                                        <button onClick={() => this.editarColaboradorAux(cliente)} data-bs-toggle="modal" data-bs-target="#ModalAlterarColaborador" className="btn btn-sm btn-info"><i className="bi bi-pencil-square"></i></button>
                                                    </div>
                                                    
                                                    <div className="m-1">
                                                        <button onClick={() => this.deletarColaborador(cliente)} className="btn btn-sm btn-warning"><i className="bi bi-trash"></i></button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                        </table>
                </div>
            
        )
    }
}
import { Component } from "react";
import './ComponentesCSS.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default class OpcoesCafe extends Component{

    state = {
        id: "",
        descricao: "",
        opcoescafe: []
    }

    preencherTabelaOpcoesCafe = () => {
        const url = 'http://localhost:8080/cafedamanha/'
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({opcoescafe: data}))
        this.setState({descricao: "",id: ""})
    }

    componentDidMount(){
        this.preencherTabelaOpcoesCafe()
    }

    funcDescricaoChange = (event) => {
        this.setState({descricao: event.target.value})
    }


    deletarOpcaoDeCafe = (cafe) => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const url = 'http://localhost:8080/cafedamanha/'+cafe.id

        fetch(url, requestOptions)
            .then(response => {
                if(response.status === 200){
                    toast.warning('A Opção "'+cafe.descricao+'" foi removida com sucesso.')
                    this.preencherTabelaOpcoesCafe()
                }else{
                    toast.error('Falha ao remover Opção')
                }
            })
        
    }


    editarCafeAux = (cafe) => {
        this.setState({descricao: cafe.descricao})
        this.setState({id: cafe.id})
    }

    editarCafe = () => {
        const alterarcafe = {
            descricao: this.state.descricao
        }


        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(alterarcafe)
        }

        const url = 'http://localhost:8080/cafedamanha/alterar/'+this.state.id


        fetch(url, requestOptions)
            .then((response) => {
                if(response.status===200){
                    toast.success("Opção de Café alterado com sucesso.")
                    this.preencherTabelaOpcoesCafe()
                    this.setState({descricao: "", id:""})
                }else{
                    toast.error("Falha ao alterar colaborador")
                }
            })

    }

    zerarVariaveis = () => {
        this.setState({nome: "", cpf:""})
    }

    gravarNovaOpcao = () => {
        const opcao = {
            descricao: this.state.descricao
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(opcao)
        }

        const url = 'http://localhost:8080/cafedamanha/incluir'


        
        fetch(url, requestOptions)
            .then(response => {
                if(response.status === 200){
                    this.preencherTabelaOpcoesCafe()
                    toast.success('Registro inserido com sucesso.')
                }else{
                    toast.error('Falha ao gravar registro')
                }
            })

    }


    render(){
        return(
            
            <div className="row mt-5 mb-5">      
            <ToastContainer/>   
                    <h3 className="text-center mt-5">Lista de Opções para Café da Manhã</h3>
                <div className="row">
                    <div className="textoright">
                        <button onClick={() => this.zerarVariaveis()} type="button" data-bs-toggle="modal" data-bs-target="#ModalNovaOpcaoCafe" className="btn btn-dark "><i className="bi bi-plus-circle"></i> Novo Colaborador</button>
                    </div>
                    <div>
                        {/* MODAL PARA NOVA OPCAO DE CAFE DA MANHA */}
                    <div className="modal fade" id="ModalNovaOpcaoCafe"  aria-labelledby="ModalNovaOpcaoCafelLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="ModalNovaOpcaoCafeLabel">Adicionar nova opção de Café da Manha</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label className="col-form-label">Descrição</label>
                                    <input value={this.state.descricao} onChange={this.funcDescricaoChange} type="text" className="form-control" id="recipient-name"/>
                                </div>
                        
                            
                            </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button onClick={() => this.gravarNovaOpcao()} data-bs-dismiss="modal" type="button" className="btn btn-primary">Adicionar</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    {/* MODAL PARA ALTERAR OPCAO DE CAFE DA MANHA */}
                    <div className="modal fade" id="ModalAlterarOpcaoCafe"  aria-labelledby="ModalAlterarOpcaoCafelLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="ModalAlterarOpcaoCafeLabel">Alterar opção de Café da Manha</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label className="col-form-label">Descrição</label>
                                    <input value={this.state.descricao} onChange={this.funcDescricaoChange} type="text" className="form-control" id="recipient-name"/>
                                </div>
                            </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button onClick={() => this.editarCafe()} data-bs-dismiss="modal" type="button" className="btn btn-primary">Adicionar</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="mt-3 p-3"> 
                        <table className="table table-striped table-hover table-responsive mt-4">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Descrição</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                    {this.state.opcoescafe && this.state.opcoescafe.map(opcoes => {
                                        return <tr key={opcoes.id}>
                                            <th scope="row">{opcoes.id}</th>
                                            <td>{opcoes.descricao}</td>
                                            <td>
                                                <div className="btn-group">
                                                    <div className="m-1">
                                                        <button onClick={() => this.editarCafeAux(opcoes)} data-bs-toggle="modal" data-bs-target="#ModalAlterarOpcaoCafe"  className="btn btn-sm btn-info"><i className="bi bi-pencil-square"></i></button>
                                                    </div>
                                                    <div className="m-1">
                                                        <button onClick={() => this.deletarOpcaoDeCafe(opcoes)} className="btn btn-sm btn-warning"><i className="bi bi-trash"></i></button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                        </table>
                    </div>
                </div>
            
        )
    }
}
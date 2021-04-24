import { Component } from "react";
import { Link } from "react-router-dom";




export default class Menu extends Component{
    render(){
        return(
            <div className="row fixed-top">
                <nav className="col-12 navbar navbar-expand-lg navbar-light bg-dark fixed-top">
                    <div className="text-white p-2">
                        <Link className="navbar-brand text-white" to="/"><i className="bi bi-house"></i></Link>
                        <Link className="navbar-brand text-white" to="/colaboradores">Colaboradores</Link>
                    </div>
                </nav>  
            </div>
        )
    }
}
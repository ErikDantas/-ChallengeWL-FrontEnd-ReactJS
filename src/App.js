import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Colaboradores from './Componentes/Colaboradores';
import Menu from './Componentes/Menu';
import Rodape from './Componentes/Rodape';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Menu/>
        <Switch>
            <Route path="">
                <Colaboradores/>
            </Route>
        </Switch>
        <Rodape/>
      </BrowserRouter>
      
    </div>
  );
}

export default App;

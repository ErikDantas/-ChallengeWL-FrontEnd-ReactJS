import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Colaboradores from './Componentes/Colaboradores';
import Menu from './Componentes/Menu';
import OpcoesCafe from './Componentes/OpcoesCafe';
import Rodape from './Componentes/Rodape';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Menu/>
        <Switch>
            <Route path="/colaboradores">
                <Colaboradores/>
            </Route>
            <Route path="/cafedamanha">
              <OpcoesCafe/>
            </Route>
        </Switch>
        <Rodape/>
      </BrowserRouter>
      
    </div>
  );
}

export default App;

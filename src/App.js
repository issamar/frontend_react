import'./App.css'

import Records from "./components/pages/Records";
import EditRecordPage from "./components/pages/EditRecordPage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import AddRecord from './components/pages/AddRecord';
import LoginPage from './components/pages/LoginPage';
import PrivateRoutes from './components/pages/utils/PrivateRoute';
import NavScrollExample from './components/Header';
import { AuthProvider } from './components/context/AuthContext';

function App(props) {

  return (
    <Router>
      <div className="Container">
          <AuthProvider >
            
          <NavScrollExample/>
          <Routes>
            
            
              
            <Route path='/login'  element={<LoginPage /> }/>
            <Route element={<PrivateRoutes/>}>
              
            <Route path="/all" exact element={<Records/>} />
            <Route path="/all/:id" element={< EditRecordPage/>} />
            <Route path='/add_data' element={< AddRecord/>} /> 
            </Route>
            
          </Routes>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;

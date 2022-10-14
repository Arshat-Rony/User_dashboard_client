
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Login from "./Components/Login/Login";
import Dhasboard from "./Pages/Dahsboard/Dhasboard";
import ViewClients from "./Pages/Dahsboard/ViewClients";
import UpdateUser from "./Pages/Dahsboard/UpdateUser";
import setAuthToken from "./utilitis/setAuthtoken";


const token = JSON.parse(localStorage.getItem('token'))
setAuthToken(token)

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path='/dashboard' element={<Dhasboard></Dhasboard>}>
          <Route index element={<ViewClients></ViewClients>} />
          <Route path="viewclients" element={<ViewClients></ViewClients>} />
          <Route path="updateuser/:id" element={<UpdateUser></UpdateUser>} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;

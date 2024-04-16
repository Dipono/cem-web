import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './screens/Home';
import CustomerDashboard from './screens/customer/CustomerDashboard';
import Forum from './screens/customer/Forum';
import Report from './screens/customer/Report';
import ProviderSash from './screens/Provider/ProviderDash';
import Consult from './screens/Provider/Consult';
function App() {
  return (
    <Router>
      <Routes>
      <Route exact path='/' element={<Home />} />
        <Route exact path='/customer_dashboard' element={<CustomerDashboard />} />
        <Route exact path='/forum' element={<Forum />} />
        <Route exact path='/report' element={<Report />} />
        <Route exact path='/service_provider_dashboard' element={<ProviderSash />} />
        <Route exact path='/consult' element={<Consult />} />
      </Routes>
    </Router>
  );
}

export default App;

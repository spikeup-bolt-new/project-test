import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import Layout from './components/layout/Layout';
import { Sidebar } from './components/layout/Sidebar';
import ContractDetailPage from './pages/ContractDetailPage';
import ContractsPage from './pages/ContractsPage';
import CustomerDetailPage from './pages/CustomerDetailPage';
import CustomersPage from './pages/CustomersPage';
import DashboardPage from './pages/Dashboard';
import InvoicesPage from './pages/InvoicesPage';
import LoginPage from './pages/LoginPage';
import PropertiesPage from './pages/PropertiesPage';
import RegisterPage from './pages/RegisterPage';
import RoomsPage from './pages/RoomsPage';
import ServicesPage from './pages/ServicesPage';
import UserManagementPage from './pages/UserManagementPage';

function App() {
  return (
    <Router>
      <Layout>
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 bg-gray-100 overflow-auto">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/users" element={<UserManagementPage />} />
              <Route path="/properties" element={<PropertiesPage />} />
              <Route path="/rooms" element={<RoomsPage />} />
              <Route path="/customers" element={<CustomersPage />} />
              <Route path="/customers/:id" element={<CustomerDetailPage />} />
              <Route path="/contracts" element={<ContractsPage />} />
              <Route path="/contracts/:id" element={<ContractDetailPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/invoices" element={<InvoicesPage />} />
              <Route path="*" element={<LoginPage />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </Layout>
    </Router>
  );
}

export default App;

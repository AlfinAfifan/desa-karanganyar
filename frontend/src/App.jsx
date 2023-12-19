import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginPage from './pages/loginPage';
import DashboardPage from './pages/dashboardPage';
import SuratMasukPage from './pages/suratMasukPage';
import InventarisPage from './pages/inventarisPage';
import SkKadesPage from './pages/skKadesPage';
import PeraturanPage from './pages/peraturanPage';
import KodeSuratPage from './pages/kodeSuratPage';
import SuratKeluarPage from './pages/suratKeluarPage';
import NavigationLayout from './components/Layouts/NavigationLayout';
import NotFoundPage from './pages/notFoundPage';
import PerundangKepPage from './pages/perundangKepPage';
import PerundangPerPage from './pages/perundangPerPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer autoClose={3000} />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route
            element={
              <PrivateRoute>
                <NavigationLayout />
              </PrivateRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/suratmasuk" element={<SuratMasukPage />} />
            <Route path="/suratkeluar" element={<SuratKeluarPage />} />
            <Route path="/inventaris" element={<InventarisPage />} />
            <Route path="/keputusan" element={<SkKadesPage />} />
            <Route path="/perundangkep" element={<PerundangKepPage />} />
            <Route path="/peraturan" element={<PeraturanPage />} />
            <Route path="/perundangper" element={<PerundangPerPage />} />
            <Route path="/kodesurat" element={<KodeSuratPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

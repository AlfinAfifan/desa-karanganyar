import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route element={<NavigationLayout />}>
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
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

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import LoginPage from './pages/LoginPage';
import SuratMasukPage from './pages/suratMasukPage';
import InventarisPage from './pages/inventarisPage';
import SkKadesPage from './pages/skKadesPage';
import PeraturanPage from './pages/peraturanPage';
import KodeSuratPage from './pages/kodeSuratPage';
import SuratKeluarPage from './pages/suratKeluarPage';
import store from './redux/store';

const router = createBrowserRouter([
  { path: '/', element: <LoginPage /> },
  // { path: '/dashboard', element: <SuratMasuk /> },
  { path: '/dashboard/suratmasuk', element: <SuratMasukPage /> },
  { path: '/dashboard/suratkeluar', element: <SuratKeluarPage /> },
  { path: '/dashboard/inventaris', element: <InventarisPage /> },
  { path: '/dashboard/keputusan', element: <SkKadesPage /> },
  { path: '/dashboard/peraturan', element: <PeraturanPage /> },
  { path: '/dashboard/kode', element: <KodeSuratPage /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

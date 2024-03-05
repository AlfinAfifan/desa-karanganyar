import { combineReducers } from '@reduxjs/toolkit';
import { inventarisReducer } from './actions/inventaris/inventarisSlice';
import { keputusanReducer } from './actions/keputusan/keputusanSlice';
import { suratMasukReducer } from './actions/suratMasuk/suratMasukSlice';
import { suratKeluarReducer } from './actions/suratKeluar/suratKeluarSlice';
import { kodeSuratReducer } from './actions/kodeSurat/kodeSuratSlice';
import { peraturanReducer } from './actions/peraturan/peraturanSlice';
import { perundanganPerReducer } from './actions/perundanganPeraturan/perundanganPerSlice';
import { perundanganKepReducer } from './actions/perundanganKeputusan/perundanganKepSlice';
import { loginReducer } from './actions/auth/loginSlice';

const reducer = combineReducers({
  suratMasuk: suratMasukReducer,
  suratKeluar: suratKeluarReducer,
  kodeSurat: kodeSuratReducer,
  inventaris: inventarisReducer,
  keputusan: keputusanReducer,
  peraturan: peraturanReducer,
  perundanganPer: perundanganPerReducer,
  perundanganKep: perundanganKepReducer,
  login: loginReducer
});
export default reducer;

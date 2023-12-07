import React, { useEffect, useRef } from 'react';
import Card from '../../Elements/Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import { getSuratMasuk } from '../../../redux/actions/suratMasuk/thunkSuratMasuk';
import { countDataByMonth } from '../Chart/FilterMonth';

const CardDashboard = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.suratMasuk.data);
  // const dataFilter = countDataByMonth(data);

  useEffect(() => {
    dispatch(getSuratMasuk());
  }, []);

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="text-xl font-medium roboto flex items-center gap-3">Dashboard</div>
        <div className="form-control">
          <input onChange={(e) => handleSearch(e.target.value)} type="text" placeholder="Search" className="input border-2 border-slate-600 w-24 md:w-auto h-9" />
        </div>
      </div>
      <div className="bg-slate-200 w-full h-0.5 mt-5 rounded-full"></div>

      <div className="flex flex-col gap-12 mt-7">
        <div className="flex gap-10">
          <Card>Surat Masuk</Card>
          <Card />
          <Card />
        </div>
        <div className="flex gap-10">
          <Card>Surat Masuk</Card>
          <Card />
          <Card />
        </div>
      </div>
    </>
  );
};

export default CardDashboard;

import Ilustrasi from '../../../assets/img/ilustrasi.png';
import { Link } from 'react-router-dom';

const CardDashboard = () => {
  return (
    <div className="flex w-[90%] mx-auto">
      <div className="flex flex-col w-[50%] justify-center mb-10">
        <div className="text-4xl font-bold text-cyan-600 mt-3 text-justify leading-snug">Aplikasi Administrasi Desa Karanganyar</div>
        <p className="mt-7 text-justify">Dengan adanya aplikasi sistem administrasi ini diharapkan bisa mempermudah dalam pengelolaan data, meningkatkan efisiensi serta transparansi dalam tata kelola administrasi desa.</p>
        <Link to="/suratmasuk" className="mt-16 py-3 px-3 w-36 text-center rounded-full font-medium bg-cyan-600 hover:bg-cyan-700 text-white">
          Mulai Aplikasi
        </Link>
      </div>
      <img src={Ilustrasi} alt="ilustrasi" className="h-[450px] my-10 mx-auto" />
    </div>
  );
};

export default CardDashboard;

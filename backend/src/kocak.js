import express from 'express';
import FileUpload from 'express-fileupload';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import suratMasukRoute from './routes/suratMasukRoute.js';
import suratKeluarRoute from './routes/suratKeluarRoute.js';
import usersRoute from './routes/usersRoute.js';
import inventarisRoute from './routes/inventarisRoute.js';
import keputusanRoute from './routes/keputusanRoute.js';
import peraturanRoute from './routes/peraturanRoute.js';
import kodeSuratRoute from './routes/kodeSuratRoute.js';
import perundanganKepRoute from './routes/perundanganKepRoute.js';
import perundanganPerRoute from './routes/perundanganPerRoute.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5174', 'http://localhost:5173'],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(FileUpload());
app.use(express.static('public'));

// USERS
app.use(usersRoute);
// SURAT MASUK
app.use(suratMasukRoute);
app.use(suratKeluarRoute);
app.use(inventarisRoute);
app.use(keputusanRoute);
app.use(peraturanRoute);
app.use(kodeSuratRoute);
app.use(perundanganKepRoute);
app.use(perundanganPerRoute);

app.listen(PORT, () => console.log(`the server is running on port ${PORT}....`));

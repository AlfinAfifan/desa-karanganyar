const express = require('express');
const FileUpload = require('express-fileupload');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const suratMasukRoute = require('./routes/suratMasukRoute.js');
const suratKeluarRoute = require('./routes/suratKeluarRoute.js');
const usersRoute = require('./routes/usersRoute.js');
const inventarisRoute = require('./routes/inventarisRoute.js');
const keputusanRoute = require('./routes/keputusanRoute.js');
const peraturanRoute = require('./routes/peraturanRoute.js');
const kodeSuratRoute = require('./routes/kodeSuratRoute.js');
const perundanganKepRoute = require('./routes/perundanganKepRoute.js');
const perundanganPerRoute = require('./routes/perundanganPerRoute.js');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5174', 'http://localhost:5173'],
  })
);

// app.use(
//   cors({
//     credentials: true,
//     origin: ['https://manajemenkaranganyar.com'],
//   })
// );

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

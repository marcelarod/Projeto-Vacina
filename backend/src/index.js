const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes/index');

const PORT = process.env.PORT;
const Auth = require('./middlewares/auth')

const authRoutes = require('./routes/authenticate.routes')
const authReset = require('./routes/reset.routes')
const authRegister = require('./routes/register.routes')


// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//cors
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

// serviço health check
app.get("/", (req, res) => {
  return res.status(200).json({ message: "ok :) " })
});
// // autenticação
app.use('/', authRoutes)
app.use('/', authReset)
app.use('/', authRegister)
app.use(Auth)

//rotas
app.use(routes)

// Inicia o serviço
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}! ✔`);
});
const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes/index');

const PORT = process.env.PORT;

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//cors
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

// serviço health check
app.get("/", (req, res) => {
  return res.status(200).json({ message: "ok :) " })
});

//rotas
app.use(routes)

// Inicia o serviço
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}! ✔`);
});
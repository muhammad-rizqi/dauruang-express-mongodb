const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { DB_URL } = require("./config");

const app = express();
const checkAuth = require("./api/middleware/check-auth");

// mongoose
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("DB Connected!");
  })
  .catch((err) => {
    console.log(Error, err.message);
  });

//middleware
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE,GET");
    return res.status(200).json({});
  }
  next();
});

// routes
const authRoutes = require("./api/routes/auth");
const userRoutes = require("./api/routes/users");
const sampahRoutes = require("./api/routes/sampah");
const jemputRoutes = require("./api/routes/jemput");
const setorRoutes = require("./api/routes/setor");
const saldoRoutes = require("./api/routes/saldo");
const jualRoutes = require("./api/routes/jual");

app.use("/api/users", checkAuth, userRoutes);
app.use("/api/sampah", checkAuth, sampahRoutes);
app.use("/api/penjemputan", checkAuth, jemputRoutes);
app.use("/api/penyetoran", checkAuth, setorRoutes);
app.use("/api/penjualan", checkAuth, jualRoutes);
app.use("/api/saldo", checkAuth, saldoRoutes);
app.use("/api", authRoutes);

// error middleware
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;

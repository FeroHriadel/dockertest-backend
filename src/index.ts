import express from "express";
import morgan from "morgan";
import cors from "cors";
import rateLimit from "express-rate-limit";
import xss from "xss-clean";
import hpp from "hpp";
import helmet from "helmet";
import "colors";
import testRoutes from "./routes/testRoutes";
import errorHandler from "./middleware/errorHandler";
import path from "path";
import dotenv from "dotenv";
dotenv.config();




//APP MIDLEWARE
const app = express();
app.use(express.json({limit: "50mb"}));
app.use(morgan("dev"));



//SECURITY MIDDLEWARE
app.use(cors()); //allow any cross origin
app.use(helmet()); //no bad headers
app.use(xss()); //no <tags> in input
const limiter = rateLimit({ //no billion calls a minute
    windowMs: 60 * 1000,
    max: 1000
  });
app.use(limiter);
app.use(hpp()); //no duplicite body & queryString values



//ROUTES routes will come here
app.use(express.static(path.join(__dirname, '../public')));
app.use("/api/test", testRoutes);



//HANDLE ERRORS (must come at the end)
app.use(errorHandler);
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});



//RUN SERVER
const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log(`Server is up on port ${port} in ${process.env.NODE_ENV} mode`.yellow);
})

process.on("unhandledRejection", (err: Error) => {
  console.log("Error!".red, err);
  console.log(`Error: ${err.message}`.red);
  // process.exit(1);
})


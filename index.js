require("dotenv").config();

import express from "express";
import cors from "cors";
import helmet from "helmet";

import Auth from "./API/Auth";

import ConnectDB from "./database/connection";


const zomato = express();


// applications middlewares
zomato.use(express.json());
zomato.use(express.urlencoded({extended: false}));
zomato.use(helmet());
zomato.use(cors());

zomato.use("/auth", Auth);
 
zomato.get("/", (req,res) => res.json({message:"Setup success"}));

const port = process.env.PORT || 4000;

zomato.listen(port, () =>
  ConnectDB()
    .then(() => console.log("Server is running 🚀"))
    .catch(() =>
      console.log("Server is running, but database connection failed... ")
   )
   );


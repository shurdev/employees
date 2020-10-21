import 'reflect-metadata';
import bodyParser from "body-parser";
import { createConnection } from 'typeorm';
import { AppRoutes } from "./routes/router";
import { Request, Response, } from "express";
const cors = require('cors')

const express = require('express');

createConnection().then(async connection => {
  const app = express();
  app.use(bodyParser.json());
  app.use(cors());

  // register all application routes
  AppRoutes.forEach

  AppRoutes.forEach(route => {
    app[route.method](route.path, (request: Request, response: Response, next: Function) => {
      route.action(request, response)
        .then(() => next)
        .catch((err: any) => next(err));
    });
  });

  app.listen(3000);

  console.log("Express application is up and running on port 3000");


}).catch(error => console.log("TypeORM connection error: ", error));

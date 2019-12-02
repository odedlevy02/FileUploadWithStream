import { Router } from "express";
import * as express from "express";
import * as request from "request"

class FilesRouter {

  router: Router;

  constructor() {
    this.router = express.Router();
    this.createRoutes();
  }

  private createRoutes() {
    this.router.post("/sendFile", this.sendFile);
  }

  
  sendFile = (req, res, next) => {
    let url = "http://localhost:3001/files/sendFile"
    req.pipe(request(url)).pipe(res)
  }
  
}

export const filesRouter = new FilesRouter().router;
//Note - add to server.ts method setRoutes:  this.app.use("/files",filesRouter);

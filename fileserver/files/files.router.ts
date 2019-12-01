import {Router} from "express";
import * as express from "express";
import * as multer from "multer"
class FilesRouter{

  router: Router;

  constructor() {
    this.router = express.Router();
    this.createRoutes();
  }

  private createRoutes() {
    var storage = multer.diskStorage({
      destination: "./uploads",
      filename: function (req, file, cb) {
        cb(null, file.originalname )
      }
    })
    var upload = multer({ storage: storage })
    this.router.post("/sendFile",upload.any(), this.sendFile);
    
  }

  sendFile=(req,res,next)=>{
    res.status(200).send({res:"Response"})
  }
}

export const filesRouter= new FilesRouter().router;
//Note - add to server.ts method setRoutes:  this.app.use("/files",filesRouter);

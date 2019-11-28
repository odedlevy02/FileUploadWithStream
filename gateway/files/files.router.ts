import {Router} from "express";
import * as express from "express";
import * as multer from "multer"
import * as request from "request"
class FilesRouter{

  router: Router;

  constructor() {
    this.router = express.Router();
    this.createRoutes();
  }

  private createRoutes() {
    //create multer memory storage and a multer upload
    let storage = multer.memoryStorage()
    let upload = multer({storage})

    this.router.post("/sendFile",upload.single("file"), this.sendFile);
  }

  sendFile=(req,res,next)=>{
    let url = "http://localhost:3001/files/sendFile"
    //MOST IMPORTANT - set the buffer name before sending
    req.file.buffer.name = req.file.originalname
    //Create a formData object with same file fieldname
    let formData={[req.file.fieldname]:req.file.buffer,data:req.body.data}
    request.post({url,formData}).pipe(res)
  }
}

export const filesRouter= new FilesRouter().router;
//Note - add to server.ts method setRoutes:  this.app.use("/files",filesRouter);

import { Router } from "express";
import * as express from "express";
import * as multer from "multer"
import * as request from "request"
import * as fs from "fs";
import * as path from "path"
import * as formidable from "formidable"

class FilesRouter {

  router: Router;

  constructor() {
    this.router = express.Router();
    this.createRoutes();
  }

  private createRoutes() {
    //create multer memory storage and a multer upload
    let storage = multer.memoryStorage()
    let upload = multer({ storage })

    this.router.post("/sendFile", upload.single("file"), this.sendFile);
    this.router.post("/sendFileWithout", this.sendFileWithout);
    this.router.post("/sendFileFromFolder", this.sendFileFromFolder);
  }

  sendFile = (req, res, next) => {
    let url = "http://localhost:3001/files/sendFile"
    //MOST IMPORTANT - set the buffer name before sending
    req.file.buffer.name = req.file.originalname
    //Create a formData object with same file fieldname
    let formData = { [req.file.fieldname]: req.file.buffer, data: req.body.data }
    request.post({ url, formData }).pipe(res)
  }

  sendFileWithout = (req, res, next) => {
    var form = new formidable.IncomingForm()
    form.onPart = function (part) {
      if (part.filename) {
        // let formidable handle all non-file parts
        let url = "http://localhost:3001/files/sendFile"
        let formData = { file: part, data: "{}" }
        request.post({ url, formData }).pipe(res)
        return;
      }
    }
    // form.on('fileBegin', function(name, file) {
    //   console.log("file begin")
    //   let fileStream = fs.createReadStream(file.path,{ highWaterMark: 1024000})
    //   let url = "http://localhost:3001/files/sendFile"
    //   let formData={file:fileStream,data:"{}"}
    //   request.post({url,formData}).pipe(res)
    // });
    form.on('progress', function (bytesReceived, bytesExpected) {
      console.log(`bytesReceived: ${bytesReceived}, bytesExpected: ${bytesExpected}`)
    });
    form.on('end', function () {
      //res.status(200).send({res:"completed"})
    });
    form.on('error', function (err) {
      res.status(500).send({ message: err.message })
    });

    form.parse(req)

  }

  sendFileFromFolder = (req, res, next) => {
    //let fullPath = path.join(__dirname,"../../inputs/file1.jpg")
    let fullPath = path.join(__dirname, "../../inputs/file2.zip")
    let fileStream = fs.createReadStream(fullPath, { highWaterMark: 1024000 })
    let url = "http://localhost:3001/files/sendFile"
    //fileStream.name = req.file.originalname
    //Create a formData object with same file fieldname
    let formData = { file: fileStream, data: "{}" }
    //let formData2={file:{value:fileStream,options:{filename:"filename"}},data:"{}"}
    request.post({ url, formData }).pipe(res)
  }
}

export const filesRouter = new FilesRouter().router;
//Note - add to server.ts method setRoutes:  this.app.use("/files",filesRouter);

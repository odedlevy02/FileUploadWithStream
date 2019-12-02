# File Upload with Streaming
This is a sample project that shows how to forward a stream of file or files between services without needing to save the file in each service that is forwarding it.

The project contains 2 services:
1. Gateway - this is the main service that needs to forward the files to the files server
2. FilesServer - this is the service that should save the file

This FilesServer is based on multer for saving the files to disk
The Gateway will stream the file chunk by chunk
The File server will save the file to disk

To run the code:
Gateway:
```
cd gateway
npm i
tsc
```
File server:
```
cd fileserver
npm i
tsc
```
If you are using vscode just select 'run-all' to debug

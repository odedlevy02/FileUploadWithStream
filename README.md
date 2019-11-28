# File Upload with Streaming
This is a sample project that shows how to forward a stream of file or files between services without needing to save the file in each service that is forwarding it.

The project contains 2 services:
1. Gateway - this is the main service that needs to forward the files to the files server
2. FilesServer - this is the service that should save the file

This project is based on multer for doing the heavy loading of working with files
The Gateway will stream the file in memory
The File server will save the file to disk

The important thing to note is in the gateway and the creation of the formData object.
After mapping  the buffer in to the formData you are required to set the name of the buffer. 
Without this the file will not be passed on


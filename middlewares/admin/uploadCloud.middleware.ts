import { Request, Response, NextFunction } from "express";
import { streamUpload } from "../../helpers/streamUpload.helper";

export const uploadSingle = (req: Request, res: Response, next: NextFunction) => {

    if(req["file"]){

        const uploadToCloudinary = async (buffer) => {
            const result = await streamUpload(buffer);
            req.body[req["file"].fieldname] = result["url"];
            next();
        };

        uploadToCloudinary(req["file"].buffer);
    }
    else{
        next();
    }
}
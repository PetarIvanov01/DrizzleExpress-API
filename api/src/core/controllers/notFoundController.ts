import { Request, Response } from "express";
import path from "path";

const allowedExtensions = [".js", ".css", ".png", ".jpg", ".jpeg", ".ico"];

const notFoundController = (req: Request, res: Response) => {
  if (allowedExtensions.filter((ext) => req.url.indexOf(ext) > 0).length > 0) {
    res.sendFile(path.resolve(`public/${req.url}`));
  } else {
    res.sendFile(path.resolve("public/index.html"));
  }
};

export default notFoundController;

import { Request, Response } from "express";

export default function responseHandler(req: Request, res: Response) {
  let response = res.locals.data || { status: "OK" };
  res.status(res.locals.status || 200).send(response);
}

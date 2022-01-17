import { Request, Response } from "express";
import url from "./url.models";

export async function shortenURL(req: Request, res: Response, next: Function) {
  let { urltoshorten } = req.body;
  if (!urltoshorten.includes("://")) urltoshorten = "http://" + urltoshorten;
  try {
    let maxindex = await url
      .find({})
      .sort({ index: -1 })
      .limit(1)
      .then((res) => res[0].index);

    const newurl = new url({
      url: urltoshorten,
      index: maxindex + 1,
    });

    await newurl.save();
    res.locals.data = { url: `${process.env.ENDPOINT}/shorty/${newurl.index}` };
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: "something went wrong" });
  }
  return next();
}

export async function redirectURL(req: Request, res: Response) {
  try {
    const { ind } = req.params;
    const redirectTo = await url.findOne({ index: ind }).then((res) => res.url);
    res.redirect(redirectTo);
  } catch (e) {
    res.status(400).send({ message: "something went wrong" });
  }
}

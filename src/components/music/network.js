import { Router } from "express";
import * as Controller from "./controller";
const songRouter = Router();

songRouter.route("/").get(Controller.findAll);
songRouter.route("/:id").get(Controller.findById);
songRouter.route("/").post(Controller.create)

export default songRouter;
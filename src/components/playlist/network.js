import { Router } from "express";
import * as Controller from "./controller";
const playListRouter = Router();

playListRouter.route("/").get(Controller.findAll);
playListRouter.route("/:id").get(Controller.findById);
playListRouter.route("/").post(Controller.create)

export default playListRouter;
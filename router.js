import { Router } from "express";
import WatchsController from "./WatchsController.js";

const router = new Router();

router.get("/watchs", WatchsController.getWatchs);
router.post("/addwatch", WatchsController.addWatch);
router.put("/putwatch/:id", WatchsController.putWatchs); 
router.delete("/deletewatch/:id", WatchsController.deleteWatchs);
router.patch("/patchwatch/:id", WatchsController.patchWatchs);

export default router;

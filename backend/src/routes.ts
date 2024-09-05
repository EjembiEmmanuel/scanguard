import { Router } from "express";
import { submitProduct } from "./product";

const router = Router();

router.post("/submit", submitProduct);

export default router;

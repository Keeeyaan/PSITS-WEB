import { Router } from "express";
const router = Router();
import {
  getMerchandise,
  createMerchandiseItem,
  updateMerchandiseItemById,
  deleteMerchandiseItemById
} from "../controllers/merchandiseController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import {
  validateMerchandiseItem,
  validateMerchandiseItemRevision,
  validateMerchandiseItemDeletion
} from "../middlewares/validations/merchandiseValidation.js";

router.route("/").get(getMerchandise).post(authenticateUser, validateMerchandiseItem, createMerchandiseItem);

router
  .route("/:merchandiseItemId")
  .patch(authenticateUser, validateMerchandiseItemRevision, updateMerchandiseItemById)
  .delete(authenticateUser, validateMerchandiseItemDeletion, deleteMerchandiseItemById);

export default router;

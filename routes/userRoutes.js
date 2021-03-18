/* USER ROUTER */
import express from "express";
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// router.route("/").post(registerUser).get(protect, getUsers);
router.route("/").get(authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, deleteUser)
  .get(protect, getUserById)
  .put(protect, updateUser);

// import express from "express";
// import {
//   authUser,
//   registerUser,
//   getUserProfile,
//   updateUserProfile,
//   getUsers,
//   deleteUser,
//   getUserById,
//   updateUser,
// } from "../controllers/userController.js";
// import { protect, isAdmin } from "../middleware/authMiddleware.js";

// router.route('/').post(registerUser).get(protect, isAdmin, getUsers);
// router.post('/login', authUser);
// router
//   .route('/profile')
//   .get(protect, getUserProfile)
//   .put(protect, updateUserProfile);
// router
//   .route('/:id')
//   .delete(protect, isAdmin, deleteUser)
//   .get(protect, isAdmin, getUserById)
//   .put(protect, isAdmin, updateUser);

export default router;

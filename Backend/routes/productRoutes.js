import { Router } from "express";
import { createProduct, deleteProduct, fetchSingleProduct, getAllProducts, getProductsByCategory, updateProduct } from "../controllers/productController.js";
import {multer, storage, fileFilter} from "../middleware/multerMiddleware.js"
import errorHandle from "../services/errorHandler.js";
import { isAuthenticated, restrictTo, Role } from "../middleware/authMiddleware.js";

const upload=multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});
const router=Router();

// Multer error handler middleware
const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ message: 'File too large. Maximum size is 5MB.' });
        }
        return res.status(400).json({ message: err.message });
    }
    if (err) {
        return res.status(400).json({ message: err.message });
    }
    next();
};

router.route("/create").post(
    isAuthenticated, 
    restrictTo(Role.Admin), 
    upload.single('image'), 
    handleMulterError,
    errorHandle(createProduct)
)

router.route("/getAll").get(errorHandle(getAllProducts))
router.route("/singleProduct/:id").get(errorHandle(fetchSingleProduct))
router.route("/category/:category").get(errorHandle(getProductsByCategory))
router.route("/update/:id").patch(isAuthenticated, restrictTo(Role.Admin),upload.single('image'), errorHandle(updateProduct))
router.route("/delete/:id").delete(isAuthenticated, restrictTo(Role.Admin), errorHandle(deleteProduct))

export default router;




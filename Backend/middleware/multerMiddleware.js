import multer from "multer";

const storage= multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, "./storage")
    },
    filename : function(req, file, cb){
        cb(null, Date.now()+ "-" + file.originalname)
    }
})

// File filter for multer
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPG, JPEG, PNG, and WEBP are allowed.'), false);
    }
};

export {multer, storage, fileFilter}

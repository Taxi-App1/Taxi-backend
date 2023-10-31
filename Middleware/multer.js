import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

function uploadImage(req, res, next) {
    upload.single("image")(req, res, (err) => {
        if (err) {
            return next(err);
        }
        if (!req.file) {
            console.log("No image provided. Skipping image upload.");
            return next();
        }
        req.body.image = req.file.path;
        next();
    });
}


const image = { uploadImage };

export default image;
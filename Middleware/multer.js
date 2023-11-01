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

function uploadImageAndPicId(req, res, next) {
    // Use upload.fields to handle multiple file fields
    upload.fields([
        { name: "image", maxCount: 1 },
        { name: "picture_id", maxCount: 1 },
    ])(req, res, (err) => {
        if (err) {
            return next(err);
        }

        // Check if "image" and "picture_id" files were uploaded
        if (!req.files || !req.files["image"] || !req.files["picture_id"]) {
            console.log("One or both files not provided. Skipping upload.");
            return next();
        }

        req.body.image = req.files["image"][0].path;
        req.body.picture_id = req.files["picture_id"][0].path;
        next();
    });
}

const image = { uploadImage, uploadImageAndPicId };

export default image;

import express from "express";
const router = express.Router();
import multer from "multer";

const base = "https:/10.10.248.175/";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/')
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.')
            .filter(Boolean) // removes empty extensions (e.g. `filename...txt`)
            .slice(1)
            .join('.')
        cb(null, Date.now() + "." + ext)
    }
})
const upload = multer({ storage: storage });

router.post('/', upload.single("file"), function (req, res) {
    // Check if req.file is defined before accessing its properties
    if (req.file) {
        console.log("router.post(/file: " + base + req.file.path)
        res.status(200).send({ url: + req.file.path })
    } else {
        // Handle the case when no file is uploaded
        res.status(400).send({ error: 'No file uploaded' });
    }
});

export default router;

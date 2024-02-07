"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const multer_1 = __importDefault(require("multer"));
const base = "http://localhost:3003/";
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/');
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.')
            .filter(Boolean) // removes empty extensions (e.g. `filename...txt`)
            .slice(1)
            .join('.');
        cb(null, Date.now() + "." + ext);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
router.post('/', upload.single("file"), function (req, res) {
    // Check if req.file is defined before accessing its properties
    if (req.file) {
        console.log("router.post(/file: " + base + req.file.path);
        res.status(200).send({ url: base + req.file.path });
    }
    else {
        // Handle the case when no file is uploaded
        res.status(400).send({ error: 'No file uploaded' });
    }
});
exports.default = router;
//# sourceMappingURL=file_router.js.map
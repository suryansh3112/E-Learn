const express = require('express');
const router = express.Router();

const multer = require('multer');

const  auth  = require("../middleware/auth");

var imgStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/img')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})

var uploadImg = multer({ storage: imgStorage }).single("file")



var vidStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/vid')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4' || ext !== '.mkv') {
            return cb(res.status(400).end('only mp4, mkv are allowed'), false);
        }
        cb(null, true)
    }
})

var uploadVid = multer({ storage: vidStorage }).single("file")

var fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/files')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.pdf' || ext !== '.docx') {
            return cb(res.status(400).end('only pdf, docx are allowed'), false);
        }
        cb(null, true)
    }
})

var uploadFile = multer({ storage: fileStorage }).single("file")



//=================================
//             Product
//=================================

router.post("/uploadImage",(req, res) => {

    uploadImg(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    })

});

router.post("/uploadVideo",(req, res) => {

    uploadVid(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, video: res.req.file.path, fileName: res.req.file.filename })
    })

});

router.post("/uploadFile",(req, res) => {

    uploadFile(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, file: res.req.file.path, fileName: res.req.file.filename })
    })

});

module.exports = router;
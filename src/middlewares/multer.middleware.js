import express from "express"
import multer from "multer"
import fs from "fs"
import path from "path"

const app = express()

const uploadDir = "./public/temp"
fs.mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, unique + path.extname(file.originalname))
  },
})

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
})

// single file
app.post("/profile", upload.single("avatar"), (req, res) => {
  // req.file -> the avatar file, req.body -> text fields
  res.json({ file: req.file })
})

// multiple files, same field
app.post("/photos/upload", upload.array("photos", 12), (req, res) => {
  res.json({ files: req.files })
})

// multiple fields
const uploadMiddleware = upload.fields([
  { name: "avatar", maxCount: 1 },
  { name: "gallery", maxCount: 8 },
])
app.post("/cool-profile", uploadMiddleware, (req, res) => {
  // req.files.avatar[0], req.files.gallery
  res.json({ files: req.files })
})

// error handler for multer errors (file too large, etc.)
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message })
  }
  next(err)
})

app.listen(3000, () => console.log("Server running on port 3000"))
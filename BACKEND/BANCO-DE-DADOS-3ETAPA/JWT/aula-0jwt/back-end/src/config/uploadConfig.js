const multer = require('multer'); 
const path = require('path'); 
const fs = require('fs')

const uploadDir = 'uploads'; 
if (!fs.existsSync(uploadDir)){ fs.mkdirSync(uploadDir); 
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {},
  filename: function (req, file, cb) { 
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); 
    cb(null, uniqueSuffix + path.extname(file.originalname)); 
  }
});

const filtroDeImagem = (req, file, cb) => {
  const formatosPermitidos = /jpeg|jpg|png|webp/

  const extencaoValida = formatosPermitidos.test(path.extname(file.originalname.toLowerCase()))
  const mimeValido = formatosPermitidos.test(file.mimeType)

  if (extencaoValida && mimeValido) {
    cb(null, true)
  } else {
    cb(new Error('Apenas imagens (JPG, JPEG, PNG ou WEBP) são permitidas!'), false)
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: filtroDeImagem
})

module.exports = upload
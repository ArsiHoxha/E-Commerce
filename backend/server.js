const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const ProducMain = require("./ProductMain");
const multer = require("multer");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

const fs = require("fs");

app.use("/uploads", express.static("uploads"));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const Clothes = require("./Clothes");
const User = require("./UserCreation");
const Admin = require("./Admin");

mongoose
  .connect(
    "Your Mongodb code"
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (file.mimetype.startsWith("image/")) {
        cb(null, "uploads/");
      } else {
        cb(new Error("Invalid file type"));
      }
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + uuidv4();
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });
  
  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  };
    
const upload = multer({ storage: storage, fileFilter: fileFilter });

app.post("/register", async (req, res) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    console.log(req.body);
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        userEmail: user.email,
        userFirstName: user.firstName,
        userLastName: user.lastName,
      },
      "ARSI123",
      { expiresIn: "1min" }
    );

    return res.status(200).json({ token, message: "Login successful" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/adminLogin", async (req, res) => {
  const admin = await Admin.find({})
  console.log("Admin", admin[0].email, admin[0].password);
  
})


app.post("/adminData", async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.find({})
  console.log("Admin", admin);

  if (email == admin[0].email && password == admin[0].password) {
    const token = jwt.sign(
      {
        userId: admin[0].userId,
        userEmail: admin[0].email,
      },
      "ARSI123",
      { expiresIn: "10min" }
    );

    return res.status(200).json({ token, message: "Admin Logged in  successful" });
  }
  
})

const authenticateUser = (req, res, next) => {
  const token = req.header("authorization");
  const dataUserit = req.header("email");
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  jwt.verify(token, "ARSI123", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token." });
    } else {
      console.log("VERIFIKUA");
    }

    req.user = decoded;
    next();
  });
};

const authenticateAdmin = (req, res, next) => {
  const token = req.header("authorization");
  const dataUserit = req.header("email");
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  jwt.verify(token, "ARSI123", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token." });
    } else {
      console.log("VERIFIKUA");
    }

    req.user = decoded;
    next();
  });
};
app.post(
  "/uploadPosts",
  upload.array("file", 10),
  authenticateAdmin,
  async (req, res) => {
    try {
      console.log("Request body:", req.body);
      console.log("Uploaded files:", req.files);

      const userId = req.user.userId;
      const productId = req.body.productId;
      const description = req.body.description;
      const detail = req.body.detail;
      const sizes = req.body.sizes;
      const color = req.body.color;
      const care = req.body.care;

      let user = await ProducMain.findOne({ id: productId });

      if (!user) {
        console.log("User not found");

        user = new ProducMain({
          id: productId,
          idPergjithshme: userId,
          images: [],
        });
      }

      // Store filenames already present in the user's images array
      const existingFilenames = new Set(user.images.map(img => img.filename));

      // Store filenames of files processed in this request
      const newFilenames = new Set();

      for (const file of req.files) {
        if (file.mimetype.startsWith("image/")) {
          // Check if the image already exists in the existing images or the current batch
          if (!existingFilenames.has(file.filename) && !newFilenames.has(file.filename)) {
            user.detail = detail;
            user.descriptionTxt = description;
            user.sizes = sizes;
            user.color = color;
            user.care = care;

            user.images.push({
              Tipi: "image",
              filename: file.filename,
              path: file.path,
            });

            // Add the filename to the newFilenames set
            newFilenames.add(file.filename);
          } else {
            console.log("Image already exists:", file.filename);
          }
        } else {
          console.log("Unknown file type:", file.mimetype);
        }
      }

      await user.save();
      console.log("User saved:", user);
      res.status(200).json({
        message: "Media uploaded and added to user's media.",
        user: user,
      });
    } catch (error) {
      console.error("Error uploading media:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);


app.post(
  "/uploadProduct",
  upload.single("file"),
  authenticateAdmin,
  async (req, res) => {
    try {
      const userId = req.user.userEmail;
      console.log('W',userId);
      let user = await ProducMain.findOne({ id: userId });
      let randomBytes = crypto.randomBytes(10).toString("hex");
      console.log(req.body)
      if (!user) {
        console.log("User not found");
        console.log(user)
        user = new ProducMain({
          id: userId + randomBytes,
          productImg: req.file.filename,
          productNameTxt: req.body.productName,
          priceTxt: req.body.textPrice,
          gender: req.body.gender,
          typeTxt:req.body.typeTxt,
          idPergjithshme: userId,
        });

        await user.save();
        console.log(user);
        res.status(200).json({
          message: "Image uploaded and added to user's images.",
          postImage: user.productImg,
          postPrice: user.priceTxt,
          postProductName: user.productNameTxt,
          descriptionTxts: user.descriptionTxt,
          typeTxt: user.type,
        });
      } else {
        res.status(200).json({
          message: "Image uploaded and added to user's images.",
          postImage: user.productImg,
          postPrice: user.priceTxt,
          postProductName: user.productNameTxt,
          descriptionTxt: user.descriptionTxt,
        });
      }
    } catch (error) {
      console.error("Error uploading post:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

app.post("/deleteProduct", authenticateAdmin, async (req, res) => {
  const productId = req.body.productId;
  console.log(productId);
  try {
    // Find the product by ID
    const product = await ProducMain.findOne({ id: productId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    // Remove the product from the database
    await ProducMain.deleteOne({ id: productId });
    fs.unlinkSync(`uploads/${product.productImg}`);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/admin", authenticateAdmin, (req, res) => {
  res.json({
    message: "Access to protected route granted.",
    user: req.user,
  });
});

app.get("/adminPosts", async (req, res) => {
  try {
    const getUsers = await ProducMain.find({});
    res.json(getUsers);
  } catch (err) {
    console.log("THERE WAS AN ERROR GET DATA FROM USER", err);
  }
});

app.get("/adminManPosts", async (req, res) => {
  try {
    const users = await ProducMain.find({ gender: { $regex: 'Male', $options: 'i' } });
    res.json(users);
  } catch (err) {
    console.log("THERE WAS AN ERROR GET DATA FROM USER", err);
  }
});


app.post('/products', authenticateUser, async (req, res) => {
  console.log(req.body)
  res.json('U verified')
});


app.post('/detailedPageStore',async (req, res) => {
  try {
    const productId = req.body.productId;
    console.log(productId);
    const product = await ProducMain.findOne({ id: productId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})

app.post('/postType',async(req,res)=>{
  try{
    const type = req.body.type;
    console.log(type);
    const product = await ProducMain.find({typeTxt: type });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    console.log(product);    
    res.json(product);
  }catch(err){
    console.log(err);
  }
    
})
app.get('/man',async(req,res)=>{
  try{
    const product = await ProducMain.find({gender: 'Male' });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    console.log(product);    
    res.json(product);
  }catch(err){
    console.log(err);
  }
    
})

app.get('/female',async(req,res)=>{
  try{
    const product = await ProducMain.find({gender: 'Female' });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    console.log(product);    
    res.json(product);
  }catch(err){
    console.log(err);
  }
    
})

app.get('/kids',async(req,res)=>{
  try{
    const product = await ProducMain.find({gender: 'Kids' });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    console.log(product);    
    res.json(product);
  }catch(err){
    console.log(err);
  }

})

app.get('/searchPosts', async (req, res) => {
  const query = req.query.query;
  console.log(`Search query: ${query}`);
  try {
    const posts = await ProducMain.find({ 
      productNameTxt: { $regex: query, $options: 'i' }
    });
    console.log(posts)
    res.json(posts);
  } catch (err) {
    console.error("Error searching posts:", err);
    res.status(500).json({ error: 'Error searching posts' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

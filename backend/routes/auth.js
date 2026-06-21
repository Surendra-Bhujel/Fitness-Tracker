const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const User = require('../models/User');
const Workout = require('../models/Workout');
const auth = require('../middleware/authMiddleware')

const uploadDir = path.join(__dirname, '../uploads/avatars');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) return cb(null, true);
    cb(new Error('Only images (jpg, jpeg, png, webp) are allowed'));
  }
});

//Post /api/auth/register - Register new User
router.post('/register', async (req, res)=>{
    try{
        const {name, email, password} = req.body;


        // check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        // Hash password 
        const hashPassword = await bcrypt.hash(password, 10);

        //Create new user 
        const user = new User({
            name, 
            email,
            password: hashPassword
        });

        await user.save();

        // Create JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d'}
        );

        res.status(201).json({
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch(error){
        res.status(500).json({
            message: 'Server error', 
            error: error.message
        });
    }
});


// Post /api/auth/login - Login and receive JWT token   
router.post('/login', async (req, res)=>{
    try{
        const {email, password} = req.body;

        // Check if user exists
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message: 'Inavalid credentials'
            });
        }

        // Check password
        const isMatch =  await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        }

        // Create JWT token
        const token = jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        );

        res.json({
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch(error){
        res.status(500).json({
            message: 'Server error', 
            error: error.message
        });
    }
});


// GET /api/auth/me - Get the current user profile
router.get('/me', auth, async (req, res)=>{
    try{
        const user = await User.findById(req.user).select('-password');
        if(!user){
            return res.status(404).json({
                message: 'User not found'
            });
        }
        res.json(user);
    }catch(error){
        res.status(500).json({
            message: 'Server error'
        });
    }
});



// PUT /api/auth/profile - Update user profile
router.put('/profile', auth, async (req, res)=>{
    try{
        const { name, email } = req.body;
        const user = await User.findById(req.user);

        if(!user){
            return res.status(404).json({
                message: 'User not found'
            });
        }

        // Check if email is already taken by another user 
        if(email && email !== user.email){
            const existingUser = await User.findOne({email});

            if(existingUser){
                return res.status(400).json({
                    message: 'Email already in use'
                });
            }
        }

        user.name = name || user.name;
        user.email = email || user.email;
        await user.save();

        res.json({
            id: user._id,
            name: user.name,
            email: user.email
        });
    }catch(error){
        res.status(500).json({
            message: 'Server error'
        });
    }
});


// PUT /api/auth/change-password -  Change Password
router.put('/change-password', auth, async (req, res)=>{
    try{
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user);

        if(!user){
            return res.status(404).json({
                message: 'User not found'
            });
        }

        // Verify current password 
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if(!isMatch){
            return res.status(400).json({
                message: 'Current password is incorrect'
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.json({
            message: 'Password updated successfully'
        })
    }catch(error){
        res.status(500).json({
            message: 'Server error'
        });
    }
});


// Delete /api/auth/account - Delete account
router.delete('/account', auth, async (req, res)=>{
    try{
        const user = await User.findById(req.user);
        if(!user){
            return res.status(404).json({
                message: 'User not found'
            });
        }

        // Delet user and all there workouts

        await Workout.deleteMany({user: req.user});
        await User.findByIdAndDelete(req.user);

        res.json({
            message: 'Account Deleted successfully'
        });
    }catch(error){
        res.status(500).json({
            message: 'Server error'
        });
    }
});


// PUT /api/auth/profile/avatar - Upload Profile Picture
router.put('/profile/avatar', auth, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.avatar = `/uploads/avatars/${req.file.filename}`;
    await user.save();

    res.json({
      message: 'Profile picture updated successfully',
      avatar: user.avatar
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
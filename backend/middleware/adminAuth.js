const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const adminAuth = async (req, res, next) => {
    try {

        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                message: 'Access denied'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const admin = await Admin.findById(decoded.adminId);

        if (!admin) {
            return res.status(401).json({
                message: 'Admin not found'
            });
        }

        req.admin = admin;

        next();

    } catch (error) {

        return res.status(401).json({
            message: 'Invalid token'
        });

    }
};

const checkPermission = (permission) => {

    return (req, res, next) => {

        if (
            req.admin.permissions.includes(permission) ||
            req.admin.role === 'super_admin'
        ) {
            next();
        } else {

            return res.status(403).json({
                message: 'Insufficient permissions'
            });

        }

    };

};

module.exports = {
    adminAuth,
    checkPermission
};
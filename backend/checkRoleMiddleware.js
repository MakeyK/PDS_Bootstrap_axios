const jwt = require('jsonwebtoken');
const { Response, NextFunction } = require('express');

const secret_key = process.env.SECRET_KEY

module.exports = function (role) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            return next();
        }
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Для просмотра данной страницы необходимо авторизоваться' });
        }
        try {
            const decoded = jwt.verify(token, secret_key);
            console.log(decoded); 
            const userRole = decoded.role;
            if (!role.includes(userRole)  && userRole !== 'admin') {
                console.log(role);
                console.log(userRole);
                return res.status(403).json({ message: 'Нет доступа для просмотра данной страницы' });
            }
            req.user = decoded; 
            next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: 'Ошибка' });
        }
    }
}

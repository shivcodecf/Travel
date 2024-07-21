const jwt = require('jsonwebtoken');

const secret = 'ehjfbheruyf';

function generateToken(user) {
    let payload = {
        email: user.email,
        password:user.password
        // Avoid including the password in the payload for security reasons
    };
    return jwt.sign(payload, secret); // Add an expiration time to the token . it s create the token .
}


function checkToken(token) {
    try {
        return jwt.verify(token, secret);   // verify token
    } catch (err) {
        console.log('Token verification error:', err.message); // Log verification errors
        return false;
    }
}



module.exports = { generateToken, checkToken };

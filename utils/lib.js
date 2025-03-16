const jwt = require('jsonwebtoken');

const formatToWIB = (date) => {
    return new Intl.DateTimeFormat('id-ID', { 
        year: 'numeric', month: '2-digit', day: '2-digit', 
        hour: '2-digit', minute: '2-digit', second: '2-digit', 
        timeZone: 'Asia/Jakarta' 
    }).format(date);
};

const generateToken = (user) => {
    const expiresIn = 7200; // 2 hours
    const expirationTime = new Date(Date.now() + expiresIn * 1000);
    const formattedExpirationTime = formatToWIB(expirationTime);
    
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: `${expiresIn}s`,
    });

    return { token, formattedExpirationTime };
};

module.exports = { generateToken, formatToWIB };

const jwt = require('jsonwebtoken');

const formatToWIB = (date) => {
    const formatted = date.toLocaleString("id-ID", {
      timeZone: "Asia/Jakarta",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  
    return formatted.replace(/\//g, "-").replace(",", "");
};

const generateToken = (user) => {
    const expiresIn = 60;
    const expirationTime = new Date(Date.now() + expiresIn * 1000);
    const formattedExpirationTime = formatToWIB(expirationTime);
    
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: `${expiresIn}s`,
    });

    console.info("Token:", token);
    console.info("-> Exp. Time:", formattedExpirationTime);

    return token;
};

module.exports = { generateToken, formatToWIB };

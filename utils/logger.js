const pino = require("pino");
const { formatToWIB } = require("./lib");

const logger = pino({
  level: "info",
  base: null,
  timestamp: () => `,"time":"${formatToWIB(Date.now())}"`,
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      ignore: "pid,hostname",
    },
  },
});

module.exports = logger;

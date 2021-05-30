const { version } = require("../better-dni/package.json");

module.exports = {
  plugins: {
    "posthtml-expressions": {
      locals: {
        VERSION: version,
      },
    },
  },
};

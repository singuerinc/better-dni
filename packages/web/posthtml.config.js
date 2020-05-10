const { version } = require("./package.json");

module.exports = {
  plugins: {
    "posthtml-expressions": {
      locals: {
        VERSION: version
      }
    }
  }
};

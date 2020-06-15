const tailWindConfig = require.resolve('./tailwind.config.js');

module.exports = () => ({
  plugins: [
    require("tailwindcss")(tailWindConfig),
    require('postcss-nested'),
    require("autoprefixer"),
  ],
});
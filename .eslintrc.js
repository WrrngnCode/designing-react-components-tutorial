module.exports = {
  "env": {
    browser: true,
    commonjs: true,
    es6: true,
  },
  "parserOptions": {
    "ecmaVersion": "2020",
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true, //"impliedStrict": true,
    }
  },
  "plugins": ["react-hooks", "react"],
  "extends": [
    //"eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  "settings": {
    "react": {
      "version": "detect",
    },
  },
  "rules": {
    "semi": 0,// [2, "always"],
    "react-hooks/rules-of-hooks": "error",
    'react/prop-types': ['off']
  }
};
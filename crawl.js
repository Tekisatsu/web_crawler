const url = require('node:url');

function normalizeURL(oldUrl){
      const newUrl = new URL(oldUrl);
      let norm = `${newUrl.hostname}${newUrl.pathname}`;
      norm = norm.replace(/\/$/, '');
      return norm;
}

module.exports = {
      normalizeURL
}
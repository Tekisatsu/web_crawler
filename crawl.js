const url = require('node:url');
const { JSDOM } = require('jsdom')


function normalizeURL(oldUrl){
      try {
            const newUrl = new URL(oldUrl);
            let norm = `${newUrl.hostname}${newUrl.pathname}`;
            norm = norm.replace(/\/$/, '');
            return norm;
      } catch (error) {
            console.log('Invalid URL')
      }
}
function getURLfromHTML(html,rootUrl) {
const { window } = new JSDOM(html);
    const linkElements = window.document.querySelectorAll('a');
    const urls = Array.from(linkElements).map(tag => {
        return new URL(tag.getAttribute('href'), rootUrl).href;
    });
    return urls;
}


module.exports = {
      normalizeURL,
      getURLfromHTML
}
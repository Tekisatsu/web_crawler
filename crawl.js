const url = require('node:url');
const { JSDOM } = require('jsdom')

function normalizeURL(oldUrl){

      try {
            const newUrl = new URL(oldUrl);
            let norm = `${newUrl.protocol}${newUrl.hostname}${newUrl.pathname}`;
            norm = norm.replace(/\/$/, '');
            let normUrl = new URL(norm)
            return normUrl;
      } catch (error) {
            throw Error(`Failed to process: ${oldUrl.toString()}`);
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

async function crawlPage(root, currentURL, pages){
      const normRoot = normalizeURL(root)
      if (currentURL.hostname !== normRoot.hostname) {
           return pages
      }
      let normCurrent = normalizeURL(currentURL)
      if (normCurrent.toString() in pages) {
            pages[normCurrent.toString()]++
            return pages
      }
            if (normRoot.toString() === normCurrent.toString()) {
                  pages[normRoot.toString()] = 0
            } else {
                  pages[currentURL.toString()] = 1
            }
      
      try {
            function delay(timeInMillis) {
                  return new Promise(resolve => setTimeout(resolve, timeInMillis));
            }
            await delay(200); // delay
            const response = await fetch(normCurrent)
            if (!response.ok){
                  console.log(normCurrent.toString())
                  console.log(`an error: ${response.status}`)
                  return
            }
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("text/html") !== -1) {
                  await delay(200); // delay
                  let pageText = await response.text();
                  let urls = getURLfromHTML(pageText,root);
                  let normUrls = urls.map(url => normalizeURL(url));
                  let crawlMap = normUrls.map(url => crawlPage(normRoot,url,pages))
                  await Promise.all(crawlMap)
                  return pages
    }
      } catch (error) {
      console.log("Failed to fetch " + normCurrent + " due to: " + error)}
}
module.exports = {
      normalizeURL,
      getURLfromHTML,
      crawlPage
}
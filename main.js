const { crawlPage } = require('./crawl.js')
function main(){
      const argv = process.argv.slice(2);
      if (argv.length !== 1){
            console.error('invalid input. provide one valid url');
            process.exit(1);
      }
      const baseurl = new URL(argv[0])
      console.log(`crawler is starting ${baseurl}`)
      let pages = {}
      crawlPage(baseurl,baseurl,pages).then(result => {
            console.log(result);
      });
}

main()
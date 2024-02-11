function printReport(result){
      let entr = Object.entries(result);
      let sorted = entr.sort((a,b) => a[1]-b[1]);
      sorted.reverse().forEach(element => {
            console.log(`Found ${element[1]} links to ${element[0]}`)
      });
}

module.exports = {
      printReport
}
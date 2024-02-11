function main(){
      const argv = process.argv.slice(2);
      if (argv.length !== 1){
            console.error('Invalid input. Provide one valid URL');
            process.exit(1);
      }
      const baseURL = argv[0]
      console.log(`crawler is starting ${baseURL}`)
}

main()
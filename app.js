const cheerio = require('cheerio');
const request = require('request');
const readline = require('readline');
const chalk = require('chalk');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function startingPoing() {
  rl.question('Enter a Country name: ', (countryName) => {
    const a = 'https://trends24.in/' + countryName;
    validate(a);
  })
}


function validate(url) {
  //let regex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  const regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/;
  if (url.match(regex)) {
    startParsing(url);
  } else {
    rl.question(chalk.red('Enter a valid URL to crawl:'), (a) => {
      validate(a);
    })
  }
}

function startParsing(url) {
  request(url, (error, response, html) => {
    if (error) return console.log(chalk.red(error));
    const $ = cheerio.load(html);
    for (let i = 1; i <= 10; i++) {
      const str = `#trend-list > div:nth-child(1) > ol > li:nth-child(${i})>a`;
      console.log(chalk.red($(str).text()));
    }
    rest();
  })
}

function rest() {
  rl.question('Restart (y/n): ', (e) => {
    if (e === 'y' || e === 'Y') {
      startingPoing();
    } else if (e === 'n' || e === 'N') {
      console.log(chalk.red('Bye :-)'));
      rl.close();
    } else {
      rest();
    }
  })
}

startingPoing();

var gulp = require('gulp');
var figlet = require('figlet');

gulp.task('default', function (done) {
  printHeader("Gooy "+gulp.config.pkg.version);
});

function printHeader(str){
  console.log(figlet.textSync(str,{
    font: 'Ivrit',
    horizontalLayout: 'default',
    verticalLayout: 'default'
  }));
}

function printInfo(str){
  console.log(figlet.textSync(str,{
    font: 'Small',
    horizontalLayout: 'default',
    verticalLayout: 'default'
  }));
}

module.exports.printHeader = printHeader;
module.exports.printInfo = printInfo;

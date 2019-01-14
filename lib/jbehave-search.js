'use babel';

function jbehaveSearch(selection) {
  const regExp = new RegExp("@(Given|When|Then|And)(.*)");
  const dollarSignRegEx = new RegExp(/\$\w*/gi);
  const angleBracketRegEx = new RegExp(/(<.+?>)/gi);
  let options = { paths: ["**/src/**/definition/**/*.java"] };
  atom.workspace.scan(regExp, options, (scanResult) => {
    scanResult.matches.forEach(line => {
      let startIndex = line.matchText.indexOf('("')+2;
      let lastIndex = line.matchText.lastIndexOf('")');
      let test = line.matchText.substring(startIndex, lastIndex);
      test = test.replace(dollarSignRegEx, '.+');
      test = test.replace(angleBracketRegEx, '.+');
      let testRegExp = new RegExp(".+" + test);
      if (selection.search(testRegExp) != -1) {
        let options = { initialLine:line.range[0][0] };
        atom.workspace.open(scanResult.filePath, options);
      }
    });
  });

}

module.exports = jbehaveSearch;

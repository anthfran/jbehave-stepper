'use babel';

function jbehaveSearch(selection) {
  const regExp = new RegExp("@(Given|When|Then|And)(.*)");
  let paths = atom.config.get("jbehave-stepper.paths") || "**/src/**/*.java";
  let options = { paths: [paths] };
  atom.workspace.scan(regExp, options, (scanResult) => {
    scanResult.matches.forEach(line => {
      let test = replaceVariables(escapeRegExp(trimMatchText(line.matchText)));
      let testRegExp = new RegExp(".+" + test);

      console.log(selection);
      console.log(testRegExp);
      if (selection.search(testRegExp) != -1) {
        let options = { initialLine:line.range[0][0] };
        atom.workspace.open(scanResult.filePath, options);
      }
    });
  });
}

function escapeRegExp(matchText) {
  return matchText.replace(/[-[\]{}()*+?.,\\^#\s]/g, '\\$&');
}

function trimMatchText(matchText) {
  let startIndex = matchText.indexOf('("') + 2;
  let lastIndex = matchText.lastIndexOf('")');
  return matchText.substring(startIndex, lastIndex)
}

function replaceVariables(matchText) {
  const dollarSignRegEx = new RegExp(/\$\w*/gi);
  const angleBracketRegEx = new RegExp(/(<.+?>)/gi);
  return matchText.replace(dollarSignRegEx, '.+').replace(angleBracketRegEx, '.+');
}

module.exports = jbehaveSearch;

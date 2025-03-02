const vscode = require('vscode');

function getExecutable(filePath, languageId) {
  const config = vscode.workspace.getConfiguration('runTestsInIterm2');
  const userSpecifiedTestRunners = config.get('testRunners');
  const defaultTestRunners = config.get('defaultTestRunners');
  const testRunners = userSpecifiedTestRunners.concat(defaultTestRunners);

  // Check file endings
  const suffixMatch = testRunners.find(
    (entry) => entry.suffix && filePath.endsWith(entry.suffix)
  );
  if (suffixMatch) {
    return suffixMatch.command;
  }

  // Check language ID
  const languageMatch = testRunners.find(
    (entry) => entry.language === languageId
  );

  if (languageMatch) return languageMatch.command;

  return config.get('defaultTestRunner');
}

module.exports = {
  getExecutable,
};

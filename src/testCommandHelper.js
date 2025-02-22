const vscode = require('vscode');

function getTestCommand(filePath, languageId) {
  const config = vscode.workspace.getConfiguration('runTestsInIterm2');
  const customCommands = config.get('customCommands');

  // Check file endings
  const suffixMatch = customCommands.find(
    (entry) => entry.suffix && filePath.endsWith(entry.suffix)
  );
  if (suffixMatch) {
    return suffixMatch.command;
  }

  // Check language ID
  const languageMatch = customCommands.find(
    (entry) => entry.language === languageId
  );
  if (languageMatch) {
    return languageMatch.command;
  }

  return config.get('defaultCommand');
}

module.exports = {
  getTestCommand,
};

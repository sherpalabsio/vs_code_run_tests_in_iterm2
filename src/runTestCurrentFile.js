const vscode = require('vscode');
const { getTestCommand } = require('./testCommandHelper');
const iTerm2 = require('./iterm2');

function runTestCurrentFile() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;

  const filePath = editor.document.uri.fsPath;
  const command = getTestCommand(filePath, editor.document.languageId);
  const finalCommand = `${command} ${filePath}`;

  iTerm2.run(finalCommand);
}

module.exports = {
  runTestCurrentFile,
};

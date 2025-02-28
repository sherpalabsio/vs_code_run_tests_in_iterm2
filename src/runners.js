const vscode = require('vscode');
const { getTestCommand } = require('./testCommandHelper');
const iTerm2 = require('./iterm2');
const path = require('path');

function runAll() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;

  const filePath = editor.document.uri.fsPath;
  const command = getTestCommand(filePath, editor.document.languageId);
  const finalCommand = `${command}`;

  iTerm2.run(finalCommand);
}

function runCurrentFile() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;

  const filePath = getCurrentFilePath();
  const command = getTestCommand(filePath, editor.document.languageId);
  const finalCommand = `${command} ${filePath}`;

  iTerm2.run(finalCommand);
}

function runAtCursor() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;

  const filePath = getCurrentFilePath();
  const lineNumber = editor.selection.active.line + 1; // +1 because VSCode uses 0-based line numbers
  const fileAndLine = `${filePath}:${lineNumber}`;
  const command = getTestCommand(filePath, editor.document.languageId);
  const finalCommand = `${command} ${fileAndLine}`;

  iTerm2.run(finalCommand);
}

function getCurrentFilePath() {
  const editor = vscode.window.activeTextEditor;

  const filePath = editor.document.uri.fsPath;
  if (vscode.workspace.rootPath) {
    return path.relative(vscode.workspace.rootPath, filePath);
  } else {
    return filePath;
  }
}

module.exports = {
  runAll,
  runCurrentFile,
  runAtCursor,
};

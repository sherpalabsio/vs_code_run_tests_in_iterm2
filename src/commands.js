const vscode = require('vscode');
const { getExecutable } = require('./testRunnerHelper');
const iTerm2 = require('./iterm2');
const path = require('path');

function runAll() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;

  const filePath = editor.document.uri.fsPath;
  const executable = getExecutable(filePath, editor.document.languageId);
  const command = `${executable}`;

  iTerm2.run(command);
}

function runCurrentFile() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;

  const filePath = getCurrentFilePath();
  const executable = getExecutable(filePath, editor.document.languageId);
  const command = `${executable} ${filePath}`;

  iTerm2.run(command);
}

function runAtCursor() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;

  const filePath = getCurrentFilePath();
  const lineNumber = editor.selection.active.line + 1; // +1 because VSCode uses 0-based line numbers
  const fileAndLine = `${filePath}:${lineNumber}`;
  const executable = getExecutable(filePath, editor.document.languageId);
  const command = `${executable} ${fileAndLine}`;

  iTerm2.run(command);
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

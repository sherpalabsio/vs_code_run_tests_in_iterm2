const vscode = require('vscode');
const { runTestAtCursor } = require('./src/runTestAtCursor');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand(
    'run-tests-in-iterm2.runAtCursor',
    runTestAtCursor
  );

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};

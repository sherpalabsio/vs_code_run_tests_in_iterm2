const vscode = require('vscode');
const { runAll, runCurrentFile, runAtCursor } = require('./src/runners');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand(
    'run-tests-in-iterm2.runAll',
    runAll
  );
  context.subscriptions.push(disposable);

  disposable = vscode.commands.registerCommand(
    'run-tests-in-iterm2.runCurrentFile',
    runCurrentFile
  );
  context.subscriptions.push(disposable);

  disposable = vscode.commands.registerCommand(
    'run-tests-in-iterm2.runAtCursor',
    runAtCursor
  );
  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};

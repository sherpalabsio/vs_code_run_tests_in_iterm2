const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand(
    'run-tests-in-iterm2.helloWorld',
    function () {
      // Display a message box to the user
      vscode.window.showInformationMessage(
        'Hello World from Run tests in iTerm2!'
      );
    }
  );

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};

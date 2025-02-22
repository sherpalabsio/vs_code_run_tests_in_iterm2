const vscode = require('vscode');
const { exec } = require('child_process');

function runTestAtCursor() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;

  const filePath = editor.document.uri.fsPath;
  const lineNumber = editor.selection.active.line + 1; // +1 because VSCode uses 0-based line numbers
  const fileAndLine = `${filePath}:${lineNumber}`;
  const command = getTestCommand(filePath, editor.document.languageId);
  const finalCommand = `${command} ${fileAndLine}`;

  console.log(`Running in iTerm2: ${finalCommand}`);

  const appleScript = `
        tell application "iTerm2"
          tell current session of current window
            write text "${finalCommand}"
          end tell
        end tell
    `;

  exec(`osascript -e '${appleScript}'`, (error, _stdout, stderr) => {
    if (error) {
      console.error(`Running in iTerm2: ${finalCommand}`, error, stderr);
      vscode.window.showErrorMessage(
        `Run tests in iTerm2 | Failed to run command: ${error.message}`
      );
      return;
    }
  });
}

function getTestCommand(filePath, languageId) {
  if (languageId === 'ruby') {
    if (filePath.endsWith('_spec.rb')) {
      return 'rspec';
    }
    return 'bin/rails test';
  }

  if (
    filePath.endsWith('.js') ||
    filePath.endsWith('.jsx') ||
    filePath.endsWith('.ts') ||
    filePath.endsWith('.tsx')
  ) {
    return 'tjs';
  }

  return 't';
}

module.exports = {
  runTestAtCursor,
};

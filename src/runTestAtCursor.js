const vscode = require('vscode');
const { exec } = require('child_process');
const { getTestCommand } = require('./testCommandHelper');

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
          activate
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

module.exports = {
  runTestAtCursor,
};

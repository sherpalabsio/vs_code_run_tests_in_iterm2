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
  runTestAtCursor,
};

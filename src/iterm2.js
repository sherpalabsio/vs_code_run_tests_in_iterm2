const vscode = require('vscode');
const childProcess = require('child_process');

class iTerm2 {
  static run(command) {
    iTerm2.prepareScreen();

    const config = vscode.workspace.getConfiguration('runTestsInIterm2');
    const activationScript = config.get('bringIterm2ForwardOnExecution')
      ? 'activate'
      : '';

    const appleScript = `
      tell application "iTerm2"
        ${activationScript}

        tell current session of current window
          write text "${command}"
        end tell
      end tell
    `;

    console.log(`Running in iTerm2: ${command}`);

    childProcess.exec(
      `osascript -e '${appleScript}'`,
      (error, _stdout, stderr) => {
        if (error) {
          console.error(`Run test in iTerm2 failed: ${command}`, error, stderr);
          vscode.window.showErrorMessage(
            `Run tests in iTerm2 failed: ${error.message}`
          );
          return;
        }
      }
    );
  }

  static prepareScreen() {
    const config = vscode.workspace.getConfiguration('runTestsInIterm2');

    if (
      config.get('openNewTab') &&
      !config.get('iUseTmux') &&
      iTerm2.isCurrentSessionBusy()
    ) {
      iTerm2.openNewTab();
    } else if (config.get('clearTheScreen')) {
      iTerm2.clearTheScreen();
    }
  }

  static isCurrentSessionBusy() {
    const shell = process.env.SHELL.split('/').pop();

    const appleScript = `
        tell application "iTerm"
          tell current session of current window
            get name
          end tell
        end tell
      `;

    const currentSessionTitle = childProcess
      .execSync(`osascript -e '${appleScript}'`)
      .toString()
      .trim();
    return (
      !currentSessionTitle.endsWith(`(-${shell})`) &&
      currentSessionTitle != `-${shell}`
    );
  }

  static clearTheScreen() {
    const config = vscode.workspace.getConfiguration('runTestsInIterm2');
    const clearScreenCommand = config.get('iUseTmux')
      ? 'write text "clear"'
      : 'write text "printf \\"\\\\33c\\\\e[3J\\""';

    const appleScript = `
      tell application "iTerm"
        tell current session of current window
          -- Send Ctrl+C to clear the current prompt
          write text (ASCII character 3) newline NO

          -- Clear the screen
          ${clearScreenCommand}
          delay 0.1
        end tell
      end tell
    `;

    childProcess.execSync(`osascript -e '${appleScript}'`);
  }

  static openNewTab() {
    const appleScript = `
        tell application "iTerm"
          activate

          tell current window
            create tab with default profile
            delay 0.7 -- wait for the shell to start
          end tell
        end tell
      `;

    childProcess.execSync(`osascript -e '${appleScript}'`);
  }
}

module.exports = iTerm2;

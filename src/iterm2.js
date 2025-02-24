const vscode = require('vscode');
const { exec, execSync } = require('child_process');

class iTerm2 {
  static run(command) {
    console.log(`Running in iTerm2: ${command}`);

    iTerm2.prepareScreen();

    const appleScript = `
          tell application "iTerm2"
            activate
            tell current session of current window
              write text "${command}"
            end tell
          end tell
      `;

    exec(`osascript -e '${appleScript}'`, (error, _stdout, stderr) => {
      if (error) {
        console.error(`Running in iTerm2: ${command}`, error, stderr);
        vscode.window.showErrorMessage(
          `Run tests in iTerm2 | Failed to run command: ${error.message}`
        );
        return;
      }
    });
  }

  static prepareScreen() {
    const config = vscode.workspace.getConfiguration('runTestsInIterm2');

    if (config.get('openNewTab') && iTerm2.isCurrentTabBusy()) {
      iTerm2.openNewTab();
    } else if (config.get('clearTheScreen')) {
      iTerm2.clearTheScreen();
    }
  }

  static isCurrentTabBusy() {
    const shell = process.env.SHELL.split('/').pop();

    const appleScript = `
        tell application "iTerm"
          tell current session of current window
            get name
          end tell
        end tell
      `;

    try {
      const stdout = execSync(`osascript -e '${appleScript}'`)
        .toString()
        .trim();
      return !stdout.endsWith(`(-${shell})`) && stdout != `-${shell}`;
    } catch (error) {
      console.error('Error checking if current tab is busy:', error);
      return;
    }
  }

  static clearTheScreen() {
    const appleScript = `
        tell application "iTerm"
          activate

          tell current session of current window
            -- Send Ctrl+C to clear the current prompt
            write text (ASCII character 3) newline NO

            -- Clear the screen
            write text "printf \\"\\\\33c\\\\e[3J\\""
            delay 0.1
          end tell
        end tell
      `;

    execSync(`osascript -e '${appleScript}'`);
  }

  static openNewTab() {
    const appleScript = `
        tell application "iTerm"
          activate

          tell current window
            create tab with default profile
            delay 0.7
          end tell
        end tell
      `;

    execSync(`osascript -e '${appleScript}'`);
  }
}

module.exports = iTerm2;

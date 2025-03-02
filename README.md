# Run tests in iTerm2

# Feature highlights

# Settings

## bringIterm2ForwardOnExecution

- Default: `true`
- Description: Bring iTerm2 to the front when a test starts running.

## openNewTab

- Default: `true`
- Description: Open a new tab in iTerm and run the test there when the current session in iTerm2 is running something e.g. an app server. This is not supported in tmux so make sure to set the `iUseTmux` to `true` or this setting to `false` to avoid new tabs being constantly opened.

## clearTheScreen

- Default: `true`
- Description: Clear the screen before running a test. This also removes any text typed into the prompt. This works differently in tmux so make sure to set the `iUseTmux` to `true` if you are using tmux.


## iUseTmux

- Default: `false`
- Description: Some features are not supported in tmux, and some need to be adjusted to work with tmux. Set this to `true` to avoid weird behavior when using tmux.

## defaultCommand

- Default: `make test`
- Description: The command to run when no custom command is found for the current file or language. Running the whole test suite is using this command too.

## customCommands

- Default: `[]`
- Description: An array of custom commands to run for specific languages or file types. The `language` key is used to match the language of the current file, and the `suffix` key is used to match the file name. If both are present, the `suffix` key is used. The `command` key is the command to run. The command is run in the directory of the current file.

```json
{
  "language": "ruby",
  "command": "rails test"
},
{
  "suffix": "_spec.rb",
  "command": "rspec"
},
{
  "language": "javascript",
  "command": "yarn test"
}
```

## Defaults

```json
// settings.json
"runTestsInIterm2": {
  "bringIterm2ForwardOnExecution": true,
  "openNewTab": true,
  "clearTheScreen": true,
  "iUseTmux": false,

  "defaultCommand": "make test",

  "customCommands": [
    {
      "language": "ruby",
      "command": "rails test"
    },
    {
      "suffix": "_spec.rb",
      "command": "rspec"
    },
    {
      "language": "javascript",
      "command": "yarn test"
    }
  ]
}
```

# Commands

```json
// keybindings.json
{
  "key": "cmd+; cmd+a",
  "command": "run-tests-in-iterm2.runAll",
  "when": "editorTextFocus"
},
{
  "key": "cmd+; cmd+f",
  "command": "run-tests-in-iterm2.runCurrentFile",
  "when": "editorTextFocus"
},
{
  "key": "cmd+; cmd+l",
  "command": "run-tests-in-iterm2.runAtCursor",
  "when": "editorTextFocus"
},
```

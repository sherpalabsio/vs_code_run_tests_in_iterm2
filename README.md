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

## defaultTestRunner

- Default: `make test`
- Description: Specify a default command to run when no specific command is found for the current file. This is useful when you have a single command to run all tests in your project.

## testRunners

- Description: Specify what command to use for a specific language or file suffix.

### Example

```json
"testRunners": [
  {
    "language": "ruby",
    "command": "rails test"
  },
  {
    "suffix": "_spec.rb",
    "command": "rspec"
  },
]
```

## Example settings.json

```json
// settings.json
"runTestsInIterm2": {
  "bringIterm2ForwardOnExecution": true,
  "openNewTab": true,
  "clearTheScreen": true,
  "iUseTmux": false,

  "defaultTestRunner": "make test",

  "testRunners": [
    {
      "language": "ruby",
      "command": "rails test"
    },
    {
      "suffix": "_spec.rb",
      "command": "rspec"
    },
    {
      "language": "elixir",
      "command": "mix test"
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

# Run tests in iTerm2

![Demo](media/demo.gif)

# Feature highlights

- It opens a new tab when the current iTerm2 session is running something e.g. an app server.
  - Not supported for tmux.
- It clears the screen before running a test.
- It clears the prompt before running a test.
  - So you don't have to worry about that you run something else by mistake.

# Configuration

## bringIterm2ForwardOnExecution

- Default: `true`
- Description: Bring iTerm2 to the front when a test starts running.

## openNewTab

- Default: `true`
- Description: Run the tests in a new iTerm2 tab when the current iTerm2 session is running something e.g. an app server. This is not supported for tmux so make sure to set the `iUseTmux` correctly to avoid new tabs being constantly opened.

## clearTheScreen

- Default: `true`
- Description: Clear the screen before running a test. This also removes any text typed into the prompt.

## iUseTmux

- Default: `false`
- Description: Some features are not supported in tmux, and some need to be adjusted to work with tmux. Set this to `true` to avoid weird behavior in tmux.

## defaultTestRunner

- Default: `make test`
- Description: The default command to run when no specific command is found for the current file. This is also used to run all tests.

## testRunners

- Description: Specify what command to use for a specific file suffix or language. Suffixes take precedence over languages.

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

## Default configuration (settings.json)

```json
"runTestsInIterm2.bringIterm2ForwardOnExecution": true,
"runTestsInIterm2.openNewTab": true,
"runTestsInIterm2.clearTheScreen": true,
"runTestsInIterm2.iUseTmux": false,

"runTestsInIterm2.defaultTestRunner": "make test",
"runTestsInIterm2.testRunners": [
  {
    "suffix": "_test.rb",
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
```

# Available commands

- run-tests-in-iterm2.runAll
- run-tests-in-iterm2.runCurrentFile
- run-tests-in-iterm2.runAtCursor

# Recommended keybindings (keybindings.json)

```json
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
}
```

const assert = require('assert');
const vscode = require('vscode');
const sinon = require('sinon');
const childProcess = require('child_process');
const { describe, it, beforeEach, afterEach } = require('mocha');

describe('Run Tests in iTerm2 Extension', () => {
  let execStub;

  beforeEach(() => {
    execStub = sinon.stub(childProcess, 'exec');
  });

  afterEach(() => {
    execStub.restore();
  });

  it('runs the correct command for a Ruby file', async () => {
    const document = await vscode.workspace.openTextDocument({
      content: 'class TestFile\n  def test_method\n    puts "test"\n  end\nend',
      language: 'ruby',
    });
    const editor = await vscode.window.showTextDocument(document);

    // Move cursor to line 5
    const position = new vscode.Position(4, 0);
    editor.selection = new vscode.Selection(position, position);

    await vscode.commands.executeCommand('run-tests-in-iterm2.runAtCursor');

    assert(execStub.calledOnce);
    const expectedCommand = `rails test ${document.uri.fsPath}:5`;
    assert(
      execStub.firstCall.args[0].includes(`write text "${expectedCommand}"`)
    );
  });
});

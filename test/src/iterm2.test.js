const assert = require('assert');
const { describe, it, beforeEach, afterEach } = require('mocha');
const sinon = require('sinon');

const childProcess = require('child_process');
const iTerm2 = require('../../src/iterm2');

describe('.isCurrentSessionBusy', () => {
  let execSyncStub;

  beforeEach(() => {
    execSyncStub = sinon.stub(childProcess, 'execSync');
  });

  afterEach(() => {
    execSyncStub.restore();
  });

  it('returns false when the current session is busy', async () => {
    execSyncStub.onCall(0).returns('..sts-in-iterm2 (-zsh)');

    const result = iTerm2.isCurrentSessionBusy();

    assert(!result);
  });

  it('returns true when the current session is busy', async () => {
    execSyncStub.onCall(0).returns('bash (tail)');

    const result = iTerm2.isCurrentSessionBusy();

    assert(result);
  });
});

describe('.prepareScreen', () => {
  let openNewTabStub, clearTheScreenStub, isCurrentSessionBusyStub;

  beforeEach(() => {
    openNewTabStub = sinon.stub(iTerm2, 'openNewTab');
    clearTheScreenStub = sinon.stub(iTerm2, 'clearTheScreen');
    isCurrentSessionBusyStub = sinon.stub(iTerm2, 'isCurrentSessionBusy');
  });

  afterEach(() => {
    openNewTabStub.restore();
    clearTheScreenStub.restore();
    isCurrentSessionBusyStub.restore();
  });

  it('opens a new tab when the current session is busy', async () => {
    isCurrentSessionBusyStub.onCall(0).returns(true);

    iTerm2.prepareScreen();

    assert(openNewTabStub.calledOnce);
  });

  it('clears the screen when the current session is not busy', async () => {
    isCurrentSessionBusyStub.onCall(0).returns(false);

    iTerm2.prepareScreen();

    assert(clearTheScreenStub.calledOnce);
  });
});

import * as vscode from 'vscode';

suite('Extension Test Suite', () => {
  vscode.window.showInformationMessage('Start all tests.');

  test('it registers the extension commands', async () => {
    await vscode.commands.executeCommand('spec-utils.switchSpec');
    await vscode.commands.executeCommand('spec-utils.copySpecPath');
    await vscode.commands.executeCommand('spec-utils.toggleFixedSpec');
  });
});

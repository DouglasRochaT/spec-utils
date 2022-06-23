import * as vscode from 'vscode';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('it register the extension commands', async () => {
        await vscode.commands.executeCommand('switch-spec.switchSpec');
        await vscode.commands.executeCommand('switch-spec.copySpecPath');
	});
});

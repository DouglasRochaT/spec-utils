import * as vscode from 'vscode';
import { switchFile } from './pathUtils';

export function activate(context: vscode.ExtensionContext) {
	console.log('Extension "switch-spec" is now active!');

	let disposable = vscode.commands.registerCommand('switch-spec.switchSpec', () => {
		switchFile();
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}

import * as vscode from 'vscode';
import { copySpecPath } from './modules/copySpecPath';
import { switchFile } from './modules/switchFile';

export function activate(context: vscode.ExtensionContext) {
	console.log('Extension "switch-spec" is now active!');

	let disposable = vscode.commands.registerCommand('switch-spec.switchSpec', () => {
		switchFile();
	});

	let disposable2 = vscode.commands.registerCommand('switch-spec.copySpecPath', () => {
		copySpecPath();
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable2);
}

export function deactivate() {}

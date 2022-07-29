import * as vscode from 'vscode';
import { copySpecPath } from './modules/copySpecPath';
import { switchFile } from './modules/switchFile';
import { toggleFixedSpec } from './modules/toggleFixedSpec';

export function activate(context: vscode.ExtensionContext) {
	console.log('Extension "switch-spec" is now active!');

	let disposable = vscode.commands.registerCommand('switch-spec.switchSpec', () => {
		switchFile();
	});

	let disposable2 = vscode.commands.registerCommand('switch-spec.copySpecPath', () => {
		copySpecPath();
	});

	let disposable3 = vscode.commands.registerCommand('switch-spec.toggleFixedSpec', () => {
		toggleFixedSpec();
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable2);
	context.subscriptions.push(disposable3);
}

export function deactivate() {}

import * as vscode from 'vscode';
import { copySpecPath } from './modules/copySpecPath';
import { switchFile } from './modules/switchFile';
import { toggleFixedSpec } from './modules/toggleFixedSpec';

export function activate(context: vscode.ExtensionContext) {
	console.log('Extension "spec-utils" is now active!');

	let disposable = vscode.commands.registerCommand('spec-utils.switchSpec', () => {
		switchFile();
	});

	let disposable2 = vscode.commands.registerCommand('spec-utils.copySpecPath', () => {
		copySpecPath();
	});

	let disposable3 = vscode.commands.registerCommand('spec-utils.toggleFixedSpec', () => {
		toggleFixedSpec();
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable2);
	context.subscriptions.push(disposable3);
}

export function deactivate() {}

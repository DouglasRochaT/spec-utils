import * as assert from 'assert';
import { after } from 'mocha';
import * as path from 'path';
import * as vscode from 'vscode';
import { switchFile } from '../../../modules/switchFile';

const fixturesFolder = '/../../../../src/test/fixtures/';

suite('switchFile Test Suite', () => {
  after( async () => {
    await vscode.commands.executeCommand('workbench.action.closeAllEditors');
  });

  test('JavaScript files', async () => {
    const srcFile = path.join(__dirname + fixturesFolder + 'src/javascriptFile.js');
    const specFile = path.join(__dirname + fixturesFolder + 'src/javascriptFile.spec.js');
    let document = await vscode.workspace.openTextDocument(srcFile);

    await vscode.window.showTextDocument(document);
    await switchFile();

    assert.strictEqual(vscode.window.activeTextEditor?.document.fileName, specFile);

    await vscode.commands.executeCommand('workbench.action.closeAllEditors');

    document = await vscode.workspace.openTextDocument(specFile);
    await vscode.window.showTextDocument(document);
    await switchFile();

    assert.strictEqual(vscode.window.activeTextEditor?.document.fileName, srcFile);
  });

  test('TypeScript files', async () => {
    const srcFile = path.join(__dirname + fixturesFolder + 'src/typescriptFile.ts');
    const specFile = path.join(__dirname + fixturesFolder + 'src/typescriptFile.spec.ts');
    let document = await vscode.workspace.openTextDocument(srcFile);

    await vscode.window.showTextDocument(document);
    await switchFile();

    assert.strictEqual(vscode.window.activeTextEditor?.document.fileName, specFile);

    await vscode.commands.executeCommand('workbench.action.closeAllEditors');

    document = await vscode.workspace.openTextDocument(specFile);
    await vscode.window.showTextDocument(document);
    await switchFile();

    assert.strictEqual(vscode.window.activeTextEditor?.document.fileName, srcFile);
  });

  test('Ruby files', async() => {
    const srcFile = path.join(__dirname + fixturesFolder + 'app/ruby_file.rb');
    const specFile = path.join(__dirname + fixturesFolder + 'spec/ruby_file_spec.rb');
    let document = await vscode.workspace.openTextDocument(srcFile);

    await vscode.window.showTextDocument(document);
    await switchFile();

    assert.strictEqual(vscode.window.activeTextEditor?.document.fileName, specFile);

    await vscode.commands.executeCommand('workbench.action.closeAllEditors');

    document = await vscode.workspace.openTextDocument(specFile);
    await vscode.window.showTextDocument(document);
    await switchFile();

    assert.strictEqual(vscode.window.activeTextEditor?.document.fileName, srcFile);
  });
});

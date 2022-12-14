import * as assert from 'assert';
import * as mocha from 'mocha';
import * as path from 'path';
import * as vscode from 'vscode';
import { switchFile } from '../../../modules/switchFile';

const fixturesFolder = '/../../../../src/test/fixtures/';

suite('switchFile Test Suite', () => {
  mocha.after( async () => {
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

  test('Rails files', async() => {
    const srcFile = path.join(__dirname + fixturesFolder + 'rails_app/app/ruby_file.rb');
    const specFile = path.join(__dirname + fixturesFolder + 'rails_app/spec/ruby_file_spec.rb');
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

  test('Ruby gem files', async() => {
    const srcFile = path.join(__dirname + fixturesFolder + 'ruby_gem/lib/ruby_file.rb');
    const specFile = path.join(__dirname + fixturesFolder + 'ruby_gem/spec/ruby_file_spec.rb');
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

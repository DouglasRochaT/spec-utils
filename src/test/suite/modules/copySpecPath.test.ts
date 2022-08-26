import * as assert from 'assert';
import * as mocha from 'mocha';
import * as path from 'path';
import * as vscode from 'vscode';
import { copySpecPath } from '../../../modules/copySpecPath';

const fixturesFolder = '/../../../../src/test/fixtures/';

suite('copySpecPath Test Suite', () => {
  mocha.after( async () => {
    await vscode.commands.executeCommand('workbench.action.closeAllEditors');
  });

  test('JavaScript files', async () => {
    const srcFile = path.join(__dirname + fixturesFolder + 'src/javascriptFile.js');
    const specFile = path.join(__dirname + fixturesFolder + 'src/javascriptFile.spec.js');

    const environment = vscode.env;
    let document = await vscode.workspace.openTextDocument(srcFile);

    await vscode.window.showTextDocument(document);
    await copySpecPath();

    assert.strictEqual(await environment.clipboard.readText(), specFile);

    await vscode.commands.executeCommand('workbench.action.closeAllEditors');

    document = await vscode.workspace.openTextDocument(specFile);
    await vscode.window.showTextDocument(document);
    await copySpecPath();

    assert.strictEqual(await environment.clipboard.readText(), specFile);
  });

  test('TypeScript files', async () => {
    const srcFile = path.join(__dirname + fixturesFolder + 'src/typescriptFile.ts');
    const specFile = path.join(__dirname + fixturesFolder + 'src/typescriptFile.spec.ts');

    const environment = vscode.env;
    let document = await vscode.workspace.openTextDocument(srcFile);

    await vscode.window.showTextDocument(document);
    await copySpecPath();

    assert.strictEqual(await environment.clipboard.readText(), specFile);

    await vscode.commands.executeCommand('workbench.action.closeAllEditors');

    document = await vscode.workspace.openTextDocument(specFile);
    await vscode.window.showTextDocument(document);
    await copySpecPath();

    assert.strictEqual(await environment.clipboard.readText(), specFile);
  });

  test('Rails files', async() => {
    const srcFile = path.join(__dirname + fixturesFolder + 'rails_app/app/ruby_file.rb');
    const specFile = path.join(__dirname + fixturesFolder + 'rails_app/spec/ruby_file_spec.rb');

    const environment = vscode.env;
    let document = await vscode.workspace.openTextDocument(srcFile);

    await vscode.window.showTextDocument(document);
    await copySpecPath();

    assert.strictEqual(await environment.clipboard.readText(), specFile);

    await vscode.commands.executeCommand('workbench.action.closeAllEditors');

    document = await vscode.workspace.openTextDocument(specFile);
    await vscode.window.showTextDocument(document);
    await copySpecPath();

    assert.strictEqual(await environment.clipboard.readText(), specFile);
  });

  test('Ruby gem files', async() => {
    const srcFile = path.join(__dirname + fixturesFolder + 'ruby_gem/lib/ruby_file.rb');
    const specFile = path.join(__dirname + fixturesFolder + 'ruby_gem/spec/ruby_file_spec.rb');

    const environment = vscode.env;
    let document = await vscode.workspace.openTextDocument(srcFile);

    await vscode.window.showTextDocument(document);
    await copySpecPath();

    assert.strictEqual(await environment.clipboard.readText(), specFile);

    await vscode.commands.executeCommand('workbench.action.closeAllEditors');

    document = await vscode.workspace.openTextDocument(specFile);
    await vscode.window.showTextDocument(document);
    await copySpecPath();

    assert.strictEqual(await environment.clipboard.readText(), specFile);
  });
});

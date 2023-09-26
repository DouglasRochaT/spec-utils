import * as assert from 'assert';
import * as mocha from 'mocha';
import * as path from 'path';
import * as vscode from 'vscode';
import { toggleFixedSpec } from '../../../modules/toggleFixedSpec';

const fixturesFolder = '/../../../../src/test/fixtures/';

suite('toggleFixedSpec Test Suite', () => {
  mocha.after( async () => {
    await vscode.commands.executeCommand('workbench.action.closeAllEditors');
  });

  test('Jest and Cypress files', async () => {
    const specFile = path.join(__dirname + fixturesFolder + 'src/javascriptFile.spec.js');
    let document = await vscode.workspace.openTextDocument(specFile);

    await vscode.window.showTextDocument(document);
    await vscode.commands.executeCommand('cursorMove', {to: 'down', by: 'line', value: 2});

    await toggleFixedSpec();
    assert.strictEqual(document.lineAt(1).text, "  it.only('does something', () => {");

    await toggleFixedSpec();
    assert.strictEqual(document.lineAt(1).text, "  it('does something', () => {");

    await vscode.commands.executeCommand('cursorMove', {to: 'down', by: 'line', value: 11});

        await toggleFixedSpec();
        assert.strictEqual(document.lineAt(10).text, "  Image.edit();");

  });

  test('RSpec files', async () => {
    const specFile = path.join(__dirname + fixturesFolder + 'rails_app/spec/ruby_file_spec.rb');
    let document = await vscode.workspace.openTextDocument(specFile);

    await vscode.window.showTextDocument(document);
    await vscode.commands.executeCommand('cursorMove', {to: 'down', by: 'line', value: 1});

    await toggleFixedSpec();
    assert.strictEqual(document.lineAt(1).text, "  fdescribe '#method' do");

    await toggleFixedSpec();
    assert.strictEqual(document.lineAt(1).text, "  describe '#method' do");

    await vscode.commands.executeCommand('cursorMove', {to: 'down', by: 'line', value: 2});

    await toggleFixedSpec();
    assert.strictEqual(document.lineAt(2).text, "    fcontext 'when something' do");

    await toggleFixedSpec();
    assert.strictEqual(document.lineAt(2).text, "    context 'when something' do");

    await vscode.commands.executeCommand('cursorMove', {to: 'down', by: 'line', value: 3});

    await toggleFixedSpec();
    assert.strictEqual(document.lineAt(5).text, "    fit 'does something' do");

    await toggleFixedSpec();
    assert.strictEqual(document.lineAt(5).text, "    it 'does something' do");

    await vscode.commands.executeCommand('cursorMove', {to: 'down', by: 'line', value: 2});

    await toggleFixedSpec();
    assert.strictEqual(document.lineAt(8).text, "    fit {}");

    await toggleFixedSpec();
    assert.strictEqual(document.lineAt(8).text, "    it {}");

    await vscode.commands.executeCommand('cursorMove', {to: 'down', by: 'line', value: 2});

    await toggleFixedSpec();
    assert.strictEqual(document.lineAt(10).text, "    fit do");

    await toggleFixedSpec();
    assert.strictEqual(document.lineAt(10).text, "    it do");

    await vscode.commands.executeCommand('cursorMove', {to: 'down', by: 'line', value: 3});

    await toggleFixedSpec();
    assert.strictEqual(document.lineAt(13).text, "    fcontext 'with the value' do");
  });
});

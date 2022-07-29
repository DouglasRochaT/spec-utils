import * as assert from 'assert';
import * as path from 'path';
import * as vscode from 'vscode';
import { after } from 'mocha';
import { toggleFixedSpec } from '../../../modules/toggleFixedSpec';

const fixturesFolder = '/../../../../src/test/fixtures/';

suite('toggleFixedSpec Test Suite', () => {
  after( async () => {
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
  });

  test('RSpec files', async () => {
    const specFile = path.join(__dirname + fixturesFolder + 'spec/ruby_file_spec.rb');
    let document = await vscode.workspace.openTextDocument(specFile);

    await vscode.window.showTextDocument(document);
    await vscode.commands.executeCommand('cursorMove', {to: 'down', by: 'line', value: 6});

    await toggleFixedSpec();
    assert.strictEqual(document.lineAt(5).text, "    fit 'does something' do");

    await toggleFixedSpec();
    assert.strictEqual(document.lineAt(5).text, "    it 'does something' do");
  });
});

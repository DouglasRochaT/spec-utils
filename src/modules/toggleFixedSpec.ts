import * as vscode from 'vscode';

const jestIdentifiers = ['describe', 'test', 'it', 'concurrent'];
const cypressIdentifiers = ['describe', 'context', 'it', 'specify'];
const rspecIdentifiers = ['context', 'it'];

const jestRegex = new RegExp(`(${jestIdentifiers.join('|')})(\\(|.only\\()`);
const cypressRegex = new RegExp(`(${cypressIdentifiers.join('|')})(\\(|.only\\()`);
const rspecRegex = new RegExp(`(${rspecIdentifiers.join('|')}) (\'|\"|\{|do)`);

function toggleFixedSpec(){
  const editor = vscode.window.activeTextEditor;
  if (editor === undefined)  {return;}

  let currentLineIndex = editor.selection.active.line;

  while(currentLineIndex > 0){
    const currentLine = editor.document.lineAt(currentLineIndex);

    if(jestRegex.test(currentLine.text)) {return toggleJS(editor, currentLine);}
    if(cypressRegex.test(currentLine.text)) {return toggleJS(editor, currentLine);}
    if(rspecRegex.test(currentLine.text)) {return toggleRSpec(editor, currentLine);};

    currentLineIndex--;
  }
}

function toggleJS(editor: vscode.TextEditor, currentLine: vscode.TextLine){
  let newLine: string;

  if(currentLine.text.includes('.only(')) {
    newLine = currentLine.text.replace('.only(', '(');
  } else {
    newLine = currentLine.text.replace('(', '.only(');
  }

  return editor.edit(editBuilder => {
    editBuilder.replace(currentLine.range, newLine);
  });
}

function toggleRSpec(editor: vscode.TextEditor, currentLine: vscode.TextLine) {
  let newLine: string;
  let fixedRegex = new RegExp(`f(${rspecIdentifiers.join('|')}) (\'|\"|\{|do)`);

  if(fixedRegex.test(currentLine.text)) {
    newLine = currentLine.text.replace('fit', 'it');
    newLine = newLine.replace('fdescribe', 'describe');
  } else {
    newLine = currentLine.text.replace('it', 'fit');
    newLine = newLine.replace('describe', 'fdescribe');
  }

  return editor.edit(editBuilder => {
    editBuilder.replace(currentLine.range, newLine);
  });
}

export { toggleFixedSpec };

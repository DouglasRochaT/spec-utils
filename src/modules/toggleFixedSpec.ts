import * as vscode from 'vscode';

const jestIdentifiers = ['describe', 'test', 'it', 'concurrent'];
const cypressIdentifiers = ['describe', 'context', 'it', 'specify'];
const rspecIdentifiers = ['context', 'describe', 'it'];

const jestRegex = new RegExp(`(^|[^a-z])(${jestIdentifiers.join('|')})(\\(|.only\\()`);
const cypressRegex = new RegExp(`(^|[^a-z])(${cypressIdentifiers.join('|')})(\\(|.only\\()`);
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
  const newLine = currentLine.text.replace(/\b(f?it|f?describe|f?context)\b/, match => {
    return match.charAt(0) === 'f' ? match.slice(1) : 'f' + match;
  });

  return editor.edit(editBuilder => {
    editBuilder.replace(currentLine.range, newLine);
  });
}

export { toggleFixedSpec };

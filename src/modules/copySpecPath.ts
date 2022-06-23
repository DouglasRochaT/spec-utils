import * as vscode from 'vscode';
import { getFilename, switchJavaScript, switchRuby, switchTypeScript, unknownLanguage } from './pathUtils';

async function copySpecPath(){
  const environment = vscode.env;
  const currentFile = getFilename();
  let specFile = "";

  if(currentFile.endsWith(".ts") && currentFile.indexOf(".spec") === -1){
    specFile = switchTypeScript();
  } else if(currentFile.endsWith(".js") && currentFile.indexOf(".spec") === -1){
    specFile = switchJavaScript();
  } else if(currentFile.endsWith(".rb") && currentFile.indexOf("_spec") === -1){
    specFile = switchRuby();
  } else {
    return unknownLanguage();
  }

  vscode.commands.executeCommand("editor.action.clipboardCopyAction");
  environment.clipboard.writeText(specFile);
}

export { copySpecPath };
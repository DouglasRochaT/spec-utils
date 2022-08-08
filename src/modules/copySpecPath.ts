import * as vscode from 'vscode';
import { getFilename, switchJavaScript, switchRuby, switchTypeScript } from './pathUtils';

async function copySpecPath(){
  const environment = vscode.env;
  const workspace = vscode.workspace;
  const currentFile = getFilename();
  let specFile = "";

  if(currentFile.endsWith(".ts") && currentFile.indexOf(".spec") === -1){
    specFile = switchTypeScript();
  } else if(currentFile.endsWith(".js") && currentFile.indexOf(".spec") === -1){
    specFile = switchJavaScript();
  } else if(currentFile.endsWith(".rb") && currentFile.indexOf("_spec") === -1){
    specFile = switchRuby();
  } else {
    specFile = getFilename();
  }

  const relativepath = workspace.asRelativePath(specFile);
  return environment.clipboard.writeText(relativepath);
}

export { copySpecPath };

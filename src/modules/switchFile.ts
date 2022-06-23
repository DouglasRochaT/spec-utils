import * as vscode from 'vscode';
import { getFilename, switchJavaScript, switchRuby, switchTypeScript, unknownLanguage } from "./pathUtils";

async function switchFile(){
  const currentFile = getFilename();
  let destinationFile = "";

  if(currentFile.endsWith(".ts")){
    destinationFile = switchTypeScript();
  } else if(currentFile.endsWith(".js")){
    destinationFile = switchJavaScript();
  } else if(currentFile.endsWith(".rb")){
    destinationFile = switchRuby();
  } else {
    return unknownLanguage();
  }

  return vscode.commands.executeCommand("vscode.open", vscode.Uri.file(destinationFile));
}

export { switchFile };

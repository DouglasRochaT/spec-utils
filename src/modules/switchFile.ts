import { closeSync, existsSync, openSync } from 'fs';
import * as vscode from 'vscode';
import { getFilename, switchJavaScript, switchRuby, switchTypeScript, unknownLanguage } from "./pathUtils";

async function quickPick(filePath: string){
  const options = {
    title: `Create ${filePath}?`,
  };

  vscode.window.showQuickPick(["Yes", "No"], options)
    .then(selection => {
      if(selection === "Yes"){
        closeSync(openSync(filePath, 'w'));
        return vscode.commands.executeCommand("vscode.open", vscode.Uri.file(filePath));
      }
    });
}

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

  if(existsSync(destinationFile)){
    return vscode.commands.executeCommand("vscode.open", vscode.Uri.file(destinationFile));
  } else {
    return quickPick(destinationFile);
  }
}

export { switchFile };

import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { fileType } from '../helpers/file';
import { getFilename, switchJavaScript, switchRuby, switchTypeScript } from "../helpers/path";

async function quickPick(filePath: string){
  const options = {
    title: `Create ${filePath}?`,
  };

  vscode.window.showQuickPick(["Yes", "No"], options)
    .then(selection => {
      if(selection === "Yes"){
        const dir = path.dirname(filePath);

        if(!fs.existsSync(dir)){
          fs.mkdirSync(dir, {recursive: true});
        }

        fs.closeSync(fs.openSync(filePath, 'w', ));
        return vscode.commands.executeCommand("vscode.open", vscode.Uri.file(filePath));
      }
    });
}

function switchFile(){
  const currentFile = getFilename();
  const type = fileType(currentFile);
  let destinationFile = "";

  if(type === 'typescript'){
    destinationFile = switchTypeScript();
  } else if(type === 'javascript'){
    destinationFile = switchJavaScript();
  } else if(type === 'ruby'){
    destinationFile = switchRuby();
  }

  if(fs.existsSync(destinationFile)){
    return vscode.commands.executeCommand("vscode.open", vscode.Uri.file(destinationFile));
  } else {
    return quickPick(destinationFile);
  }
}

export { switchFile };

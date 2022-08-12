import * as vscode from 'vscode';
import { fileType } from '../helpers/file';
import { getFilename, switchJavaScript, switchRuby, switchTypeScript } from '../helpers/path';

function copySpecPath(){
  const environment = vscode.env;
  const workspace = vscode.workspace;
  const currentFile = getFilename();
  const type = fileType(currentFile);
  let specFile = "";

  if((type === 'typescript') && currentFile.indexOf(".spec") === -1){
    specFile = switchTypeScript();
  } else if((type === 'javascript') && currentFile.indexOf(".spec") === -1){
    specFile = switchJavaScript();
  } else if(type === 'ruby' && currentFile.indexOf("_spec") === -1){
    specFile = switchRuby();
  } else {
    specFile = getFilename();
  }

  const relativepath = workspace.asRelativePath(specFile);
  return environment.clipboard.writeText(relativepath);
}

export { copySpecPath };

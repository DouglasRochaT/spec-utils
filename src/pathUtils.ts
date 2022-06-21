import * as vscode from 'vscode';

function getFilename(){
  let document = vscode.window.activeTextEditor?.document;
  if(document === undefined){
    return "";
  }

  return document.fileName;
}

async function switchFile(){
  const filename = getFilename();

  if(filename.endsWith(".ts")){
    return switchTypeScript();
  } else if(filename.endsWith(".js")){
    return switchJavaScript();
  } else if(filename.endsWith(".rb")){
    return switchRuby();
  } else {
    return unknownLanguage();
  }
}

function switchJavaScript(){
  let filename = getFilename();

  if(filename.indexOf(".spec") === -1){
    filename = filename.replace(".js", ".spec.js");
  } else {
    filename = filename.replace(".spec.js", ".js");
  }

  return vscode.commands.executeCommand("vscode.open", vscode.Uri.file(filename));
}

function switchTypeScript(){
  let filename = getFilename();

  if(filename.indexOf(".spec") === -1){
    filename = filename.replace(".ts", ".spec.ts");
  } else {
    filename = filename.replace(".spec.ts", ".ts");
  }

  return vscode.commands.executeCommand("vscode.open", vscode.Uri.file(filename));
}

function switchRuby(){
  let filename = getFilename();

  if(filename.indexOf("spec.rb") === -1){
    filename = filename.replace("app/", "spec/");
    filename = filename.replace(".rb", "_spec.rb");
  } else {
    filename = filename.replace("/spec/", "/app/");
    filename = filename.replace("_spec.rb", ".rb");
  }

  return vscode.commands.executeCommand("vscode.open", vscode.Uri.file(filename));
}

function unknownLanguage(){
  vscode.window.showInformationMessage("Unknown language");
}

export { switchFile };

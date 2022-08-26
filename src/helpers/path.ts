import * as fs from 'fs';
import * as vscode from 'vscode';

function getFilename(){
  let document = vscode.window.activeTextEditor?.document;
  if(document === undefined){
    return "";
  }

  return document.fileName;
}

function switchJavaScript(){
  let filename = getFilename();

  if(filename.indexOf(".spec") === -1){
    filename = filename.replace(".js", ".spec.js");
  } else {
    filename = filename.replace(".spec.js", ".js");
  }

  return filename;
}

function switchTypeScript(){
  let filename = getFilename();

  if(filename.indexOf(".spec") === -1){
    filename = filename.replace(".ts", ".spec.ts");
  } else {
    filename = filename.replace(".spec.ts", ".ts");
  }

  return filename;
}

function switchRuby(){
  let filename = getFilename();

  if(filename.indexOf("_spec") === -1){
    filename = filename.replace("/app/", "/spec/");
    filename = filename.replace("/lib/", "/spec/");
    filename = filename.replace(".rb", "_spec.rb");
  } else {
    if(fs.existsSync(filename.replace(/spec\/.*/, 'app/'))){
      filename = filename.replace("/spec/", "/app/");
    } else if(fs.existsSync(filename.replace(/spec\/.*/, 'lib/'))){
      filename = filename.replace("/spec/", "/lib/");
    }
    filename = filename.replace("_spec.rb", ".rb");
  }

  return filename;
}

export { switchJavaScript, switchTypeScript, switchRuby };
export { getFilename };

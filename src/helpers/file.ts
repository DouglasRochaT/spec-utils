function fileType(fileName :string) {
 if(fileName.endsWith('.ts') || fileName.endsWith('.tsx')) {
  return 'typescript';
 } else if(fileName.endsWith('.js') || fileName.endsWith('.jsx')) {
  return 'javascript';
 } else if(fileName.endsWith('.rb')){
  return 'ruby';
 }
}

export { fileType };

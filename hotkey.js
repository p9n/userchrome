function main() {
  var saveAs = document.getElementById('key_savePage');
  if (saveAs) {
    saveAs.remove();
    document.getElementById("menu_savePage").removeAttribute("key");
  }
}

main();

function runCode() {
  const codeInput = document.getElementById("codeInput").value;

  try {
    const compiledCode = eval(codeInput);
    document.getElementById("output").innerText = compiledCode;
  } catch (error) {
    document.getElementById("output").innerText =
      "Error compiling code: " + error.message;
    console.log("Error compiling code: " + error.message);
  }
}

function saveCode() {
  const fileName = prompt("Enter the file name:");
  if (!fileName) return;

  const jsCode = document.getElementById("codeInput").value;
  const folderName = "Programs";
  const folder = fileSystem.root.children[folderName];

  if (folder) {
    folder.children[fileName] = {
      type: "js",
      name: fileName + ".js",
      content: jsCode,
    };

    alert(
      `JavaScript file '${fileName}.js' saved successfully in the '${folderName}' folder.`
    );
    populateFileExplorer();
  } else {
    alert(`Folder '${folderName}' not found.`);
  }
}
function openNotepad() {
  const notepadWindow = document.getElementById("notepadWindow");
  notepadWindow.style.display = "block";

  $(notepadWindow).draggable();
}

function saveFile() {
  const fileName = prompt("Enter the file name:");
  if (!fileName) return;

  const content = document.getElementById("notepadContent").value;
  const fileData = new Blob([content], {
    type: "text/plain",
  });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(fileData);
  link.download = fileName + ".txt";

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);

  const documentsFolder = fileSystem.root.children.documents;
  documentsFolder.children[fileName] = {
    type: "file",
    name: fileName + ".txt",
    content: content,
  };

  alert(
    `Text file '${fileName}.txt' saved successfully in the '${documentsFolder}' folder.`
  );
}
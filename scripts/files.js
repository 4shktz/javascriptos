const fileSystem = {
  root: {
    type: "folder",
    name: "root",
    children: {
      JavaScriptOS: {
        type: "folder",
        name: "JavaScriptOS",
        id: "osroot",
        children: {
          textfile1: {
            type: "file",
            name: "VertexOS.html",
            content: "<h2>An very old project, he's proud of the OS that i made ahha</h2>",
          },
          textfile2: {
            type: "file",
            name: "RootPreset.ini",
            content:
              '<iframe src="https://pastebin.com/embed_iframe/8hc4iCpW" style="width: 100%; height: 100%;"></iframe>',
          },
        },
      },
      documents: {
        type: "folder",
        name: "Documents",
        children: {
          textfile1: {
            type: "file",
            name: "README.ME",
            content: `<h2>Welcome to JavaScriptOS</h2> 
                                  JavaScriptOS is a simple web based OS where you can code in JavaScript and other stuff!
                                  Made in the 14th May 2023, it took me about 20 hours to make it, i also need to improve the code because its not the best`,
          },
          textfile2: {
            type: "file",
            name: "Author.ini",
            content: "4shktz & ChatGPT (helped me a bit)",
          },
        },
      },
      Programs: {
        type: "folder",
        name: "Programs",
        children: {
          AudioPlayer: {
            type: "folder",
            name: "Audio Player",
            children: {
              textfile6: {
                type: "js",
                name: "play.js",
                content: `playAudio()`,
              },
              textfile7: {
                type: "js",
                name: "stop.js",
                content: `stopAudio();`,
              },
            },
          },
        },
      },
    },
  },
};

function openFileExplorer() {
  const fileExplorer = document.getElementById("fileExplorer");
  fileExplorer.style.display = "block";

  $(fileExplorer).draggable();
  populateFileExplorer();
}

function populateFileExplorer() {
  const fileExplorerContent = document.getElementById("fileExplorerContent");

  function createEntry(entry) {
    const item = document.createElement("div");
    item.className = "entry";

    let iconSrc = "https://www.svgrepo.com/show/788/folder.svg";

    if (entry.type === "file") {
      const fileExt = entry.name.split(".").pop().toLowerCase();

      if (fileExt === "jpg" || fileExt === "png" || fileExt === "gif") {
        iconSrc = "https://www.svgrepo.com/show/501819/photo.svg";
      } else {
        iconSrc = "https://www.svgrepo.com/show/444800/file.svg";
      }
    } else if (entry.type === "folder") {
      if (entry.id === "osroot") {
        iconSrc = "https://www.svgrepo.com/show/528666/ssd-square.svg";
      } else {
        iconSrc = "https://www.svgrepo.com/show/788/folder.svg";
      }
    }

    const icon = document.createElement("img");
    icon.src = iconSrc;

    const label = document.createElement("span");
    label.textContent = entry.name;

    item.appendChild(icon);
    item.appendChild(label);

    item.addEventListener("click", () => {
      if (entry.name === '..') {
        goUpOneLevel();
      } else if (entry.type === "folder") {
        openFolder(entry);
      } else if (entry.type === "file") {
        openFile(entry);
      } else if (entry.type === "js") {
        eval(entry.content);
      }
    });

    item.parentFolder = getCurrentFolder() || fileSystem.root;
    fileExplorerContent.appendChild(item);

    fileExplorerContent.addEventListener("click", () => {
      const contextMenus = document.getElementsByClassName("context-menu");

      for (const contextMenu of contextMenus) {
        contextMenu.style.display = "none";
      }
    });
  }

  function goUpOneLevel() {
    const currentFolder = getCurrentFolder();

    if (currentFolder) {
      openFolder(currentFolder);
    }
  }

  function getCurrentFolder() {
    const fileExplorerContent = document.getElementById("fileExplorerContent");
    const entries = fileExplorerContent.getElementsByClassName("entry");

    for (const entry of entries) {
      if (entry.textContent === '..') {
        return entry.parentFolder;
      }
    }

    return null;
  }

  function openFolder(folder) {
    fileExplorerContent.innerHTML = "";

    createEntry({
      name: "..",
      type: "folder"
    });

    Object.values(folder.children).forEach((child) => createEntry(child));
  }

  const fileEntries = fileExplorerContent.getElementsByClassName("entry");

  for (const entry of fileEntries) {
    if (entry.entry.type === "file") {
      entry.addEventListener("contextmenu", (event) => {
        event.preventDefault();

        const contextMenu = entry.contextMenu || createContextMenu(entry.entry);
        contextMenu.style.top = event.clientY + "px";
        contextMenu.style.left = event.clientX + "px";
        contextMenu.style.display = "block";

        entry.contextMenu = contextMenu;

        window.addEventListener("click", () => {
          contextMenu.style.display = "none";
        });
      });
    }
  }

  function openFile(file) {
    const fileContentWindow = document.getElementById("fileContent");
    const fileContentTitle = document.getElementById("fileContentTitle");
    const fileContentBody = document.getElementById("fileContentBody");

    fileContentTitle.textContent = file.name;
    fileContentBody.innerHTML = file.content;

    fileContentWindow.style.display = "block";
    $(fileContentWindow).draggable();
  }

  openFolder(fileSystem.root);
}

function createContextMenu(entry) {
  const contextMenu = document.createElement("div");
  contextMenu.className = "context-menu";
  contextMenu.style.display = "none";

  const deleteOption = document.createElement("div");
  deleteOption.textContent = "Delete";

  deleteOption.onclick = () => {
    const folder = getCurrentFolder();
    if (!folder) return;

    delete folder.children[entry.name];

    alert(`File '${entry.name}' deleted successfully.`);
    populateFileExplorer();
  };

  const renameOption = document.createElement("div");
  renameOption.textContent = "Rename";

  renameOption.onclick = () => {
    const newName = prompt("Enter the new name:");
    if (!newName) return;

    const folder = getCurrentFolder();

    if (folder && folder.children[entry.name]) {
      folder.children[newName] = folder.children[entry.name];
      delete folder.children[entry.name];

      entry.name = newName;

      alert(`File renamed to '${newName}' successfully.`);
      populateFileExplorer();
    }
  };

  contextMenu.appendChild(deleteOption);
  contextMenu.appendChild(renameOption);

  return contextMenu;
}

let audioPlayer;

function playAudio() {
  const url = prompt("Please enter the URL of the .mp3 file:", "");
  if (url) {
    audioPlayer = new Audio(url);
    audioPlayer.play();
  } else {
    alert("Invalid URL. Please enter a valid .mp3 file URL.");
  }
}

function stopAudio() {
  if (audioPlayer) {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
  }
}
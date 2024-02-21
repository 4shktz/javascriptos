const JavascriptCompiler = document.getElementById("compilerWindow");

function openWikipedia() {
    const wikipediaBrowser = document.getElementById("wikipediaBrowser");
    wikipediaBrowser.style.display = "block";
  
    $(wikipediaBrowser).draggable();
    $(JavascriptCompiler).resizable();
}
function openCase(evt, caseName) {
  var i, caseContent, tablinks;

  // Hide all case contents
  caseContent = document.getElementsByClassName("case");
  for (i = 0; i < caseContent.length; i++) {
    caseContent[i].style.display = "none";
  }

  // Remove the background color of all tablinks/buttons
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }

  // Show the current case, and add an "active" class to the button that opened the case
  document.getElementById(caseName).style.display = "block";
  evt.currentTarget.style.backgroundColor = "#ccc";
}

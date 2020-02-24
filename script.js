/*  Name        : script.js
    Author      : Isaac Vander Sluis
    Description : Handles logic for web app */

function login(form){
  if (form.email.value == "honeyguy@gmail.com" &&
      form.password.value == "password") {
    window.location.href = "search.html";
  } else {
    alert("Invalid login");
    form.reset();
  }
}

function loadXMLDoc(filename) {
  if (window.ActiveXObject) {
    xhttp = new ActiveXObject("Msxml2.XMLHTTP");
  } else {
    xhttp = new XMLHttpRequest();
  }
  xhttp.open("GET", filename, false);
  try {xhttp.responseType = "msxml-document"} catch(err) {} // Helping IE11
  xhttp.send("");
  return xhttp.responseXML;
}

function displayResult() {
  xml = loadXMLDoc("pots.xml");
  xsl = loadXMLDoc("pots.xsl");
  // code for IE
  if (window.ActiveXObject || xhttp.responseType == "msxml-document") {
    ex = xml.transformNode(xsl);
    document.getElementById("example").innerHTML = ex;
  }
  // code for Chrome, Firefox, Opera, etc.
  else if (document.implementation && document.implementation.createDocument) {
    xsltProcessor = new XSLTProcessor();
    xsltProcessor.importStylesheet(xsl);
    resultDocument = xsltProcessor.transformToFragment(xml, document);
    document.getElementById("example").appendChild(resultDocument);
  }
}
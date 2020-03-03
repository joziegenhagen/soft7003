/*  Name        : script.js
    Author      : Isaac Vander Sluis
    Description : Handles logic for web app */
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        showResult(xhttp.responseXML);
    }
};
xhttp.open("GET", "passwords.xml", true);
xhttp.send(); 
function login(form) {
    var txt = "";
    path = "/users/user/name[text()]";
    if (xml.evaluate) {
        var nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
        var result = nodes.iterateNext();
        while (result) {
            txt += result.childNodes[0].nodeValue + "<br>";
            result = nodes.iterateNext();
        } 
    // Code For Internet Explorer
    } else if (window.ActiveXObject || xhttp.responseType == "msxml-document") {
        xml.setProperty("SelectionLanguage", "XPath");
        nodes = xml.selectNodes(path);
        for (i = 0; i < nodes.length; i++) {
            txt += nodes[i].childNodes[0].nodeValue + "<br>";
        }
    }
}

function xslTest(searchterm) {
  console.log(searchterm);
  node = document.createElement("p")
  textnode = document.createTextNode(searchterm);
  node.appendChild(textnode);
  document.getElementById("result").appendChild(node);
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
    document.getElementById("result").innerHTML = ex;
  }
  // code for Chrome, Firefox, Opera, etc.
  else if (document.implementation && document.implementation.createDocument) {
    xsltProcessor = new XSLTProcessor();
    xsltProcessor.importStylesheet(xsl);
    resultDocument = xsltProcessor.transformToFragment(xml, document);
    document.getElementById("result").appendChild(resultDocument);
  }
}



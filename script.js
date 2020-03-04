/*  Name        : script.js
    Author      : Isaac Vander Sluis
    Description : Handles logic for web app */
var xhttp = new XMLHttpRequest();
xhttp.open("GET", "passwords.xml", true);
xhttp.send(); 

function login(form) {

    path = `/users/user[name=${email}]/name[text()]`;
    var email = xhttp.responseXML.evaluate(path,xhttp.responseXML,null,XPathResult.ANY_TYPE,null);
    
    path = `/users/user[name=${password}]/password[text()]`;
    var password = xhttp.responseXML.evaluate(path,xhttp.responseXML,null,XPathResult.ANY_TYPE,null);
 
    window.alert(email);
    window.alert(password);
    
    var formEmail = form.email.value;
    var formPassword = form.password.value;
    
    if(formEmail == email && formPassword == password){
    window.location.href = "search.html";
  } else {
    alert("Invalid login");
    form.reset();
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

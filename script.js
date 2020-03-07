/*  Name        : script.js
    Author      : Isaac Vander Sluis
    Description : Handles logic for web app */


function login(form) { 
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
                getResult(xhttp.responseXML, form)
        }  
    };
xhttp.open("GET", "passwords.xml", true);
xhttp.send(); 
}

function getResult(xml, form){

    var formEmail = form.email.value;
    var formPassword = form.password.value;


    if (xml.evaluate) {
        var email = xml.evaluate("/users/user/name", xml, null, XPathResult.ANY_TYPE, null);
        var emailNode = email.iterateNext();
        var password = xml.evaluate("/users/user/password", xml, null, XPathResult.ANY_TYPE, null);
        var passwordNode = password.iterateNext();
        while (emailNode) {
            if(emailNode.childNodes[0].nodeValue == formEmail && passwordNode.childNodes[0].nodeValue == formPassword){
              window.location.href = "search.html";
            }else{
              emailNode = emailNode.iterateNext();
              passwordNode = passwordNode.iterateNext();

            }
            
        }if(email == null){
            alert("Invalid login");
            form.reset();
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

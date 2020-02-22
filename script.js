/*  Name        : script.js
    Author      : Isaac Vander Sluis
    Description : Handles logic for web app */

function login(form){
  if (form.email.value == "honeyguy@gmail.com" && form.password.value == "password") {
    window.location.href = "search.html";
  } else {
    alert("Invalid login");
    form.reset();
  }
}
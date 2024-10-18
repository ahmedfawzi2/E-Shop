/*** 1- initalization */
let myCard = JSON.parse(localStorage.product || '[]');
let contactUs=document.getElementById("contactUs");
let contacts=document.getElementById("contacts");
document.getElementById("myForm").addEventListener("submit", submitForm);
document.getElementById("count").innerHTML = myCard.length;
let valid = document.getElementById("valid");
/*** 2- nav */
function nav() {
    var navElement = document.getElementById("nav");
    navElement.classList.toggle("responsive");
}

/*** 3- make cookie*/
function saveCookie(key, value) {
    let myDate = new Date();
    myDate.setDate(myDate.getDate() + 1);
    document.cookie = key + "=" + value + ";expires=" + myDate;
}
function getCookie(key){
    let name = key + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookieArray = decodedCookie.split(';');
    for(let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}

/*** 4- validate inp */
let fullName=document.getElementById("fullName");
fullName.addEventListener("input", checkName)
function checkName(){
    if(fullName.value==""||/[0-9]/.test(fullName.value)){
        fullName.style.border="1px solid red";
        return false;
    }
    else{
        fullName.style.border="";
        saveCookie("fullName",fullName.value);
        return true;
    }
}
let email=document.getElementById("email");
email.addEventListener("input", checkEmail);
function checkEmail(){
    if(! /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)){
        email.style.border="1px solid red";
        return false;
    }
    else{
        email.style.border="";
        saveCookie("email",email.value);
        return true;
    }
}
let phone=document.getElementById("phone");
phone.addEventListener("input", checkPhone);
function checkPhone(){
    if(! /^01[0125][0-9]{8}$/.test(phone.value)){
        phone.style.border="1px solid red";
        return false;
    }
    else{
        phone.style.border="";
        saveCookie("phone",phone.value);
        return true;
    }
}
let password=document.getElementById("password");
password.addEventListener("input", checkPassword);
function checkPassword(){
    if(! /^(?=.*[a-zA-Z]).{8,}$/.test(password.value)){
        password.style.border="1px solid red";
        return false;
    }
    else{
        password.style.border="";
        saveCookie("password",password.value);
        return true;
    }
}
let address=document.getElementById("address");
address.addEventListener("input", checkAddresses);
function checkAddresses(){
    if(address.value==""||Number(address.value)){
        address.style.border="1px solid red";
        return false;
    }
    else{
        address.style.border="";
        saveCookie("address",address.value);
        return true;
    }
}
let msg=document.getElementById("message");
msg.addEventListener("input", checkMsg);
function checkMsg(){
    if(msg.value==""){
        msg.style.border="1px solid red";
        return false;
    }
    else{
        msg.style.border="";
        saveCookie("message",msg.value);
        return true;
    }
}
function check(){
    valid.style.display="none";
    if(!checkName()){
        swal({
            title: "Error",
            text: "Please enter a valid name (Name Can't have numbers or empty)!",
            icon: "error",
        });
        return false;
    }
    else if(!checkEmail()){
        swal({
            title: "Error",
            text: "Please enter a valid email (should have @ and .com )!",
            icon: "error",
        })
        return false;
    }
    else if(!checkPassword()){
        swal({
            title: "Error",
            text: "Please enter a valid password (at least 8 characters and at least one letter)!",
            icon: "error",
        })
        return false;
    }
    else if(!checkPhone()){
        swal({
            title: "Error",
            text: "Please enter a valid phone number 10 digit shart with [010-011-012-015] as (01012345678)!",
            icon: "error",
        })
        return false;
    }
    else if(!checkAddresses()){
        swal({
            title: "Error",
            text: "Please enter a valid address!",
            icon: "error",
        })
        return false;
    }
    else if(!checkMsg()){
        swal({
            title: "Error",
            text: "Please enter a valid message!",
            icon: "error",
        })
        return false;
    }
    else{
        return true;
    }
}

/*** 5- submit form */
function submitForm(event) {
    event.preventDefault();
    if(check()){
        console.log("Done");
        contactUs.innerHTML = `
            <p>${getCookie("fullName")} , Thank you for contacting us! </p>
        `;
        contacts.innerHTML = `
            <p>We will get back to you soon! In Your Email <span id="email">${getCookie("email")}</span> Or In Your Phone ${getCookie("phone")}</p>
        `;
        fullName.value = email.value = phone.value = password.value = address.value = msg.value = "";
    }
    else{
        valid.style.display="block";
        valid.innerHTML="Please Enter Valid Data";
    }
}

/*** 6- back to top btn */
document.addEventListener("DOMContentLoaded", function() {
    var btn = document.getElementById("backToTopBtn");
    window.addEventListener("scroll", function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        btn.style.display = "block";
        } else {
        btn.style.display = "none";
        }
    });
    btn.addEventListener("click", function() {
        document.documentElement.scrollTop = 0; 
    });
});

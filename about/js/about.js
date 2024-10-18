/*** 1- initalization */
let myCard = JSON.parse(localStorage.product || '[]');
document.getElementById("count").innerHTML = myCard.length;

/*** 2- nav */
function nav() {
    var navElement = document.getElementById("nav");
    navElement.classList.toggle("responsive");
}

/*** 3- back to top btn */
document.addEventListener("DOMContentLoaded", function() {
    let btn = document.getElementById("backToTopBtn");
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
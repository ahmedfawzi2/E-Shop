/*** 1- initalization */
let myCard = JSON.parse(localStorage.product || '[]');
document.getElementById("count").innerHTML = myCard.length;
let urlParams = new URLSearchParams(window.location.search);
let productId = urlParams.get('id');
let src=document.getElementById("image");
let title=document.getElementById("title");
let price=document.getElementById("price");
let description=document.getElementById("about");
let category=document.getElementById("category");
let cardbtn = document.getElementById('addToCart');

/*** 2- nav */
function nav() {
    var navElement = document.getElementById("nav");
    navElement.classList.toggle("responsive");
}

/*** 3- product  */
async function getproduct(productId) {
    console.log("jh");
    let response = await fetch(`https://json-blush-psi.vercel.app/products/?id=${productId}`)
    let data = await response.json();
    src.setAttribute("src",data[0].image);
    title.innerHTML=data[0].title;
    price.innerHTML=`${data[0].price} $`;
    description.innerHTML=data[0].description;
    category.innerHTML=data[0].category;
    for (let i = 0; i < myCard.length; i++) {
        if (myCard[i].id == data[0].id) {
            document.getElementById("addToCart").style.display = "none";
            break;
        }
    }
}
getproduct(productId);

/*** 4- card btn */

function updateCardCounter(counter){
    document.getElementById("count").innerHTML = counter;
}
cardbtn.addEventListener('click',
    async function(){
        document.getElementById("addToCart").style.display = "none";
        try{
            let response = await fetch(`https://json-blush-psi.vercel.app/products/?id=${productId}`)
            let data = await response.json();
            myCard.push({
                id: data[0].id,
                title: data[0].title,
                image: data[0].image,
                price: data[0].price,
                category: data[0].category,
                description: data[0].description,
                quantity: 1
            });
            localStorage.setItem('product', JSON.stringify(myCard))
            updateCardCounter(myCard.length);
            swal({
                title: "Success",
                text: "Product added successfully!",
                icon: "success",
            });
        }
        catch(err){
            swal({
                title: "Error",
                text: "Product not added!",
                icon: "error",
            });
        }finally{
            document.getElementById("addToCart").style.display = "block";
            getproduct(productId);
        }
    }
);

/*** 5- back to top btn */
document.addEventListener("DOMContentLoaded", function () {
    let btn = document.getElementById("backToTopBtn");
    window.addEventListener("scroll", function () {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            btn.style.display = "block";
            btn.style.scrollBehavior = "smooth";
        } else {
            btn.style.display = "none";
        }
    });
    btn.addEventListener("click", function () {
        document.documentElement.scrollTop = 0;
    });
});


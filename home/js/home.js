// Initialization
let count = 1;
let myCard = JSON.parse(localStorage.product || '[]');

// Function to update card counter
function updateCardCounter(counter) {
    document.getElementById("count").innerHTML = counter;
}
updateCardCounter(myCard.length);

// Navigation
function nav() {
    var navElement = document.getElementById("nav");
    navElement.classList.toggle("responsive");
}

// Slider
let myImg = document.getElementById("img");
function back() {
    count = (count === 1) ? 5 : count - 1;
    updateImageSource();
}
function next() {
    count = (count === 5) ? 1 : count + 1;
    updateImageSource();
}
setInterval(() => next(), 5000);
function updateImageSource() {
    myImg.setAttribute("src", `./imgs/${count}.png`);
}

// Category
function getCategory() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        var data = document.getElementById("category");
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                let userData = JSON.parse(xhr.response)
                createCategoryButtons(data, userData);
            }
        }
    };
    xhr.open("GET", "https://json-blush-psi.vercel.app/Categories");
    xhr.send("");
}
function createCategoryButtons(data, userData) {
    var btn = document.createElement('button');
    btn.setAttribute("onclick", "getAllProducts()");
    btn.innerHTML = "All";
    data.append(btn);
    for (var i = 0; i < userData.length; i++) {
        btn = document.createElement('button');
        btn.setAttribute("onclick", `show(${userData[i].id})`);
        btn.innerHTML = userData[i].title;
        data.append(btn);
    }
}
getCategory();

// Products
function reset() {
    let data = document.getElementById("products");
    data.innerHTML = "";
}
async function displayProduct(productsData) {
    reset();
    let data = document.getElementById("products");
    let loaded=productsData.length;
    for (let i = 0; i < productsData.length; i++) {
        let div = createProductCard(productsData[i]);
        data.append(div);
        loaded--;
        if(loaded==0){
            document.getElementById("spiner").style.display="none";
            document.getElementById("products").style.display="flex";
            document.getElementById("category").style.display="flex";
        }
    }
}
function createProductCard(productData) {
    let div = document.createElement('div');
    div.setAttribute('class', "cardProduct");
    div.innerHTML = `
        <img class="img-product" src="${productData.image}" onclick="detail(${productData.id})" alt="" />
        <div class="info">
            <p class="taitlebarnd" id="brand-${productData.id}">${productData.category}</p>
            <h3 class="taitleProduct">${productData.title}</h3>
            <h4 class="priceProduct">$${productData.price}</h4>
            <div class="shopping" id="cart_icon-${productData.id}">
                <div class="" onclick="addToCart(${productData.id})">🛒</div>
            </div>
        </div>
    `;
    setTimeout(() => {
        let icon = document.getElementById(`cart_icon-${productData.id}`);
        if (icon) {
            for (let i = 0; i < myCard.length; i++) {
                if (myCard[i].id == productData.id) {
                    icon.style.display = "none";
                    break;
                }
            }
        }
    }, 0);
    return div;
}
function getAllProducts() {
    var buttons = document.getElementsByTagName('button');
    resetButtonColors(buttons);
    var selectedButton = document.querySelector('button[onclick="getAllProducts()"]');
    if (selectedButton) {
        selectedButton.style.color = '#FF6341';
    }
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var userData = JSON.parse(xhr.response)
                displayProduct(userData);
            }
        }
    };
    xhr.open("GET", "https://json-blush-psi.vercel.app/products");
    xhr.send("");
}
async function show(id) {
    var buttons = document.getElementsByTagName('button');
    resetButtonColors(buttons);
    var selectedButton = document.querySelector(`button[onclick="show(${id})]`);

    if (selectedButton) {
        selectedButton.style.color = '#FF6341';
        // selectedButton.disabled = true;
    }
    try {
        let catRespose = await fetch(`https://json-blush-psi.vercel.app/Categories/?id=${id}`);
        let catData = await catRespose.json();
        let response = await fetch(`https://json-blush-psi.vercel.app/products/?category=${catData[0].title}`);
        let userData = await response.json();
        displayProduct(userData);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}
function resetButtonColors(buttons) {
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].style.color = '';
    }
}

getAllProducts();

// Cart
async function addToCart(id) {
    let icon = document.getElementById(`cart_icon-${id}`);
    icon.style.display = 'none';
    try{
        let response = await fetch(`https://json-blush-psi.vercel.app/products/?id=${id}`)
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
        // addProductToCart(data[0]);
    }
    catch(err){
        swal({
            title: "Error",
            text: "Product not added!",
            icon: "error",
        });
    }finally{
        getAllProducts();
    }
}

// Detail
function detail(id) {
    window.location.href = `../../detail/detail.html?id=${id}`;
}

// Back to Top
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

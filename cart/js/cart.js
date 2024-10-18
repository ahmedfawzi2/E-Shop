/*** 1- initalization */
let myCard = JSON.parse(localStorage.product || '[]');
let totalPrice = parseFloat(localStorage.totalPrice) || 0;
document.getElementById("count").innerHTML = myCard.length;
document.getElementById("length").innerHTML = myCard.length;
show();
/*** 2- nav */
function nav() {
    var navElement = document.getElementById("nav");
    navElement.classList.toggle("responsive");
}

/*** 3- updates fn (Ls - Display) */
function updateLocalStorage() {
    localStorage.product = JSON.stringify(myCard);
    localStorage.totalPrice =totalPrice;
}
function updateTotalDisplay(value) {
    let array = document.getElementsByClassName("total");
    for (let i = 0; i < array.length; i++) {
        array[i].innerHTML = value.toFixed(2);
    }
}

/*** 4- display item in card */
function reset() {
    var data = document.getElementById("card");
    data.innerHTML ="";
    totalPrice = 0;
    updateLocalStorage();
}
function show() {
    reset();
    for (let i = 0; i < myCard.length; i++) {
        var data = document.getElementById("card");
        var div = document.createElement('div');
        div.setAttribute('class', "cart-card");
        div.innerHTML = `
            <div class="cartCard-image">
                <img src="${myCard[i].image}" alt="" onclick="detail(${myCard[i].id})">
            </div>
            <div class="cartCard-details">
                <p class="cartProduct-name">${myCard[i].title}</p>
                <h5 class="cartProduct-price" id="total-${i}"> ${myCard[i].price*myCard[i].quantity} $</h5>
                <div class="counter-container">
                    <div class="counter">
                        <input type="button" id="sub-${i}" onclick="sub(${i})" value="-" class="minus">
                        <input type="number" id="quantity-${i}" name="quantity" class="counter-disabled ng-untouched ng-pristine" disabled="" value="${myCard[i].quantity}">
                        <input type="button" id="sum-${i}" onclick="sum(${i})" value="+" class="plus">
                    </div>
                </div>
                <div class="cart-actions" onclick="remove(${i})">
                    <p>
                        <span class="glyphicon glyphicon-trash"></span>
                        Remove 
                    </p>
                </div>
            </div>
        `;
        data.append(div);
        totalPrice +=(myCard[i].price*myCard[i].quantity);
    }
    if(myCard.length==0){
        document.getElementById("check").style.display="none";
    }
    updateLocalStorage();
    updateTotalDisplay(totalPrice);
}

/*** 5- action on items (remove , change quantity) */
function remove(i) {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this item!",
        icon: "warning",
        buttons: {
            cancel: "Cancel",
            confirm: "Delete",
        },
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            totalPrice -= (myCard[i].price*myCard[i].quantity);
            myCard.splice(i, 1);
            updateLocalStorage();
            show();
            // updateTotalDisplay(totalPrice);
            swal({
                title: "Success",
                text: "Product Deleted From Card successfully!",
                icon: "success",
            });
            setTimeout(function() {
                if (myCard.length == 0) {
                    window.location.href = `../../index.html`;
                }   
            }, 1000);
            
        } else {
            swal({
                title: "Cancelled",
                text: "Deleted Cancelled!",
                icon: "success",
            });
        }
    });
}
function sum(id) {
    let value = myCard[id].quantity;
    if (value <= 10) {
        value++;
        myCard[id].quantity = value;
        totalPrice +=myCard[id].price;
        updateLocalStorage();
        show();
    }
}
function sub(id) {
    let value = myCard[id].quantity;
    if (value > 1) {
        value--;
        myCard[id].quantity = value;
        totalPrice -= myCard[id].price;
        updateLocalStorage();
        show();
    }
}

/*** 6- detail for each item */
function detail(id) {
    window.location.href = `../../detail/detail.html?id=${id}`;
}

/*** 7- back to top btn */
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

/******************/
function shop(){
    window.location.href = `../../index.html`;
}
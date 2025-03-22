let coin = 0;
const cookie_el = document.getElementById("cookie");
const money_display = document.getElementById("money-display");
const shop_blok = document.getElementById("shop");

const min = -10;
const max = 10;

const cost = [0,10,100,1000]; // first number - interface
let purchased_item = [];

function click_cookie() {
    if (this.children != undefined){
        if (purchased_item.includes(1)) {
            coin += 2;
        } else {
            coin += 1;
        }
    } else {
        // auto click
        coin += 1;
    }
    update_coin (coin);
    cookie_el.style.top = `${Math.floor(Math.random() * (max - min + 1)) + min}px`;
    cookie_el.style.right = `${Math.floor(Math.random() * (max - min + 1)) + min}px`;
    setTimeout(()=> {
        cookie_el.style.top = '0px';
        cookie_el.style.right = '0px';
    }
    ,100)
}

function update_coin(num) {
    localStorage.setItem('coin',coin);
    money_display.textContent = `${num}$`;
    update_shop_offer ();
}

function update_shop_offer () {
    const offers = shop_blok.children;
    for (let i = 0; i < offers.length; i++) {
        if (i === 0) {
            continue
        }
        if (purchased_item.includes(i)) {
            offers[i].style.backgroundColor = 'var(--gets-offer)'; 
        }
        else if (coin >= cost[i]) {
            offers[i].style.backgroundColor = 'var(--free-offer)'; 
        }
        else {
            offers[i].style.backgroundColor = 'var(--close-offer)'; 
        }
    }
}

function buy_item () {
    const offers = shop_blok.children;
    const index = Array.prototype.indexOf.call(offers, this);
    if (purchased_item.includes(index)) {
        // message ('это уже купленно :3')
    }
    else if (coin >= cost[index]) {
        purchased_item.push(index);
        coin -= cost[index]
        update_coin (coin);
    }
    localStorage.setItem('purchased_item', JSON.stringify(purchased_item));
}


function shop_init () {
    const offers = shop_blok.children;
    for (let i = 0; i < offers.length; i++) {
        if (i === 0) {
            continue
        }
        offers[i].addEventListener('click', buy_item);
        cost_label = offers[i].children;
        cost_label[0].textContent = `цена:${cost[i]}`
    }
}

function init () {
    const savedCoin = localStorage.getItem('coin');
    const savedItem = localStorage.getItem('purchased_item');
    if (savedCoin != undefined) {
        coin = savedCoin ? parseInt(savedCoin, 10) : 0;
    }
    if (savedItem != undefined) {
        purchased_item = savedItem ? JSON.parse(savedItem) : [];
    }
    update_coin (coin);
    shop_init ();
    setInterval (() => {
        if (purchased_item.includes(2)) {
            click_cookie ();
        }
    }, 10000)
}

init ();

cookie_el.addEventListener('click', click_cookie);
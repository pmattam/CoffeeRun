var coffeeForm = document.querySelector("[data-coffee-order='form']");
var coffeeOrder = document.querySelector("[name='coffee']");
var emailAddress = document.querySelector("[name='emailAddress']");
var size = document.querySelector("[name='size']");
var flavor = document.querySelector("[name='flavor']");
var strength = document.querySelector("[name='strength']");
var orderList = document.querySelector('.order-list');
var table = document.createElement('table');
var listOrders = [];

var addOrder = function(obj) {
    var row = table.insertRow();
    var coffeeOrderCell = row.insertCell(0);
    coffeeOrderCell.textContent = obj["coffeeOrder"];
    var emailCell = row.insertCell(1);
    emailCell.textContent = obj["emailAddress"];
    var sizeCell = row.insertCell(2);
    sizeCell.textContent = obj["size"];
    var flavorCell = row.insertCell(3);
    flavorCell.textContent = obj["flavor"];
    var strengthCell = row.insertCell(4);
    strengthCell.textContent = obj["strength"];  
    var removeCell = row.insertCell(5);
    removeCell.textContent = "X";
    orderList.appendChild(table);
    console.log(row);
};

var saveOrders = function(objs) {
    var jsonObjStr = JSON.stringify(objs);
    console.log(jsonObjStr);
    localStorage.setItem("orders", jsonObjStr);
};

coffeeForm.addEventListener('submit', function(event){
    event.preventDefault();
    var obj = {};
    obj["coffeeOrder"] = coffeeOrder.value;
    obj["emailAddress"] = emailAddress.value;
    obj["size"] = size.value;
    obj["flavor"] = flavor.value;
    obj["strength"] = strength.value;
    listOrders.push(obj);
    addOrder(obj);
    saveOrders(listOrders);
});  

var displayOrders = function() {
    var orderStr = localStorage.getItem("orders");
    console.log(orderStr);
    listOrders = JSON.parse(orderStr);
    console.log(listOrders);
    for(i=0; i<listOrders.length; i++) {
        addOrder(listOrders[i]);
    }
};

var removeOrder = function() {
    for(i=0; i<table.rows.length; i++) {
        table.rows[i].cells[5].addEventListener('click', function() {
            var index = this.parentElement.rowIndex;
            // console.log("hello");
            // console.log(table.rows[index]);
            var toDelEmail = table.rows[index].cells[1].textContent;
            console.log(toDelEmail);
            toDel = listOrders.filter(function(el) {
                return el.emailAddress !== toDelEmail;
            });
            console.log(toDel);
            listOrders = toDel;
            table.deleteRow(index);
            saveOrders(listOrders);
        });
    }
};

displayOrders();
removeOrder();

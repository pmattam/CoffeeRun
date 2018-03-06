var coffeeForm = document.querySelector("[data-coffee-order='form']");
var coffeeOrder = document.querySelector("[name='coffee']");
var emailAddress = document.querySelector("[name='emailAddress']");
var flavor = document.querySelector("[name='flavor']");
var strength = document.querySelector("[name='strength']");
var orderList = document.querySelector('.order-list');
var table = document.createElement('table');
var listOrders = [];
var URL = 'https://dc-coffeerun.herokuapp.com/api/coffeeorders';

var getCoffeeForm = function(size) {
    var obj = {};
    obj["coffeeOrder"] = coffeeOrder.value;
    obj["emailAddress"] = emailAddress.value;
    obj["size"] = size
    obj["flavor"] = flavor.value;
    obj["strength"] = strength.value;
    return obj;
};

var mapFromCoffeeForm = function(order) {
    var myData = {
        "coffee": order["coffeeOrder"],
        "emailAddress": order["emailAddress"],
        "size": order["size"],
        "flavor": order["flavor"],
        "strength": order["strength"]
    };
    return myData;
};

var mapToCoffeeForm = function(orderData) {
    var mappedData = {
        "coffeeOrder": orderData.coffee,
        "emailAddress": orderData.emailAddress,
        "size": orderData.size, 
        "flavor": orderData.flavor, 
        "strength": orderData.strength
    };
    return mappedData;
};

var addOrderToTable = function(orderObj) {
    var row = table.insertRow();
    var coffeeOrderCell = row.insertCell(0);
    coffeeOrderCell.textContent = orderObj["coffeeOrder"];
    var emailCell = row.insertCell(1);
    emailCell.textContent = orderObj["emailAddress"];
    var sizeCell = row.insertCell(2);
    sizeCell.textContent = orderObj["size"];
    var flavorCell = row.insertCell(3);
    flavorCell.textContent = orderObj["flavor"];
    var strengthCell = row.insertCell(4);
    strengthCell.textContent = orderObj["strength"];  
    var removeCell = row.insertCell(5);
    removeCell.textContent = "X";
    return table;
};

coffeeForm.addEventListener('submit', function(event) {
    event.preventDefault();
    var size = document.querySelector('[name="size"]:checked').value;
    var order = getCoffeeForm(size);
    var postData = mapFromCoffeeForm(order);
    $.post(URL, postData);
    listOrders.push(order);
    var addedOrder = addOrderToTable(order);
    orderList.appendChild(addedOrder);
    addEventListenerForX();
});  

var addEventListenerForX = function() {
    for(var i=0; i<table.rows.length; i++) {
        table.rows[i].cells[5].addEventListener('click', handleDelEvent);
    }
};

var handleDelEvent = function(event){
    event.preventDefault();
    var index = this.parentElement.rowIndex;
    var toDelEmail = table.rows[index].cells[1].textContent;
    toDel = listOrders.filter(function(el) {
        return el.emailAddress !== toDelEmail;
    });
    listOrders = toDel;
    $.ajax({url: URL+'/'+toDelEmail, method: 'DELETE', success: function(result) {
        console.log(result);
    }});
    table.rows[index].style.backgroundColor = "lightblue";
    table.rows[index].cells[5].removeEventListener('click', handleDelEvent);
    setTimeout(deleteOrder, 2000, index);
};

var deleteOrder = function(index) { 
    table.deleteRow(index);
};

var processGetData = function(serverData) {
    // getting list/array of only values (which are objects) and not keys from the server data
    var orders = Object.values(serverData); 
    // which returns a new list and assigning to my own list with mapped data
    listOrders = orders.map(mapToCoffeeForm); 
    // loop through the objects in the list and add orders and appends to the table
    listOrders.forEach(function(order) { 
        orderList.appendChild(addOrderToTable(order));
    });
    addEventListenerForX();
};

var displayOrders = function() {
    $.get(URL, processGetData);
};

displayOrders();
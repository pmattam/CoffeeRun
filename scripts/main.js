var coffeeForm = document.querySelector("[data-coffee-order='form']");
var coffeeOrder = document.querySelector("[name='coffee']");
var emailAddress = document.querySelector("[name='emailAddress']");
var size = document.querySelector("[name='size']");
var flavor = document.querySelector("[name='flavor']");
var strength = document.querySelector("[name='strength']");
var orderList = document.querySelector('.order-list');
var table = document.createElement('table');
var listOrders = [];
var URL = 'https://dc-coffeerun.herokuapp.com/api/coffeeorders';

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
};

coffeeForm.addEventListener('submit', function(event){
    event.preventDefault();
    var obj = {};
    obj["coffeeOrder"] = coffeeOrder.value;
    obj["emailAddress"] = emailAddress.value;
    obj["size"] = size.value;
    obj["flavor"] = flavor.value;
    obj["strength"] = strength.value;
    
    let myData = {
            "coffee": coffeeOrder.value,
            "emailAddress": emailAddress.value,
            "size": size.value,
            "strength": strength.value,
            "flavor": flavor.value
        };
    $.post(URL, myData);
    listOrders.push(obj);
    addOrder(obj);
});  

var displayOrders = function() {
    $.get(URL, function (data) {
        var orders = [];
        for(key in data) {
            orders.push(data[key]);
        }
        for(var i=0; i<orders.length; i++) {
            var text = orders[i];
            text = JSON.stringify(text);
            text = JSON.parse(text);
            var order = {
                "coffeeOrder": text.coffee, 
                "emailAddress" : text.emailAddress,
                "size" : text.size, 
                "flavor" : text.flavor, 
                "strength": text.strength
            };
            listOrders.push(order);
            addOrder(listOrders[i]);
            addRemoveEventListeners();
        }
    });   
};

var addRemoveEventListeners = function() {
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
    table.rows[index].style.backgroundColor = "lightgreen";
    table.rows[index].cells[5].removeEventListener('click', fn);
    // table.rows[index].cells[5].removeEventListener('click', getEventListeners(table.rows[index].cells[5].click[0].listener));
    // table.rows[index].cells[5].detachEvent('click', fn);
    setTimeout(deleteOrder, 2000, index);
    //console.log("you are here");
};

var fn = function() {
    console.log("you are here");
};

var deleteOrder = function(index) { 
    table.deleteRow(index);
};

displayOrders();
//setTimeout(removeOrder, 1000);

//window.document.removeEventListener("keydown", getEventListeners(window.document.keydown[0].listener)); 
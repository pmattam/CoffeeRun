CoffeeRun, Part 1

Lunch coma is kicking in, help keep your colleagues awake by taking coffee orders!

Using the provided starting point, create a web application that can:

Take new orders with the coffee form
Display previously submitted orders
Add a new row to the list of orders every time you submit a new order
Only allow orders with a valid email address and coffee order to be submitted
Allow a user to mark an order as completed, then remove the order
Persist coffee orders in Local Storage so orders will be remembered when you refresh the page
You can either use jQuery, or the built-in DOM APIs.

CoffeeRun, Part 2

Your coffee delegating app is taking off, but now you want anyone to be able to place an order from their computer by sending them to a central server.

So instead of storing and retrieving orders from Local Storage, we need to fetch and create orders on the server:

When the page loads, the order list should be pre-populated with orders that were already submitted to the server.
When the user submits a new order with the form, it should be sent to the coffeerun server, then added as a new row (as before).
When the barista marks an order completed, the row should be removed as before, and the order should be deleted from the server.
When the barista marks an order completed, instead of removing the row immediately, change the row's background color to green (or red) to indicate that it has been completed, and remove the row 2 seconds later. You will need to use the setTimeout() function to do this, since JavaScript doesn't have a sleep()function like Python.
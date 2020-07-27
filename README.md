# calculator
Summary - Calculator designed to broadcast the most recent result in real time. Program made use the Socket-IO feature of Flask and Javascript to broadcast in real time which utilized cache instead of database. MySQL used on server side to store, retrieve the most recent calculations and display the most recent 10 values. Flask was used on server side to serve content and redirect traffic.

In depth Explanation - 

Index- Input fields to record the input from users, and feed it to the Javascript. The button were used for selection of the type of calculation requested. "data-select" was used to record the type. 


Result.js- Equation is calculated here based on the case selected in index.html. 
var user1=document.getElementById("username1").innerHTML; -> returns the value of the name input from index
return  {'user':user1,'result':r,'num1':n1,'num2':n2,'action':c -> Gives the complete equation along with the name of the user who requested it
Function valitadting -> to ensure input fields have the appropriate input
Socket.IO is configured to load as soon as the document loads. It detects any button clicked on index.html and emits 'finalresult' and also inserts the result of the quation into the index

App.py- Reroutes traffic at homepage to index.html (render_template). Socketio on detecting "final result" fetches the database and inserts data. Socket "firstconnect" upon connecting to the page loads the recent 10 results

Java.js- To ensure proper input


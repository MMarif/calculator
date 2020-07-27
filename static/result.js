

function showresult(choise){
var n1=parseFloat(document.getElementById('num1').value);
var n2=parseFloat(document.getElementById('num2').value);
var r;
var c=choise;

switch(c)
    {
    case '+':
        r=n1+n2;
        break;
    case '-':
        r=n1-n2;
        break;
    case '*':
        r=n1*n2;
        break;
    case '/': 
        r=n1/n2;
        break;
    default:
        break;
            
    }
//document.getElementById("result").innerHTML =  r;
if(document.querySelector('#votes').children.length>10)
    {document.querySelector('#votes').children[0].remove();
console.log("removing")}
var user1=document.getElementById("username1").innerHTML;
return  {'user':user1,'result':r,'num1':n1,'num2':n2,'action':c}
}

function validating(){
    var w=document.getElementById('num1').value;
    var q=document.getElementById('num2').value;
if(w=="" || w== undefined || w== null)
    return false;
if(q=="" || q== undefined || q== null)
    return false;
return true;
    
}
function takeussername(){
var person = prompt("Please enter your name", "some person");
if (person == null || person == "") {
   takeussername();
  } else {
   return person;
  }

}

document.addEventListener('DOMContentLoaded', () => {

document.getElementById("username1").innerHTML= takeussername();
    // Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    // When connected, configure buttons
    socket.on('connect', () => {


        // Each button should emit a "submit vote" event
        document.querySelectorAll('button').forEach(button => {
            button.onclick = () => {
                if(validating()){
            	const selection = button.dataset.select;
                //showresult(selection)
                var calcresult= showresult(selection);
                socket.emit('finalresult',calcresult);
           document.getElementById("result").innerHTML =  calcresult.result;}
            };
        });


    });
 socket.on('announce vote', data => {

        const li = document.createElement('li');
        li.innerHTML = `${data.user}:${data.num1}${data.action}${data.num2}=${data.result}`;
        document.querySelector('#votes').append(li);
        if(document.querySelector('#votes').children.length>10)
    {document.querySelector('#votes').children[0].remove();
console.log("removing")}
    });
  socket.on('update log', data1 => {
    var row;
    var rows=JSON.parse(data1);
    console.log(rows);
    
    for(var i = 0; i < rows.length && i<=10; i++) {
    var obj = rows[i];
 const li = document.createElement('li');
var r=''+obj[0]+':'+obj[1]+obj[2]+obj[3]+'='+obj[4];
console.log(r);
        li.innerHTML = r;
        document.querySelector('#votes').append(li);
    
}
   /*for (row in rows) {
     const li = document.createElement('li');
var r=''+row[0]+':'+row[1]+row[2]+row[3]+'='+row[4];
console.log(r);
        li.innerHTML = r;
        document.querySelector('#votes').append(li);
        i=i+1;
        if(i>10){break;}*/
    
        
    });
  socket.emit('firstconnect');
    });

//import {showresult} from './java.js'

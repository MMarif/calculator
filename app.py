import os
import requests

from flask import Flask, jsonify, render_template, request
from flask_socketio import SocketIO, emit
import mysql.connector
import json




app = Flask (__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@app.route("/")
def index():
	return render_template("index.html")

@socketio.on("finalresult")
def vote(data):
	print(data)
	#jsondata=json.loads(data)
	mydb = mysql.connector.connect(
  	host="database-2.ckju1qjnik9a.us-east-1.rds.amazonaws.com",
  	user="admin",
  	password="basheer123",
 	database="calculator2"
	)
	mycursor = mydb.cursor()
	sql = "INSERT INTO users (name, num1,symb,num2,result) VALUES (%s, %s, %s, %s, %s)"
	val = (str(data["user"]),str( data["num1"]), str(data["action"]),str(data["num2"]),str(data["result"]))
	mycursor.execute(sql, val)
	mydb.commit()
	emit("announce vote", data, broadcast=True)

@socketio.on("firstconnect")
def firstconnect1():
	mydb = mysql.connector.connect(
  	host="database-2.ckju1qjnik9a.us-east-1.rds.amazonaws.com",
  	user="admin",
  	password="basheer123",
 	database="calculator2"
	)
	mycursor = mydb.cursor()
	mycursor.execute("SELECT id, name, num1,symb,num2,result FROM users ORDER BY id DESC")
	myresult = mycursor.fetchall()
	i=0
	dbresult=[]
	for row in myresult:
		print(row[0],row[1],row[2],row[3],row[4],row[5])
		dbresult.append([str(row[1]),str(row[2]),str(row[3]),str(row[4]),str(row[5])])
		i=i+1
		if(i>=10):
			break

		pass
	y = json.dumps(dbresult)
	print(y)
	emit("update log", y)


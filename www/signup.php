<?php
	header("Access-Control-Allow-Origin: * ");
	$query=mysql_connect("localhost","root","");
	mysql_select_db("login",$query);
	 $username = $_REQUEST['username'];
	 $password = $_REQUEST['password'];
	 $email = $_REQUEST['email'];
	 $query2=mysql_query("insert into users values('','$username','$password','$email')");
	
	var_dump($query2);
	
	
?>
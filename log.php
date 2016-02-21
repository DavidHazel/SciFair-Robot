<?php

//file for logging experiment results

//Include the DB connection string
require_once("dbconn.php");


// Map the post variables
$date = new DateTime();
 
$timestamp = $date->getTimestamp();
$ipAddress = $_SERVER['REMOTE_ADDR'];
$sampleSize = $_POST['samplesize'];
$count_x_blue_x_green = $_POST['count_x_blue_x_green'];
$count_x_green_x_green = $_POST['count_x_green_x_green'];
$count_x_blue_y_naked = $_POST['count_x_blue_y_naked'];
$count_x_green_y_naked =  $_POST['count_x_green_y_naked'];
 
//Prepare the query
$stmt = $mysqli->prepare("INSERT INTO log VALUES (?,?,?, ?, ?, ?, ?)");
$stmt->bind_param('dsddddd', $timestamp, $ipAddress, $sampleSize, $count_x_blue_x_green, $count_x_green_x_green, $count_x_blue_y_naked, $count_x_green_y_naked);

//Execute the Query
$stmt->execute();





   



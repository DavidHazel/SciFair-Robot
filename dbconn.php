<?php

$mysqli = new mysqli("server_name", "username", "password", "database");
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}
echo $mysqli->host_info . "\n";

/* check connection */
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}


/*
 
 
 -- script to create genetics database in mysql;
 
create database genetics;
use genetics;
CREATE TABLE log (timestamp int,
                  ipAddress CHAR(50),
                  sampleSize int,
                  count_x_blue_x_green int,
                    count_x_green_x_green int,
                    count_x_blue_y_naked int,
                    count_x_green_y_naked int);
*/
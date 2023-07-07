DROP DATABASE IF EXISTS familyfiesta_db;
CREATE DATABASE familyfiesta_db;
CREATE TABLE mapTable (
    map_id INTEGER PRIMARY KEY, 
    AUTO_INCREMENT,
    location_name VARCHAR (100),
    latitude DECIMAL (100),
    longitude DECIMAL (100)
);



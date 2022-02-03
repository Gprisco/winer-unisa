drop database `winer-test`;

create database `winer-test`;

use `winer-test`;

create user if not exists `winer-test`@`localhost` identified by '<password-here>';

grant all privileges on `winer-test`.* to 'winer-test'@'localhost';
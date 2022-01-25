CREATE DATABASE IF NOT EXISTS `winer`;
USE winer;

DROP USER IF EXISTS 'winer-backend';
CREATE USER 'winer-backend' IDENTIFIED BY '<insert-password-here>';
GRANT ALL PRIVILEGES ON winer.* TO 'winer-backend';

drop table if exists a_user_role;

drop table if exists a_role;

drop table if exists c_cart_item;

drop table if exists p_order;

drop table if exists a_user;

drop table if exists p_order_wine;

drop table if exists w_wine_winegrape;

drop table if exists w_wine;

drop table if exists w_winefamily;

drop table if exists g_region;

drop table if exists g_country;

drop table if exists w_winecolor;

drop table if exists w_winedenom;

drop table if exists w_winegrape;

drop table if exists w_winery;

drop table if exists w_winetype;

create table a_role
(
    roleID          int auto_increment
        primary key,
    roleName        varchar(30)  not null,
    roleDescription varchar(255) null,
    constraint a_role_roleName_uindex
        unique (roleName)
);

create table a_user
(
    userID   int auto_increment
        primary key,
    email    varchar(320) not null,
    password varchar(255) not null,
    constraint a_user_email_uindex
        unique (email)
);

create table a_user_role
(
    userID   int      null,
    roleID   int      null,
    issuedAt datetime null,
    constraint a_user_role_a_role_roleID_fk
        foreign key (roleID) references a_role (roleID)
            on update cascade on delete cascade,
    constraint a_user_role_a_user_userID_fk
        foreign key (userID) references a_user (userID)
            on update cascade on delete cascade
);

create table g_country
(
    countryId int auto_increment
        primary key,
    country   varchar(30) not null
);

create table g_region
(
    regionId  int auto_increment
        primary key,
    region    varchar(30) not null,
    countryId int         not null,
    constraint g_region_ibfk_1
        foreign key (countryId) references g_country (countryId)
            on delete cascade
);

create index countryId
    on g_region (countryId);

create table p_order
(
    orderID   int auto_increment
        primary key,
    createdAt datetime             not null,
    userID    int                  not null,
    confirmed tinyint(1) default 0 not null,
    address varchar(100) not null,
    constraint p_order_a_user_userID_fk
        foreign key (userID) references a_user (userID)
            on update cascade on delete cascade
);

create table w_winecolor
(
    winecolorId int auto_increment
        primary key,
    winecolor   varchar(10) not null
);

create table w_winedenom
(
    winedenomId int auto_increment
        primary key,
    winedenom   varchar(10) not null
);

create table w_winegrape
(
    winegrapeId int auto_increment
        primary key,
    winegrape   varchar(30) not null
);

create table w_winery
(
    wineryId  int auto_increment
        primary key,
    winery    varchar(100) not null,
    address   varchar(100) null,
    telephone varchar(30)  null
);

create table w_winetype
(
    winetypeId int auto_increment
        primary key,
    winetype   varchar(30) not null
);

create table w_winefamily
(
    winefamilyId int auto_increment
        primary key,
    winefamily   varchar(50) not null,
    winecolorId  int         not null,
    winetypeId   int         not null,
    winedenomId  int         not null,
    regionId     int         not null,
    constraint w_winefamily_ibfk_1
        foreign key (winecolorId) references w_winecolor (winecolorId)
            on delete cascade,
    constraint w_winefamily_ibfk_2
        foreign key (winetypeId) references w_winetype (winetypeId)
            on delete cascade,
    constraint w_winefamily_ibfk_3
        foreign key (winedenomId) references w_winedenom (winedenomId)
            on delete cascade,
    constraint w_winefamily_ibfk_4
        foreign key (regionId) references g_region (regionId)
            on delete cascade
);

create table w_wine
(
    wine         varchar(100) not null,
    vintage      int unsigned not null,
    wineryId     int          not null,
    winefamilyId int          not null,
    availability int          not null,
    price        float        not null,
    primary key (wine, vintage),
    constraint w_wine_ibfk_1
        foreign key (wineryId) references w_winery (wineryId)
            on delete cascade,
    constraint w_wine_ibfk_2
        foreign key (winefamilyId) references w_winefamily (winefamilyId)
            on delete cascade
);

create table c_cart_item
(
    wine     varchar(255)  not null,
    vintage  int unsigned  not null,
    userID   int           not null,
    quantity int default 1 not null,
    primary key (wine, vintage, userID),
    constraint c_cart_item_a_user_userID_fk
        foreign key (userID) references a_user (userID)
            on update cascade on delete cascade,
    constraint c_cart_item_w_wine_wine_vintage_fk
        foreign key (wine, vintage) references w_wine (wine, vintage)
            on update cascade on delete cascade
);

create index c_cart_item_a_user_userID_fk2
    on c_cart_item (userID);

create table p_order_wine
(
    wine     varchar(100) not null,
    vintage  int unsigned not null,
    orderID  int          not null,
    quantity int          null,
    price    float        null,
    constraint p_order_wine_w_wine_wine_vintage_fk
        foreign key (wine, vintage) references w_wine (wine, vintage)
            on update cascade on delete cascade
);

create index winefamilyId
    on w_wine (winefamilyId);

create index wineryId
    on w_wine (wineryId);

create table w_wine_winegrape
(
    winegrapeId int          not null,
    wine        varchar(100) not null,
    vintage     int unsigned not null,
    percentage  int unsigned not null,
    constraint w_wine_winegrape_ibfk_1
        foreign key (wine, vintage) references w_wine (wine, vintage)
            on delete cascade,
    constraint w_wine_winegrape_ibfk_2
        foreign key (winegrapeId) references w_winegrape (winegrapeId)
            on delete cascade
);

create index wine
    on w_wine_winegrape (wine, vintage);

create index winegrapeId
    on w_wine_winegrape (winegrapeId);

create index regionId
    on w_winefamily (regionId);

create index winecolorId
    on w_winefamily (winecolorId);

create index winedenomId
    on w_winefamily (winedenomId);

create index winetypeId
    on w_winefamily (winetypeId);


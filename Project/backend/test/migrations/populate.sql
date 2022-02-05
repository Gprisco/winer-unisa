insert into `g_country` (`country`, `countryId`) values ('Italia', 1);
insert into `g_region` (`countryId`, `region`, `regionId`) values (1, 'Toscana', 15);
insert into `w_winetype` (`winetype`, `winetypeId`) values ('Fermo', 2);
insert into `w_winecolor` (`winecolor`, `winecolorId`) values ('Rosso', 1);
insert into `w_winedenom` (`winedenom`, `winedenomId`) values ('DOCG', 1);
insert into `w_winery` (`address`, `telephone`, `winery`, `wineryId`) values ('Via Manfredi, 75/81', '0825 614111', 'Mastroberardino', 546);
insert into `w_winefamily` (`regionId`, `winecolorId`, `winedenomId`, `winefamily`, `winefamilyId`, `winetypeId`) values (15, 1, 1, 'Morellino di Scansano', 297, 2);
insert into `w_wine` (`availability`, `price`, `vintage`, `wine`, `winefamilyId`, `wineryId`) values (5, 10, 2016, 'capatosta', 297, 546);

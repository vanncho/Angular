CREATE TABLE `users` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `FULLNAME` varchar(255) DEFAULT NULL,
  `USERNAME` varchar(50) DEFAULT NULL,
  `PASSWORD` varchar(255) DEFAULT NULL,
  `EMAIL` varchar(255) DEFAULT NULL,
  `ENABLED` char(1) NOT NULL DEFAULT '1',
  `ROLE` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

CREATE TABLE `games` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `TITLE` varchar(50) DEFAULT NULL,
  `DESCRIPTION` varchar(255) DEFAULT NULL,
  `THUMBNAIL` varchar(255) DEFAULT NULL,
  `PRICE` decimal(10,2) DEFAULT NULL,
  `SIZE` decimal(10,2) DEFAULT NULL,
  `VIDEO` varchar(255) DEFAULT NULL,
  `DATE` date DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

create table `users_games` (
  `USERID` int(10) unsigned NOT NULL,
  `GAMEID` int(10) unsigned NOT NULL,
  constraint `PK_UsersGames` primary key(`USERID`, `GAMEID`),
  constraint `FK_UsersGames_USER` foreign key(`USERID`) references `users`(`ID`),
  constraint `FK_UsersGames_GAME` foreign key(`GAMEID`) references `games`(`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

CREATE TABLE `carts` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `USERID` int(10) unsigned NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

create table `users_carts` (
  `USERID` int(10) unsigned NOT NULL,
  `GAMEID` int(10) unsigned NOT NULL,
  constraint `PK_UsersCarts` primary key(`USERID`, `GAMEID`),
  constraint `FK_UsersCarts_USER` foreign key(`USERID`) references `users`(`ID`),
  constraint `FK_UsersCarts_GAME` foreign key(`GAMEID`) references `games`(`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
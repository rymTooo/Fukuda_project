## Insert info
#### skill table
insert into game_skill values("Fire", 0.1,15,0,1),
("Oil", 1,100,0,1),
("PewPew",8,1100,0,0),
("Clicky",47,12000,0,0),
("SuperClicky",260,130000,0,0),
("Wowwww",1400,1400000,0,0),
("SplitHorizon",7800,20000000,0,0),
("PlumBlossomSword",44000,330000000,0,0);
#### powerup table
insert into game_powerup values
("BlueFlame", 100,2,"Fire"),
("PinkFlame", 500,2,"Fire"),
("Alcohol", 1000,2,"Oil"),
("HighOctane", 5000,2,"Oil"),
("UwU",11000,2,"PewPew"),
("><",55000,2,"PewPew"),
("Licky",120000,2,"Clicky"),
("SuperLick",600000,2,"Clicky");
## Drop tables(game)
DROP TABLE game_user_event;
DROP TABLE game_user_powerup;
DROP TABLE game_user_skill;
DROP TABLE game_powerup;
DROP TABLE game_event;
DROP TABLE game_fukudacustomization;
DROP TABLE game_setting;
DROP TABLE game_skill;
DROP TABLE game_stat;

## Insert info
#### skill table
insert into game_skill values("Pierce", 0.1,15,0,1),
("Vertical slash", 1,100,0,1),
("Power spin",8,1100,0,0),
("Precision cut",47,12000,0,0),
("Power strike",260,130000,0,0),
("Triple slash",1400,1400000,0,0),
("Wind cutter",7800,20000000,0,0),
("Fire ball",44000,330000000,0,0);

#### powerup table
insert into game_powerup values ("sharpy", 100,2,"Pierce",1), ("sharper", 500,2,"Pierce",10), ("grind stone", 1000,2,"Vertical slash",1), ("super grind stone", 5000,2,"Vertical slash",10), ("boots",11000,2,"Power spind",1), ("leather boots",55000,2,"Power spind",10), ("2xScope",120000,2,"Precision cut",1), ("4xScope",600000,2,"Precision cut",10);

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

## Insert info
-- skill table

insert into game_skill values("Pierce", 0.1,15), ("Vertical slash", 1,100), ("Power spin",8,1100), ("Precision cut",47,12000), ("Power strike",260,130000), ("Triple slash",1400,1400000), ("Wind cutter",7800,20000000), ("Fire ball",44000,330000000);

-- powerup table

insert into game_powerup (powerup_name, cost, multiply, skill_name_id, skillReq, powerup_id) values ("sharpy", 100,2,"Pierce",1,1), ("sharper", 500,2,"Pierce",10,2),("sharpest",2500,2,"Pierce",25,3), ("grind stone", 1000,2,"Vertical slash",1,4), ("super grind stone", 5000,2,"Vertical slash",10,5),("diamond stone",25000,2,"Vertical slash",25,6), ("boots",11000,2,"Power spin",1,7), ("leather boots",55000,2,"Power spin",10,8),("Nike",265000,2,"Power spin",25,9), ("2xScope",120000,2,"Precision cut",1,10), ("4xScope",600000,2,"Precision cut",10,11),("8xScope",3000000,2,"Precision cut",25,12),("M150", 1300000,2,"Power strike",1,13), ("steroid", 6500000,2,"Power strike",10,14),("chemcial X",30000000,2,"Power strike",25,15),("quadurple slash", 14000000,2,"Triple slash",1,16), ("penta kill", 70000000,2,"Triple slash",10,17),("Ace",350000000,2,"Triple slash",25,18),("water cutter", 150000000,2,"Wind cutter",1,19), ("fire cutter", 750000000,2,"Wind cutter",10,20),("holy cutter",3750000000,2,"Wind cutter",25,21),("napalm", 1600000000,2,"Fire ball",1,22), ("TNT", 800000000,2,"Fire ball",10,23),("nuclear",4000000000,2,"Fire ball",25,24);

-- customization table

insert into game_customization_head values("headBlue", "headBlue.png"),
("headDefault", "headDefault.png"),
("headGreen", "headGreen.png"),
("headOrange", "headOrange.png"),
("headPink", "headPink.png"),
("headPurple", "headPurple.png"),
("headYellow", "headYellow.png");

insert into game_customization_torso values("torsoBlue", "torsoBlue.png"),
("torsoDefault", "torsoDefault.png"),
("torsoGreen", "torsoGreen.png"),
("torsoOrange", "torsoOrange.png"),
("torsoPink", "torsoPink.png"),
("torsoPurple", "torsoPurple.png"),
("torsoYellow", "torsoYellow.png");

insert into game_customization_pants values("pantsBlue", "pantsBlue.png"),
("pantsDefault", "pantsDefault.png"),
("pantsGreen", "pantsGreen.png"),
("pantsOrange", "pantsOrange.png"),
("pantsPink", "pantsPink.png"),
("pantsPurple", "pantsPurple.png"),
("pantsYellow", "pantsYellow.png");

insert into game_customization_shoes values("shoes2Blue", "shoes2Blue.png"),
("shoes2Default", "shoes2Default.png"),
("shoes2Green", "shoes2Green.png"),
("shoes2Orange", "shoes2Orange.png"),
("shoes2Pink", "shoes2Pink.png"),
("shoes2Purple", "shoes2Purple.png"),
("shoes2Yellow", "shoes2Yellow.png");

-- event table

insert into game_event values (1,"gauge_click","spam the gauge to get a bonus multiplier",10),
(2,"flying_target_click","click the flying target that appear on the screen to get huge bonus multiplier",20);


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

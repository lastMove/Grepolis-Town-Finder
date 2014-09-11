load data local infile '/Users/jaosnak/Documents/Dev/grepolis/data/towns.txt' 
into table town fields terminated by ',' enclosed by '"' lines terminated by '\n'  

 (id, player_id, townName, x, y, num, points)
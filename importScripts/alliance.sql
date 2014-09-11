load data local infile '/Users/jaosnak/Documents/Dev/grepolis/data/alliances.txt' 
into table alliance fields terminated by ',' enclosed by '"' lines terminated by '\n'  

 (id, name, points, towns, membersNumbers, rank)
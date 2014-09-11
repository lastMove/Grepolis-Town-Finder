load data local infile '/Users/jaosnak/Documents/Dev/grepolis/data/islands.txt' 
into table island fields terminated by ',' enclosed by '"' lines terminated by '\n'  

 (id, x, y, townNumber, emptyPlaces, maxRes, minRes)
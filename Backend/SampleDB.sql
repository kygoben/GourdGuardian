-- CREATE DATABASE
drop database if exists stencildb;
create database if not exists stencildb;
use stencildb;

-- first table to be created
create table category(
	cid integer NOT NULL, -- category id
    cname varchar(30) NOT NULL, -- catagory name
    primary key (cid),
    unique (cid)
	);

-- second table to be created
create table users(
	uid varchar(20) NOT NULL, -- user id
    name varchar(50) NOT NULL,
	user_role varchar(10) NOT NULL,
    password varchar(50) NOT NULL, -- should we hash the password?
    primary key (uid),
    unique (name)
	);
	
-- third table to be created
-- after category and users created
create table stencils(
	sid varchar(8) NOT NULL, -- stencil id
    title varchar(50) NOT NULL,
	cid integer NOT NULL, -- catagory id
	extras varchar(50),  -- only available for category #3, #6, #11, #18, #20 (as movie); #19 (as show); #22 (as game)
	website varchar(20) NOT NULL,
	path varchar(100) NOT NULL, -- path to the stencil file
    created_by varchar(50) NOT NULL, -- admin or user
	is_selected varchar(1), -- selected for current year
	rating integer, -- visitor rating
	week integer NOT NULL, -- week one or two (duplicate pumpkin)
    primary key (sid, week), -- any better pair of keys?
	foreign key (cid) references category(cid),
    foreign key (created_by) references users(uid)
	);

-- fourth table to be created
-- after stencil created
create table status(
	sid varchar(8) NOT NULL, -- stencil id
    printing varchar(1), -- is printed
	cutting varchar(1), -- is cut
	tracing_start datetime, -- start time -> in progress
	tracing_end datetime, -- end time -> finished
	tracing_confirmed datetime, -- admin confirm
	carving_start datetime,
	carving_end datetime,
	carving_confirmed datetime,
	week integer NOT NULL, -- week one or two (duplicate pumpkin)
    primary key (sid, week), -- any better pair of keys?
	foreign key (sid) references stencils(sid)
	);

-- SAMPLE DATA
-- category
INSERT INTO category VALUES (1,'American Icons');
INSERT INTO category VALUES (2,'Animals/Nature');
INSERT INTO category VALUES (3,'Cartoons');
INSERT INTO category VALUES (4,'Cereals/Commercials');
INSERT INTO category VALUES (5,'Creatures/Monsters');
INSERT INTO category VALUES (6,'Disney/Pixar/Cartoons/Movies');
INSERT INTO category VALUES (7,'Famous People');
INSERT INTO category VALUES (8,'Fantasy & Medieval');
INSERT INTO category VALUES (9,'Holidays/Seasons');
INSERT INTO category VALUES (10,'ISU Students');
INSERT INTO category VALUES (11,'Movies');
INSERT INTO category VALUES (12,'Oceans/Summer Spirits');
INSERT INTO category VALUES (13,'Patriotics');
INSERT INTO category VALUES (14,'PHRASES/Internet Memes');
INSERT INTO category VALUES (15,'Robin Williams');
INSERT INTO category VALUES (16,'Rock Gods/Musicians');
INSERT INTO category VALUES (17,'Super Heroes');
INSERT INTO category VALUES (18,'Super Villians');
INSERT INTO category VALUES (19,'Television');
INSERT INTO category VALUES (20,'Tim Burton Movies');
INSERT INTO category VALUES (21,'Traditional Pumpkins');
INSERT INTO category VALUES (22,'Vidao Games');

-- users
INSERT INTO users VALUES ('admin','Admin','admin','admin');

-- stencils
-- catagory #1
INSERT INTO stencils VALUES ('1-1','Abrams A1 Tank','1','','Jball/PG','abcdef.stencil','admin','',0,1);
INSERT INTO stencils VALUES ('1-2','Arches National Park','1','','Jball/PG','abcdef.stencil','admin','',0,1);
INSERT INTO stencils VALUES ('1-3','Bull Rider','1','','Jball/PG','abcdef.stencil','admin','',0,1);
INSERT INTO stencils VALUES ('1-4','Cowboy','1','','Jball/PG','abcdef.stencil','admin','',0,1);

-- category #3 extras = movies
INSERT INTO stencils VALUES ('3-1','Popeye','3','Popeye the Sailor','Stoneykins','abcdef.stencil','admin','',0,1);
INSERT INTO stencils VALUES ('3-2','Arthur','3','Arthur','O&B','abcdef.stencil','admin','',0,1);
INSERT INTO stencils VALUES ('3-3','Barbie','3','Barbie','Jball/PG','abcdef.stencil','admin','',0,1);
INSERT INTO stencils VALUES ('3-3','Barbie','3','Barbie','Jball/PG','abcdef.stencil','admin','',0,2);
INSERT INTO stencils VALUES ('3-4-A','Betty Boop Angel','3','Betty Boop','Jball/PG','abcdef.stencil','admin','',0,1);
INSERT INTO stencils VALUES ('3-4-B','Betty Boop Devil','3','Betty Boop','Jball','abcdef.stencil','admin','',0,1);

-- category #22 extras = game
INSERT INTO stencils VALUES ('22-1-A','Bad Piggies','22','Angry Birds','PumpkinPile','abcdef.stencil','admin','',0,1);
INSERT INTO stencils VALUES ('22-1-B','Red Bird','22','Angry Birds','PumpkinPile','abcdef.stencil','admin','',0,1);
INSERT INTO stencils VALUES ('22-1-C','Grandpa Pig','22','Angry Birds','PumpkinPile','abcdef.stencil','admin','',0,1);
INSERT INTO stencils VALUES ('22-1-D','Green Bird','22','Angry Birds','PumpkinPile','abcdef.stencil','admin','',0,1);
INSERT INTO stencils VALUES ('22-1-E','Pink Bird','22','Angry Birds','PumpkinPile','abcdef.stencil','admin','',0,1);
INSERT INTO stencils VALUES ('22-1-F','Bomb','22','Angry Birds','PumpkinPile','abcdef.stencil','admin','',0,1);
INSERT INTO stencils VALUES ('22-1-G','Angry Birds','22','Angry Birds','PumpkinPile','abcdef.stencil','admin','',0,1);
INSERT INTO stencils VALUES ('22-1-G','Angry Birds','22','Angry Birds','PumpkinPile','abcdef.stencil','admin','',0,2);

INSERT INTO stencils VALUES ('22-2-A','Batman','22','Arkham','O&B','abcdef.stencil','admin','',0,1);
INSERT INTO stencils VALUES ('22-2-B','Mr. Freeze','22','Arkham','O&B','abcdef.stencil','admin','',0,1);
INSERT INTO stencils VALUES ('22-2-C','Harley Quinn','22','Arkham','O&B','abcdef.stencil','admin','',0,1);
INSERT INTO stencils VALUES ('22-2-D','Joker','22','Arkham','O&B','abcdef.stencil','admin','',0,1);
INSERT INTO stencils VALUES ('22-2-E','The Penguin','22','Arkham','O&B','abcdef.stencil','admin','',0,1);
INSERT INTO stencils VALUES ('22-2-F','Scarecrow','22','Arkham','O&B','abcdef.stencil','admin','',0,1);
INSERT INTO stencils VALUES ('22-2-G','Asylum Joker','22','Arkham','O&B','abcdef.stencil','admin','',0,1);

-- status
INSERT INTO status VALUES ('1-1','Y','Y',NULL,NULL,NULL,NULL,NULL,NULL,1);
INSERT INTO status VALUES ('3-2','Y','Y',NULL,NULL,NULL,NULL,NULL,NULL,1);
INSERT INTO status VALUES ('3-3','Y','Y',NULL,NULL,NULL,NULL,NULL,NULL,1);
INSERT INTO status VALUES ('3-3','Y','Y',NULL,NULL,NULL,NULL,NULL,NULL,2);
INSERT INTO status VALUES ('3-4-A','Y','Y',NULL,NULL,NULL,NULL,NULL,NULL,1);
INSERT INTO status VALUES ('22-1-G','Y','Y',NULL,NULL,NULL,NULL,NULL,NULL,1);
INSERT INTO status VALUES ('22-1-G','Y','Y',NULL,NULL,NULL,NULL,NULL,NULL,2);
INSERT INTO status VALUES ('22-2-G','Y','Y',NULL,NULL,NULL,NULL,NULL,NULL,1);

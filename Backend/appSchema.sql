CREATE DATABASE  IF NOT EXISTS `jack_track`;
USE `jack_track`;

DROP TABLE IF EXISTS `pumpkins`;
CREATE TABLE `pumpkins` (
  `pid` int,
  PRIMARY KEY (`pid`)
)
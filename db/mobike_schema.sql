DROP DATABASE IF EXISTS
  `mobike`;
SET
  default_storage_engine = InnoDB;
CREATE DATABASE IF NOT EXISTS mobike DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE
  mobike;

-- Tables 
CREATE TABLE route(
  `route_id` INT(16) UNSIGNED NOT NULL AUTO_INCREMENT,
  result_id INT(16) UNSIGNED NOT NULL,
  bike_id VARCHAR(250) NOT NULL,
  start_time DATETIME NOT NULL,
  end_time DATETIME NOT NULL,
  start_la FLOAT NOT NULL,
  start_lo FLOAT NOT NULL,
  end_la FLOAT NOT NULL,
  end_lo FLOAT NOT NULL,
  distance FLOAT NOT NULL,
  avg_velocity FLOAT NOT NULL,
  PRIMARY KEY(route_id)
);

-- Tables 
CREATE TABLE heatmap(
  `heat_id` INT(16) UNSIGNED NOT NULL AUTO_INCREMENT,
  bike_id VARCHAR(250) NOT NULL,
  park_time DATETIME NOT NULL,
  la FLOAT NOT NULL,
  lo FLOAT NOT NULL,
  PRIMARY KEY(heat_id)
);
insert into heatmap (bike_id,park_time,la,lo) VALUES ('0280039122#','2017-04-12T20:09:09','30.784345','104.013609');
select * from heatmap
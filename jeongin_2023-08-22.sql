# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.5.5-10.6.12-MariaDB-0ubuntu0.22.04.1)
# Database: jeongin
# Generation Time: 2023-08-22 09:22:50 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table comment
# ------------------------------------------------------------

CREATE TABLE `comment` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `post` int(11) NOT NULL,
  `user` varchar(20) NOT NULL DEFAULT '',
  `content` text NOT NULL,
  `status` varchar(8) NOT NULL DEFAULT 'show',
  `created` datetime NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



# Dump of table community
# ------------------------------------------------------------

CREATE TABLE `community` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `category` varchar(16) DEFAULT NULL,
  `priority` tinyint(1) NOT NULL DEFAULT 0,
  `user` varchar(20) NOT NULL,
  `title` varchar(128) NOT NULL DEFAULT '',
  `comment` int(4) unsigned NOT NULL DEFAULT 0,
  `content` longtext NOT NULL,
  `files` text DEFAULT NULL,
  `created` datetime NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



# Dump of table table
# ------------------------------------------------------------

CREATE TABLE `table` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(16) NOT NULL DEFAULT '',
  `title` varchar(16) NOT NULL DEFAULT '',
  `email` varchar(64) NOT NULL DEFAULT '',
  `role` varchar(8) NOT NULL DEFAULT '',
  `created` datetime NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



# Dump of table user
# ------------------------------------------------------------

CREATE TABLE `user` (
  `id` varchar(20) NOT NULL DEFAULT '',
  `mail` varchar(64) NOT NULL DEFAULT '',
  `password` text NOT NULL,
  `name` varchar(20) NOT NULL DEFAULT '',
  `role` varchar(16) DEFAULT 'user',
  `title` varchar(32) DEFAULT NULL,
  `created` datetime NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Machine: localhost
-- Genereertijd: 18 jun 2015 om 11:14
-- Serverversie: 5.5.24-log
-- PHP-versie: 5.3.13

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Databank: `db_dilemma`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `games`
--
-- Gecreëerd: 17 jun 2015 om 15:31
--

CREATE TABLE IF NOT EXISTS `games` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `guid` char(36) NOT NULL,
  `item1` int(11) NOT NULL,
  `item2` int(11) NOT NULL,
  `user` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `guid` (`guid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `items`
--
-- Gecreëerd: 02 jun 2015 om 14:38
--

CREATE TABLE IF NOT EXISTS `items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(250) NOT NULL,
  `guid` char(36) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `guid` (`guid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Triggers `items`
--
DROP TRIGGER IF EXISTS `ItemsGUID`;
DELIMITER //
CREATE TRIGGER `ItemsGUID` BEFORE INSERT ON `items`
 FOR EACH ROW SET new.Guid = uuid()
//
DELIMITER ;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `users`
--
-- Gecreëerd: 02 jun 2015 om 14:55
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL,
  `emailaddress` varchar(250) NOT NULL,
  `guid` char(36) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_ip` varchar(15) NOT NULL,
  `last_visit` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Triggers `users`
--
DROP TRIGGER IF EXISTS `UsersGuid`;
DELIMITER //
CREATE TRIGGER `UsersGuid` BEFORE INSERT ON `users`
 FOR EACH ROW SET new.Guid = uuid()
//
DELIMITER ;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `vote`
--
-- Gecreëerd: 02 jun 2015 om 14:54
--

CREATE TABLE IF NOT EXISTS `vote` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `game` int(11) NOT NULL,
  `item` int(11) NOT NULL,
  `user` int(11) DEFAULT NULL,
  `rating` enum('0','1','2','3','4','5') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

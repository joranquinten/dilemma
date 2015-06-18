-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Machine: localhost
-- Genereertijd: 18 jun 2015 om 12:16
-- Serverversie: 5.5.24-log
-- PHP-versie: 5.3.13

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Databank: `db_dilemma`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `items`
--

CREATE TABLE IF NOT EXISTS `items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(250) NOT NULL,
  `guid` char(36) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `guid` (`guid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=53 ;

--
-- Gegevens worden uitgevoerd voor tabel `items`
--

INSERT INTO `items` (`id`, `title`, `guid`, `created_at`, `status`) VALUES
(1, 'Always having to wear wet socks', '50b00034-15ab-11e5-87f6-180373e197b8', '2015-06-18 11:16:05', 0),
(2, 'Every day a chili dog for breakfast.', 'cec9ea8c-15b1-11e5-87f6-180373e197b8', '2015-06-18 12:02:34', 0),
(3, 'You have to eat 10 lemons each day.', 'cecb2a49-15b1-11e5-87f6-180373e197b8', '2015-06-18 12:02:34', 0),
(4, 'A curfew every day, only for you, starting 8pm.', 'cecc0738-15b1-11e5-87f6-180373e197b8', '2015-06-18 12:02:34', 0),
(5, 'Only being able to walk sideways.', 'ceccafb7-15b1-11e5-87f6-180373e197b8', '2015-06-18 12:02:34', 0),
(6, 'Tentacles for arms.', 'cecd5c53-15b1-11e5-87f6-180373e197b8', '2015-06-18 12:02:34', 0),
(7, 'Being followed by a marching band. Everywhere', 'cecee4ef-15b1-11e5-87f6-180373e197b8', '2015-06-18 12:02:34', 0),
(8, 'Never being allowed to lie down.', 'ced08539-15b1-11e5-87f6-180373e197b8', '2015-06-18 12:02:34', 0),
(9, 'Your couch, chairs and bed wrapped in bubblewrap.', 'ced22b71-15b1-11e5-87f6-180373e197b8', '2015-06-18 12:02:34', 0),
(10, 'You cannot sleep, ever.', 'ced38623-15b1-11e5-87f6-180373e197b8', '2015-06-18 12:02:34', 0),
(11, 'Everything you say gets repeated by a parrot.', 'ced4e455-15b1-11e5-87f6-180373e197b8', '2015-06-18 12:02:34', 0),
(12, 'You always speak in a foreign language.', 'ced64121-15b1-11e5-87f6-180373e197b8', '2015-06-18 12:02:34', 0),
(13, 'Always having to skip, everywhere you go.', 'ced7a0dc-15b1-11e5-87f6-180373e197b8', '2015-06-18 12:02:34', 0),
(14, 'You can only speak in riddles.', 'ced8e469-15b1-11e5-87f6-180373e197b8', '2015-06-18 12:02:34', 0),
(15, 'Every question you ask, needs to be asked while kneeling.', 'ceda6b8f-15b1-11e5-87f6-180373e197b8', '2015-06-18 12:02:34', 0),
(16, 'Everywhere you go, it''s always raining.', 'cedbfb3b-15b1-11e5-87f6-180373e197b8', '2015-06-18 12:02:34', 0),
(17, 'You are invisible and cannot communicate with anyone.', 'cedcad92-15b1-11e5-87f6-180373e197b8', '2015-06-18 12:02:34', 0),
(18, 'No internet.', 'cedd5550-15b1-11e5-87f6-180373e197b8', '2015-06-18 12:02:34', 0),
(19, 'No cellphone.', 'ceddfae9-15b1-11e5-87f6-180373e197b8', '2015-06-18 12:02:34', 0),
(20, 'Music sounds like screeching seagulls.', 'cedea492-15b1-11e5-87f6-180373e197b8', '2015-06-18 12:02:34', 0),
(21, 'You have to wear a fish as a pendant.', 'cedf5f31-15b1-11e5-87f6-180373e197b8', '2015-06-18 12:02:34', 0),
(22, 'You age backwards - Benjamin Button style.', 'cee00096-15b1-11e5-87f6-180373e197b8', '2015-06-18 12:02:34', 0),
(23, 'There is always a wet dog in your bathroom.', 'cee0acd2-15b1-11e5-87f6-180373e197b8', '2015-06-18 12:02:34', 0),
(24, 'You have to destroy toys of children.', 'cee27420-15b1-11e5-87f6-180373e197b8', '2015-06-18 12:02:34', 0),
(25, 'You are allergic to your family and friends.', 'cee331f1-15b1-11e5-87f6-180373e197b8', '2015-06-18 12:02:34', 0),
(26, 'You get your own 24/7 livestream on the internet.', 'cee3faef-15b1-11e5-87f6-180373e197b8', '2015-06-18 12:02:34', 0),
(27, 'Every day only fastfood for dinner.', 'cee4d0b2-15b1-11e5-87f6-180373e197b8', '2015-06-18 12:02:34', 0),
(28, 'You are continuously surrounded by locusts.', 'cee5a6e4-15b1-11e5-87f6-180373e197b8', '2015-06-18 12:02:34', 0),
(29, 'You always feel like you have to sneeze (but never have to).', 'cee66be3-15b1-11e5-87f6-180373e197b8', '2015-06-18 12:02:34', 0),
(30, 'You have no concept of time.', 'cee737ad-15b1-11e5-87f6-180373e197b8', '2015-06-18 12:02:34', 0),
(31, 'You always have to stand when you talk.', 'cee813bc-15b1-11e5-87f6-180373e197b8', '2015-06-18 12:02:34', 0),
(32, 'You have to sit in a strangers'' lap on public events.', '0524b5c5-15b2-11e5-87f6-180373e197b8', '2015-06-18 12:04:05', 0),
(33, 'You have to redo your whole education.', '3acced94-15b2-11e5-87f6-180373e197b8', '2015-06-18 12:05:35', 0),
(34, 'You have to laugh when someone is crying.', '3ace5063-15b2-11e5-87f6-180373e197b8', '2015-06-18 12:05:35', 0),
(35, 'One mosquito in your bedroom every night.', '3acf06c5-15b2-11e5-87f6-180373e197b8', '2015-06-18 12:05:35', 0),
(36, 'You cannot take of your shoes. Ever.', '3acfc80d-15b2-11e5-87f6-180373e197b8', '2015-06-18 12:05:35', 0),
(37, 'Your 94th floor appartmentbuilding has no lift. You live on the 94th floor.', '3ad07a7a-15b2-11e5-87f6-180373e197b8', '2015-06-18 12:05:35', 0),
(38, 'Everthing you say, has to rhyme.', '3ad154b2-15b2-11e5-87f6-180373e197b8', '2015-06-18 12:05:35', 0),
(39, 'You always have to walk around on all fours.', '3ad2112a-15b2-11e5-87f6-180373e197b8', '2015-06-18 12:05:35', 0),
(40, 'You perform the same dance-move over and over again.', '3ad2c87b-15b2-11e5-87f6-180373e197b8', '2015-06-18 12:05:35', 0),
(41, 'Always read out loud.', '3ad3781d-15b2-11e5-87f6-180373e197b8', '2015-06-18 12:05:35', 0),
(42, 'You always have the hiccups.', '3ad4334c-15b2-11e5-87f6-180373e197b8', '2015-06-18 12:05:35', 0),
(43, 'Every shower you take, is a cold shower.', '3ad4eca4-15b2-11e5-87f6-180373e197b8', '2015-06-18 12:05:35', 0),
(44, 'Once a month, at random intervals, all of your clothes disappear for an hour.', '3ad58ff6-15b2-11e5-87f6-180373e197b8', '2015-06-18 12:05:35', 0),
(45, 'Animals are attracted to you sexually.', '3ad69f86-15b2-11e5-87f6-180373e197b8', '2015-06-18 12:05:35', 0),
(46, 'Using sandpaper as toiletpaper.', '3ad74ce1-15b2-11e5-87f6-180373e197b8', '2015-06-18 12:05:35', 0),
(47, 'You repeat everything you say twice.', '3ad7ff6b-15b2-11e5-87f6-180373e197b8', '2015-06-18 12:05:35', 0),
(48, 'You are only allowed to use 100 words each day.', '3ad9ca03-15b2-11e5-87f6-180373e197b8', '2015-06-18 12:05:35', 0),
(49, 'Always having to walk backwards.', '3adb633d-15b2-11e5-87f6-180373e197b8', '2015-06-18 12:05:35', 0),
(50, 'Only allowed to brush your teeth once a year.', '3add0c25-15b2-11e5-87f6-180373e197b8', '2015-06-18 12:05:35', 0),
(51, 'Your nose grows when you lie.', '3adf1e52-15b2-11e5-87f6-180373e197b8', '2015-06-18 12:05:35', 0),
(52, 'Everybody hears what you are thinking.', '3ae0e637-15b2-11e5-87f6-180373e197b8', '2015-06-18 12:05:35', 0);

--
-- Triggers `items`
--
DROP TRIGGER IF EXISTS `ItemsGUID`;
DELIMITER //
CREATE TRIGGER `ItemsGUID` BEFORE INSERT ON `items`
 FOR EACH ROW SET new.Guid = uuid()
//
DELIMITER ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

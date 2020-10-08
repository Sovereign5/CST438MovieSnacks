SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
	`userId` mediumint(9) NOT NULL,
	`username` varchar(8) COLLATE utf8_unicode_ci NOT NULL,
	`password` varchar(72) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

ALTER TABLE `users`
  MODIFY `userId` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

INSERT INTO `users` (`userId`, `username`, `password`) VALUES
(1, 'Alexis', 'Caasi', 'acaasi', 'abcd1234'),
(2, 'Username', 'Password', 'username', 'password'),
(3, 'Anakin', 'Skywalker', 'Vader', 'abcd1234');

DROP TABLE IF EXISTS `items`;

CREATE TABLE `items` (
  `itemId` mediumint(9) NOT NULL,
  `itemlink` varchar(40000) COLLATE utf8_unicode_ci NOT NULL,
  `itemname` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `unitsleft` mediumint(9) NOT NULL,
  `price` float(6,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

ALTER TABLE `items`
  ADD PRIMARY KEY (`itemId`);

ALTER TABLE `items`
  MODIFY `itemId` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;


INSERT INTO `items` (`itemId`, `itemlink`, `itemname`, `unitsleft`, `price`) VALUES
(1, 'https://www.onceuponachef.com/images/2013/04/nigellas-party-popcorn-1200x795.jpg', 'Popcorn', 10, 10),
(2, 'https://userscontent2.emaze.com/images/c0e2fea1-bc89-48a2-9a5c-6f8337ff358e/3721ddf74940bed2f8c9b3e13a169f83.png', 'Soda', 10, 5),
(3, 'https://cdn.shopify.com/s/files/1/2960/2654/products/12209_Red_Vines_Red_Twist_5oz_Tray_Out_of_Pkg_UPDATED.jpg?v=1587568247', 'Licorice', 10, 3),
(4, 'https://www.candywarehouse.com/item-images/126734-01_trolli-sour-brite-crawlers-minis-gummy-worms-35-ounce-packs-12-piece-box.jpg?resizeid=102&resizeh=500&resizew=500', 'Gummy Worms', 10, 3),
(5, 'https://images.heb.com/is/image/HEBGrocery/000112564', 'Kit Kat' 10, 3);

DROP TABLE IF EXISTS `cart`;

CREATE TABLE `cart` (
	`cartId` mediumint(9) NOT NULL,
	`itemId` mediumint(9) NOT NULL,
  `units` mediumint(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

ALTER TABLE `cart`
  ADD PRIMARY KEY (`cartId`);

ALTER TABLE `cart`
  MODIFY `cartId` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

COMMIT;
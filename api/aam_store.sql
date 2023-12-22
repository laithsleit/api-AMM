-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 22, 2023 at 08:54 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aam_store`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `CartID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `ProductID` int(11) DEFAULT NULL,
  `Quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`CartID`, `UserID`, `ProductID`, `Quantity`) VALUES
(77, 9, 13, 4),
(78, 9, 12, 2),
(79, 9, 14, 3),
(80, 9, 15, 1),
(81, 9, 17, 1),
(82, 9, 16, 1),
(83, 9, 18, 1),
(102, 9, 9, 1);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `CategoryID` int(11) NOT NULL,
  `CategoryName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`CategoryID`, `CategoryName`) VALUES
(2, 'Clothing'),
(3, 'Home and Garden');

-- --------------------------------------------------------

--
-- Table structure for table `orderitems`
--

CREATE TABLE `orderitems` (
  `OrderItemID` int(11) NOT NULL,
  `OrderID` int(11) DEFAULT NULL,
  `ProductID` int(11) DEFAULT NULL,
  `Quantity` int(11) NOT NULL,
  `Price` decimal(10,2) NOT NULL,
  `Discount` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orderitems`
--

INSERT INTO `orderitems` (`OrderItemID`, `OrderID`, `ProductID`, `Quantity`, `Price`, `Discount`) VALUES
(19, 15, 28, 4, 1.00, NULL),
(20, 15, 12, 1, 49.99, NULL),
(21, 15, 18, 3, 64.99, NULL),
(22, 15, 17, 1, 54.99, NULL),
(23, 15, 9, 5, 19.99, NULL),
(24, 16, 10, 3, 29.99, NULL),
(25, 17, 8, 6, 99.99, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `OrderID` int(11) NOT NULL,
  `OrderDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `UserID` int(11) DEFAULT NULL,
  `TotalOrderAmount` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`OrderID`, `OrderDate`, `UserID`, `TotalOrderAmount`) VALUES
(10, '2023-12-04 08:31:13', 9, 319.85),
(11, '2023-12-05 19:09:46', 9, 10000.00),
(12, '2023-12-05 19:09:50', 9, 10000.00),
(13, '2023-12-05 19:10:01', 10, 1212.00),
(14, '2023-12-05 19:10:04', 10, 1212.00),
(15, '2023-12-19 09:34:17', 9, 403.90),
(16, '2023-12-19 12:21:45', 9, 89.97),
(17, '2023-12-19 16:58:52', 9, 599.94);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `ProductID` int(11) NOT NULL,
  `CategoryID` int(11) DEFAULT NULL,
  `Name` varchar(255) NOT NULL,
  `Description` text DEFAULT NULL,
  `Price` decimal(10,2) NOT NULL,
  `StockQuantity` int(11) NOT NULL,
  `Image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`ProductID`, `CategoryID`, `Name`, `Description`, `Price`, `StockQuantity`, `Image`) VALUES
(8, 2, 'New Product', 'Product Description', 99.99, 50, 'https://cdn.thewirecutter.com/wp-content/media/2023/05/handsaw-2048px-0104-3x2-1.jpg?auto=webp&quality=75&crop=3:2&width=1024'),
(9, 2, 'Product1', 'Description1', 19.99, 100, 'https://cdn.thewirecutter.com/wp-content/media/2023/05/handsaw-2048px-0104-3x2-1.jpg?auto=webp&quality=75&crop=3:2&width=1024'),
(10, 2, 'Product2', 'Description2', 29.99, 150, 'https://cdn.thewirecutter.com/wp-content/media/2023/05/handsaw-2048px-0104-3x2-1.jpg?auto=webp&quality=75&crop=3:2&width=1024'),
(11, 2, 'Product3', 'Description3', 39.99, 120, 'https://cdn.thewirecutter.com/wp-content/media/2023/05/handsaw-2048px-0104-3x2-1.jpg?auto=webp&quality=75&crop=3:2&width=1024'),
(12, 2, 'Product4', 'Description4', 49.99, 80, 'https://cdn.thewirecutter.com/wp-content/media/2023/05/handsaw-2048px-0104-3x2-1.jpg?auto=webp&quality=75&crop=3:2&width=1024'),
(13, 2, 'Product5', 'Description5', 59.99, 200, 'https://cdn.thewirecutter.com/wp-content/media/2023/05/handsaw-2048px-0104-3x2-1.jpg?auto=webp&quality=75&crop=3:2&width=1024'),
(14, 3, 'Product6', 'Description6', 24.99, 130, 'https://cdn.britannica.com/99/125399-004-3EA8B2DB/Hammer.jpg'),
(15, 3, 'Product7', 'Description7', 34.99, 90, 'https://cdn.britannica.com/99/125399-004-3EA8B2DB/Hammer.jpg'),
(16, 3, 'Product8', 'Description8', 44.99, 180, 'https://cdn.britannica.com/99/125399-004-3EA8B2DB/Hammer.jpg'),
(17, 3, 'Product9', 'Description9', 54.99, 110, 'https://cdn.britannica.com/99/125399-004-3EA8B2DB/Hammer.jpg'),
(18, 3, 'Product10', 'Description10', 64.99, 160, 'https://cdn.britannica.com/99/125399-004-3EA8B2DB/Hammer.jpg'),
(27, 3, 'mohamed abu qnem', 'back-end', 99999999.99, 1, '../../New folder (3)/images/WhatsApp Image 2023-11-23 at 02.05.25_33188b75.jpg'),
(28, 2, 'irbid', 'q', 1.00, 1, '../../New folder (3)/images/WhatsApp Image 2023-11-02 at 09.30.43_d05d13d1.jpg'),
(29, 3, 'muhannad', '123', 99999999.99, 1, '../../New folder (3)/images/mohannad.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `promotionsandcoupons`
--

CREATE TABLE `promotionsandcoupons` (
  `PromotionID` int(11) NOT NULL,
  `Code` varchar(50) DEFAULT NULL,
  `ExpirationDate` date DEFAULT NULL,
  `DiscountPercentage` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `promotionsandcoupons`
--

INSERT INTO `promotionsandcoupons` (`PromotionID`, `Code`, `ExpirationDate`, `DiscountPercentage`) VALUES
(1, 'BLACKFRIDAY', '2023-11-30', 20.00),
(2, 'HOLIDAYSALE', '2023-12-31', 15.00);

-- --------------------------------------------------------

--
-- Table structure for table `reviewsandratings`
--

CREATE TABLE `reviewsandratings` (
  `ReviewID` int(11) NOT NULL,
  `ProductID` int(11) DEFAULT NULL,
  `UserID` int(11) DEFAULT NULL,
  `ReviewText` text DEFAULT NULL,
  `Rating` int(11) DEFAULT NULL CHECK (`Rating` between 1 and 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviewsandratings`
--

INSERT INTO `reviewsandratings` (`ReviewID`, `ProductID`, `UserID`, `ReviewText`, `Rating`) VALUES
(17, 29, 12, 'asdfghj', 4);

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `RoleID` int(11) NOT NULL,
  `RoleName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`RoleID`, `RoleName`) VALUES
(1, 'Admin'),
(2, 'Customer');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UserID` int(11) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `RoleID` int(11) NOT NULL DEFAULT 2
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UserID`, `Username`, `Password`, `Email`, `RoleID`) VALUES
(9, 'laith', '$2y$10$e38OOdNljCcPWRliZsqPFewfTijyZ5prCf5joa.UOl.bzaVUy3V0u', 'laith@sleit.com', 1),
(10, 'laith2', '$2y$10$9bHJEjwx1Ji4S3aFvc5Ho.zUFVb4fHSoHvqlJmMa8VFXfARafg4Ua', 'laith2@sleit.com', 2),
(12, 'laith123', '$2y$10$KE.5CeAwZrWBOKKgJS7RX.yy/ImQadj1l/anC4fE28lk681tQ/X/u', 'Laith123@sleit.com', 2),
(14, 'laith4', '$2y$10$PceaewWV2HUWJ5eIMqG05OPFZp8qS1tZf/7U2e4bddPQ51XLmgkJa', 'laith4@sleit.com', 2),
(15, 'laith_slait', '$2y$10$QpZ0hkiWOLZMrmgGjOUYwOxbpmmTKpVhU2/Kn0vk9fHVSmtugs0IG', 'landlord@gmail.com', 2),
(17, 'L1aith', '$2y$10$bbVvhUcKKQBd.vBlkwKb/eh.VSNSRqq/hRooxipheNshlxfsSH/y.', 'L1aith@gmail.com', 1),
(18, 'laiths', '$2y$10$8deTlzX4lGs.Nn4Eob04Jucb0fKPWluHDJrt7NLm7gw2Nl7AVI54y', 'asd@123', 1),
(19, 'abd', '$2y$10$ZFVRso0eCa1KQPZnrkcvVOaGfP0uLIZoy5mSkuEq.keHAGPwrynRG', 'abs@123', 2),
(20, 'aaa', '$2y$10$H9bfH7BcA9UW.48wuyvOw.iEmMrbYWTa3G5UWua4yrC.ocZ8zAKri', 'aaa@aaa', 1),
(21, 'lith_s1234', '$2y$10$CNch0gJoKwIsz5RqxZuRte.KZnZRRGzigJJxPX2.uHKdihEI7O/L6', 'lord@gmail.com', 2);

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `WishlistID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `ProductID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wishlist`
--

INSERT INTO `wishlist` (`WishlistID`, `UserID`, `ProductID`) VALUES
(9, 9, NULL),
(10, 9, NULL),
(11, 9, NULL),
(12, 9, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`CartID`),
  ADD KEY `cart_ibfk_1` (`UserID`),
  ADD KEY `cart_ibfk_2` (`ProductID`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`CategoryID`);

--
-- Indexes for table `orderitems`
--
ALTER TABLE `orderitems`
  ADD PRIMARY KEY (`OrderItemID`),
  ADD KEY `orderitems_ibfk_1` (`OrderID`),
  ADD KEY `orderitems_ibfk_2` (`ProductID`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`OrderID`),
  ADD KEY `orders_ibfk_1` (`UserID`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`ProductID`),
  ADD KEY `product_ibfk_1` (`CategoryID`);

--
-- Indexes for table `promotionsandcoupons`
--
ALTER TABLE `promotionsandcoupons`
  ADD PRIMARY KEY (`PromotionID`),
  ADD UNIQUE KEY `Code` (`Code`);

--
-- Indexes for table `reviewsandratings`
--
ALTER TABLE `reviewsandratings`
  ADD PRIMARY KEY (`ReviewID`),
  ADD KEY `reviewsandratings_ibfk_1` (`ProductID`),
  ADD KEY `reviewsandratings_ibfk_2` (`UserID`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`RoleID`),
  ADD UNIQUE KEY `RoleName` (`RoleName`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`),
  ADD KEY `users_ibfk_1` (`RoleID`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`WishlistID`),
  ADD KEY `wishlist_ibfk_1` (`UserID`),
  ADD KEY `wishlist_ibfk_2` (`ProductID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `CartID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `CategoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `orderitems`
--
ALTER TABLE `orderitems`
  MODIFY `OrderItemID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `OrderID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `ProductID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `promotionsandcoupons`
--
ALTER TABLE `promotionsandcoupons`
  MODIFY `PromotionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `reviewsandratings`
--
ALTER TABLE `reviewsandratings`
  MODIFY `ReviewID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `RoleID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `WishlistID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `product` (`ProductID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orderitems`
--
ALTER TABLE `orderitems`
  ADD CONSTRAINT `orderitems_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `orders` (`OrderID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `product` (`ProductID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`CategoryID`) REFERENCES `category` (`CategoryID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reviewsandratings`
--
ALTER TABLE `reviewsandratings`
  ADD CONSTRAINT `reviewsandratings_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `product` (`ProductID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reviewsandratings_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`RoleID`) REFERENCES `role` (`RoleID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wishlist_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `product` (`ProductID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

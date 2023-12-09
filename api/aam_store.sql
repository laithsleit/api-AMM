-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 09, 2023 at 07:35 PM
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
(16, 'll', '$2y$10$pBLBnlyCR5ZMt0Uj69.ZqukYAaFgY6yabAhADOg53cFUX0GRa7lES', 'laith9@sleit.com', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`),
  ADD KEY `users_ibfk_1` (`RoleID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`RoleID`) REFERENCES `role` (`RoleID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 24, 2023 at 06:11 PM
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
(6, 'Building Material'),
(7, 'Hardware'),
(8, 'Plumbing'),
(9, 'Electrical'),
(10, 'Paint and Decorating'),
(11, 'Flooring'),
(12, 'Kitchen and Bath'),
(13, 'Garden and Outdoor'),
(14, 'Safety and Security'),
(15, 'Heating and Cooling'),
(16, 'Windows and Doors'),
(17, 'Lighting and Electrical Fixtures'),
(18, 'Tools and Equipment'),
(19, 'Sustainable Solutions');

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
(35, 21, 38, 1, 25.00, NULL),
(36, 21, 39, 1, 20.00, NULL),
(37, 21, 44, 1, 35.00, NULL),
(38, 21, 43, 1, 10.00, NULL),
(39, 21, 46, 1, 80.00, NULL),
(40, 21, 51, 2, 40.00, NULL),
(41, 21, 56, 1, 25.00, NULL),
(42, 22, 67, 1, 120.00, NULL),
(43, 22, 68, 2, 20.00, NULL);

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
(15, '2023-12-19 09:34:17', 9, 403.90),
(16, '2023-12-19 12:21:45', 9, 89.97),
(17, '2023-12-19 16:58:52', 9, 599.94),
(18, '2023-12-22 15:40:22', 9, 899.67),
(19, '2023-12-22 17:10:35', 9, 19.99),
(20, '2023-12-22 22:57:07', 22, 89.97),
(21, '2023-12-23 17:52:07', 9, 275.00),
(22, '2023-12-23 17:59:41', 9, 160.00);

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
(33, 6, 'AAM Premium Lumber', ' High-quality, durable lumber ideal for construction and carpentry.', 45.00, 100, '../../New folder (3)/images/DALL·E 2023-12-23 11.53.45 - A realistic image of a single premium lumber plank with the \'AAM\' logo, suitable for showcasing as AAM Premium Lumber on a website, set against a pure.png'),
(34, 6, 'AAM Reinforced Concrete', 'Strong and versatile concrete mix for foundations and structures.', 75.00, 100, '../../New folder (3)/images/DALL·E 2023-12-23 11.53.53 - A realistic image of a pile of reinforced concrete with the \'AAM\' logo, suitable for showcasing as AAM Reinforced Concrete on a website, set against a.png'),
(35, 6, 'AAM Brick Bundle', 'Premium bricks with excellent thermal properties and aesthetic appeal.', 1.50, 100, '../../New folder (3)/images/DALL·E 2023-12-23 11.53.56 - A realistic image of a stack of premium bricks with the \'AAM\' logo, suitable for showcasing as AAM Brick Bundle on a website, set against a pure white.png'),
(36, 6, 'AAM Steel Rebar', 'High-tensile steel rebar for reinforcing concrete and masonry.', 10.00, 10, '../../New folder (3)/images/DALL·E 2023-12-23 11.53.59 - A realistic image of a piece of steel rebar with the \'AAM\' logo, suitable for showcasing as AAM Steel Rebar on a website, set against a pure white bac.png'),
(37, 6, 'AAM Insulation Roll', ' Energy-efficient insulation to keep homes warm in winter and cool in summer.', 30.00, 30, '../../New folder (3)/images/DALL·E 2023-12-23 11.54.02 - A realistic image of a roll of insulation with the \'AAM\' logo, suitable for showcasing as AAM Insulation Roll on a website, set against a pure white b.png'),
(38, 7, 'AAM Precision Screwdriver Set', 'A versatile set of screwdrivers for all your fine mechanical and electronic work.', 25.00, 25, '../../New folder (3)/images/DALL·E 2023-12-23 11.56.43 - A realistic image of a precision screwdriver set with the \'AAM\' logo, suitable for showcasing as AAM Precision Screwdriver Set on a website, set again.png'),
(39, 7, 'AAM Heavy-Duty Hammer', 'Robust and durable, perfect for driving nails and breaking materials.', 20.00, 20, '../../New folder (3)/images/DALL·E 2023-12-23 11.56.46 - A realistic image of a heavy-duty hammer with the \'AAM\' logo, suitable for showcasing as AAM Heavy-Duty Hammer on a website, set against a pure white .png'),
(41, 7, 'AAM Drill Bit Set', 'High-quality bits for precise and efficient drilling in various materials.', 30.00, 30, '../../New folder (3)/images/DALL·E 2023-12-23 11.56.50 - A realistic image of a drill bit set with the \'AAM\' logo, suitable for showcasing as AAM Drill Bit Set on a website, set against a pure white backgrou.png'),
(42, 7, 'AAM Adjustable Wrench', 'Versatile tool with adjustable jaw for working with different sizes of bolts and nuts.', 15.00, 15, '../../New folder (3)/images/DALL·E 2023-12-23 11.56.53 - A realistic image of an adjustable wrench with the \'AAM\' logo, suitable for showcasing as AAM Adjustable Wrench on a website, set against a pure white.png'),
(43, 7, 'AAM Safety Goggles', ' Protect your eyes with our high-impact, clear vision goggles.', 10.00, 10, '../../New folder (3)/images/DALL·E 2023-12-23 11.56.57 - A realistic image of safety goggles with the \'AAM\' logo, suitable for showcasing as AAM Safety Goggles on a website, set against a pure white backgrou.png'),
(44, 8, 'AAM Copper Pipes(10ft)', 'Durable and reliable copper pipes for long-lasting plumbing solutions.', 35.00, 35, '../../New folder (3)/images/DALL·E 2023-12-23 11.58.41 - A realistic image of copper pipes with the \'AAM\' logo, suitable for showcasing as AAM Copper Pipes on a website, set against a pure white background.png'),
(45, 8, 'AAM PVC Tubing(10ft)', 'Versatile PVC tubing for a variety of plumbing applications.', 12.00, 12, '../../New folder (3)/images/DALL·E 2023-12-23 11.58.44 - A realistic image of PVC tubing with the \'AAM\' logo, suitable for showcasing as AAM PVC Tubing on a website, set against a pure white background.png'),
(46, 8, 'AAM Faucet Set', 'Modern and stylish faucet set to enhance your kitchen or bathroom.', 80.00, 80, '../../New folder (3)/images/DALL·E 2023-12-23 11.58.47 - A realistic image of a modern faucet set with the \'AAM\' logo, suitable for showcasing as AAM Faucet Set on a website, set against a pure white backgro.png'),
(47, 8, 'AAM Pipe Fittings', 'High-quality fittings for secure and leak-proof pipe connections.', 5.00, 100, '../../New folder (3)/images/DALL·E 2023-12-23 11.58.52 - A realistic image of pipe fittings with the \'AAM\' logo, suitable for showcasing as AAM Pipe Fittings on a website, set against a pure white background.png'),
(48, 8, 'AAM Plunger', 'Effective tool for quickly unclogging drains and toilets.', 15.00, 15, '../../New folder (3)/images/DALL·E 2023-12-23 11.58.55 - A realistic image of a plunger with the \'AAM\' logo, suitable for showcasing as AAM Plunger on a website, set against a pure white background.png'),
(49, 9, 'AAM LED Light Bulbs', 'Energy-efficient LED bulbs providing bright and long-lasting light.', 10.00, 100, '../../New folder (3)/images/DALL·E 2023-12-23 11.59.37 - A realistic image of LED light bulbs with the \'AAM\' logo, suitable for showcasing as AAM LED Light Bulbs on a website, set against a pure white backgr.png'),
(50, 9, 'AAM Electrical Wire Roll(100 ft)', 'Durable and safe wiring for all your electrical installations.', 50.00, 30, '../../New folder (3)/images/DALL·E 2023-12-23 11.59.53 - A realistic image of an electrical wire roll with the \'AAM\' logo, suitable for showcasing as AAM Electrical Wire Roll on a website, set against a pure.png'),
(51, 9, 'AAM Circuit Breakers', 'Reliable circuit breakers to protect your electrical circuits.', 40.00, 100, '../../New folder (3)/images/DALL·E 2023-12-23 12.00.05 - A realistic image of a circuit breaker with the \'AAM\' logo, suitable for showcasing as AAM Circuit Breakers on a website, set against a pure white bac.png'),
(52, 9, 'AAM Wall Outlets', 'Modern outlets for safe and convenient power access.', 8.00, 88, '../../New folder (3)/images/DALL·E 2023-12-23 12.05.31 - A realistic image of a wall outlet with the \'AAM\' logo, suitable for showcasing as AAM Wall Outlets on a website, set against a pure white background.png'),
(53, 9, 'AAM Switch Plates', 'Stylish switch plates to complement your interior design.', 5.00, 55, '../../New folder (3)/images/DALL·E 2023-12-23 12.05.35 - A realistic image of a switch plate with the \'AAM\' logo, suitable for showcasing as AAM Switch Plates on a website, set against a pure white backgroun.png'),
(54, 10, 'AAM Premium Interior Paint', 'Rich and long-lasting colors to give your walls a perfect finish.', 35.00, 35, '../../New folder (3)/images/DALL·E 2023-12-23 12.06.27 - A realistic image of a can of interior paint with the \'AAM\' logo, suitable for showcasing as AAM Premium Interior Paint on a website, set against a pu.png'),
(55, 10, 'AAM Exterior Stain', 'Durable and weather-resistant stain for outdoor surfaces.', 30.00, 30, '../../New folder (3)/images/DALL·E 2023-12-23 12.06.38 - A realistic image of a can of exterior stain with the \'AAM\' logo, suitable for showcasing as AAM Exterior Stain on a website, set against a pure white.png'),
(56, 10, 'AAM Wallpaper Rolls', ' Stylish and easy-to-apply wallpaper to transform your space.', 25.00, 25, '../../New folder (3)/images/DALL·E 2023-12-23 12.06.49 - A realistic image of a roll of wallpaper with the \'AAM\' logo, suitable for showcasing as AAM Wallpaper Rolls on a website, set against a pure white ba.png'),
(57, 10, 'AAM Paint Brushes', 'High-quality brushes for smooth and even paint application.', 8.00, 88, '../../New folder (3)/images/DALL·E 2023-12-23 12.07.03 - A realistic image of a paintbrush with the \'AAM\' logo, suitable for showcasing as AAM Paint Brushes on a website, set against a pure white background.png'),
(58, 10, 'AAM Painter\'s Tape', 'Strong and residue-free tape for precise paint jobs.', 5.00, 55, '../../New folder (3)/images/DALL·E 2023-12-23 12.07.27 - A realistic image of a roll of painter\'s tape with the \'AAM\' logo, suitable for showcasing as AAM Painter\'s Tape on a website, set against a pure whit.png'),
(59, 11, 'AAM Hardwood Flooring (sq ft)', 'Elegant and durable hardwood flooring for a timeless look.', 5.00, 123, '../../New folder (3)/images/DALL·E 2023-12-23 12.07.33 - A realistic image of hardwood flooring with the \'AAM\' logo, suitable for showcasing as AAM Hardwood Flooring on a website, set against a pure white ba.png'),
(60, 11, 'AAM Ceramic Tiles (sq ft)', 'Beautiful and versatile tiles for floors and walls.\r\nPrice: $3 per tile', 15.00, 100, '../../New folder (3)/images/DALL·E 2023-12-23 12.07.50 - A realistic image of ceramic tiles with the \'AAM\' logo, suitable for showcasing as AAM Ceramic Tiles on a website, set against a pure white background.png'),
(61, 11, 'AAM Laminate Flooring (sq ft)', 'Affordable and easy-to-install flooring with a variety of patterns.', 2.50, 102, '../../New folder (3)/images/DALL·E 2023-12-23 12.08.05 - A realistic image of laminate flooring with the \'AAM\' logo, suitable for showcasing as AAM Laminate Flooring on a website, set against a pure white ba.png'),
(62, 11, 'AAM Carpet Rolls', 'Soft and comfortable carpets in a range of colors and textures.', 4.00, 123, '../../New folder (3)/images/DALL·E 2023-12-23 12.08.17 - A realistic image of a carpet roll with the \'AAM\' logo, suitable for showcasing as AAM Carpet Rolls on a website, set against a pure white background.png'),
(63, 11, 'AAM Vinyl Flooring (sq ft)', 'Water-resistant and durable vinyl flooring for any room.', 3.00, 320, '../../New folder (3)/images/DALL·E 2023-12-23 12.08.31 - A realistic image of vinyl flooring with the \'AAM\' logo, suitable for showcasing as AAM Vinyl Flooring on a website, set against a pure white backgrou.png'),
(64, 12, 'AAM Granite Countertop (sq ft)', 'Elegant granite countertop for a luxurious kitchen or bathroom.', 75.00, 122, '../../New folder (3)/images/DALL·E 2023-12-23 14.00.55 - A realistic image of a granite countertop with a small \'AAM\' logo, suitable for showcasing as AAM Granite Countertop on a website, set against a pure .png'),
(65, 12, 'AAM Shower Head', 'High-pressure shower head for a refreshing and invigorating shower experience.', 50.00, 60, '../../New folder (3)/images/DALL·E 2023-12-23 14.01.02 - A realistic image of a high-pressure shower head with a small \'AAM\' logo, suitable for showcasing as AAM Shower Head on a website, set against a pure .png'),
(66, 12, 'AAM Bathroom Vanity', 'Stylish and functional vanity for bathroom storage and aesthetics.', 200.00, 200, '../../New folder (3)/images/DALL·E 2023-12-23 14.01.08 - A realistic image of a bathroom vanity with a small \'AAM\' logo, suitable for showcasing as AAM Bathroom Vanity on a website, set against a pure white .png'),
(67, 12, 'AAM Kitchen Sink', 'Durable and easy-to-clean kitchen sink for everyday use.', 120.00, 300, '../../New folder (3)/images/DALL·E 2023-12-23 14.01.10 - A realistic image of a kitchen sink with a small \'AAM\' logo, suitable for showcasing as AAM Kitchen Sink on a website, set against a pure white backgr.png'),
(68, 12, 'AAM Bath Towels', 'Soft and absorbent bath towels for a luxurious feel.', 20.00, 200, '../../New folder (3)/images/DALL·E 2023-12-23 14.01.13 - A realistic image of bath towels with a small \'AAM\' logo, suitable for showcasing as AAM Bath Towels on a website, set against a pure white background.png'),
(69, 13, 'AAM Lawn Mower', 'Efficient and easy-to-use lawn mower for a perfect garden.', 250.00, 12, '../../New folder (3)/images/DALL·E 2023-12-23 12.16.25 - A realistic image of a lawn mower with a subtle \'AAM\' logo as a small watermark, suitable for showcasing as AAM Lawn Mower on a website, set against a.png'),
(70, 13, 'AAM Outdoor Grill', 'High-quality grill for unforgettable outdoor cooking experiences.\r\n', 300.00, 120, '../../New folder (3)/images/DALL·E 2023-12-23 14.01.23 - A realistic image of an outdoor grill with a small \'AAM\' logo, suitable for showcasing as AAM Outdoor Grill on a website, set against a pure white bac.png'),
(71, 12, 'AAM Modern Kitchen Faucet', 'Sleek and functional faucet to enhance your kitchen\'s efficiency and style.', 120.00, 120, '../../New folder (3)/images/DALL·E 2023-12-23 14.08.17 - A realistic image of a modern kitchen faucet with a small \'AAM\' logo, suitable for showcasing as AAM Modern Kitchen Faucet on a website, set against a.png'),
(72, 12, ' AAM Bathroom Vanity', 'Elegant vanity with ample storage and a stylish finish.', 250.00, 100, '../../New folder (3)/images/DALL·E 2023-12-23 14.08.20 - A realistic image of a bathroom vanity with a small \'AAM\' logo, suitable for showcasing as AAM Bathroom Vanity on a website, set against a pure white .png'),
(73, 12, 'AAM Showerhead System', 'Luxurious and water-efficient showerhead for a spa-like experience.', 150.00, 50, '../../New folder (3)/images/DALL·E 2023-12-23 14.08.22 - A realistic image of a showerhead system with a small \'AAM\' logo, suitable for showcasing as AAM Showerhead System on a website, set against a pure wh.png'),
(74, 12, 'AAM Ceramic Sink', 'Durable and easy-to-clean sink for a pristine kitchen or bathroom.', 100.00, 25, '../../New folder (3)/images/DALL·E 2023-12-23 14.08.26 - A realistic image of a ceramic sink with a small \'AAM\' logo, suitable for showcasing as AAM Ceramic Sink on a website, set against a pure white backgr.png'),
(75, 13, 'AAM Lawn Mower', 'Powerful and easy-to-use mower for a perfectly manicured lawn.', 300.00, 250, '../../New folder (3)/images/DALL·E 2023-12-23 14.13.28 - A realistic image of a lawn mower with a small \'AAM\' logo, suitable for showcasing as AAM Lawn Mower on a website, set against a pure white background.png'),
(76, 16, 'AAM Double-Hung Window', 'Versatile and easy-to-clean double-hung windows for a classic look.', 250.00, 250, '../../New folder (3)/images/DALL·E 2023-12-23 15.46.02 - A realistic image of a double-hung window with a small \'AAM\' logo, suitable for showcasing as AAM Double-Hung Window on a website, set against a pure .png'),
(78, 15, 'AAM Sliding Patio Door', 'Elegant sliding doors that provide a seamless transition to your outdoor space.', 1000.00, 100, '../../New folder (3)/images/DALL·E 2023-12-23 15.46.05 - A realistic image of a sliding patio door with a small \'AAM\' logo, suitable for showcasing as AAM Sliding Patio Door on a website, set against a pure .png'),
(80, 15, 'AAM HVAC System', ' Efficient and reliable heating, ventilation, and air conditioning system for your comfort.', 1500.00, 150, '../../New folder (3)/images/DALL·E 2023-12-23 18.25.00 - A realistic image of an HVAC system with a small \'AAM\' logo, suitable for showcasing as AAM HVAC System on a website, set against a pure white backgro.png'),
(81, 15, 'AAM Portable Heater', 'Compact and powerful heater to warm up your space quickly.', 50.00, 100, '../../New folder (3)/images/DALL·E 2023-12-23 18.25.03 - A realistic image of a portable heater with a small \'AAM\' logo, suitable for showcasing as AAM Portable Heater on a website, set against a pure white .png'),
(82, 15, 'AAM Air Conditioner', 'High-performance air conditioner to keep you cool during the hot months.', 300.00, 50, '../../New folder (3)/images/DALL·E 2023-12-23 18.25.09 - A realistic image of an air conditioner with a small \'AAM\' logo, suitable for showcasing as AAM Air Conditioner on a website, set against a pure white.png'),
(83, 15, 'AAM Ceiling Fan', 'Stylish and energy-efficient ceiling fan for improved air circulation.', 120.00, 120, '../../New folder (3)/images/DALL·E 2023-12-23 18.25.12 - A realistic image of a ceiling fan with a small \'AAM\' logo, suitable for showcasing as AAM Ceiling Fan on a website, set against a pure white backgrou.png'),
(84, 15, 'AAM Thermostat', 'Smart thermostat for precise temperature control and energy savings.', 200.00, 200, '../../New folder (3)/images/DALL·E 2023-12-23 18.25.16 - A realistic image of a smart thermostat with a small \'AAM\' logo, suitable for showcasing as AAM Thermostat on a website, set against a pure white back.png'),
(86, 16, 'AAM Modern Front Door', 'Stylish and secure front door to make a great first impression.', 800.00, 20, '../../New folder (3)/images/DALL·E 2023-12-23 19.17.34 - A realistic image of a modern front door with a small \'AAM\' logo, suitable for showcasing as AAM Modern Front Door on a website, set against a pure wh.png'),
(88, 16, 'AAM French Doors', ' Timeless French doors to add sophistication and light to any room.', 1200.00, 1200, '../../New folder (3)/images/DALL·E 2023-12-23 19.17.51 - A realistic image of French doors with a small \'AAM\' logo, suitable for showcasing as AAM French Doors on a website, set against a pure white backgrou.png'),
(89, 16, 'AAM Garage Door', 'Durable and reliable garage door to keep your vehicle safe and secure.', 700.00, 100, '../../New folder (3)/images/DALL·E 2023-12-23 19.17.54 - A realistic image of a garage door with a small \'AAM\' logo, suitable for showcasing as AAM Garage Door on a website, set against a pure white backgrou.png'),
(90, 17, ' AAM Chandelier', 'Elegant chandelier to add a touch of luxury to your living or dining room.', 500.00, 50, '../../New folder (3)/images/DALL·E 2023-12-23 19.23.01 - A realistic image of a chandelier with a small \'AAM\' logo, suitable for showcasing as AAM Chandelier on a website, set against a pure white background.png'),
(91, 17, 'AAM LED Recessed Lights', 'Modern and energy-efficient recessed lights for a sleek look.', 40.00, 100, '../../New folder (3)/images/DALL·E 2023-12-23 19.23.04 - A realistic image of LED recessed lights with a small \'AAM\' logo, suitable for showcasing as AAM LED Recessed Lights on a website, set against a pure .png'),
(92, 17, ' AAM Outdoor Floodlight', 'Powerful and durable floodlight for enhanced outdoor security.', 150.00, 30, '../../New folder (3)/images/DALL·E 2023-12-23 19.23.07 - A realistic image of an outdoor floodlight with a small \'AAM\' logo, suitable for showcasing as AAM Outdoor Floodlight on a website, set against a pure.png'),
(93, 17, 'AAM Desk Lamp', 'Stylish and functional desk lamp for your home office or study.', 70.00, 50, '../../New folder (3)/images/DALL·E 2023-12-23 19.23.09 - A realistic image of a desk lamp with a small \'AAM\' logo, suitable for showcasing as AAM Desk Lamp on a website, set against a pure white background.png'),
(94, 17, ' AAM Pendant Light', ' Contemporary pendant light to add style and warmth to any space.', 200.00, 50, '../../New folder (3)/images/DALL·E 2023-12-23 19.23.11 - A realistic image of a pendant light with a small \'AAM\' logo, suitable for showcasing as AAM Pendant Light on a website, set against a pure white back.png'),
(95, 18, 'AAM Electric Drill', 'Powerful and efficient electric drill for precise drilling and driving.', 100.00, 180, '../../New folder (3)/images/DALL·E 2023-12-23 19.27.44 - A realistic image of an electric drill with a small \'AAM\' logo, suitable for showcasing as AAM Electric Drill on a website, set against a pure white b.png'),
(96, 18, 'AAM Electric Circular Saw', 'High-performance circular saw for fast and accurate cuts.', 130.00, 100, '../../New folder (3)/images/DALL·E 2023-12-23 19.27.47 - A realistic image of an electric circular saw with a small \'AAM\' logo, suitable for showcasing as AAM Electric Circular Saw on a website, set against .png'),
(97, 18, 'AAM Electric Sander', 'Versatile sander for smooth finishes on wood and other materials.', 90.00, 120, '../../New folder (3)/images/DALL·E 2023-12-23 19.27.49 - A realistic image of an electric sander with a small \'AAM\' logo, suitable for showcasing as AAM Electric Sander on a website, set against a pure white.png'),
(98, 18, 'AAM Electric Jigsaw', ' Precise and easy-to-use jigsaw for intricate cutting tasks.', 80.00, 90, '../../New folder (3)/images/DALL·E 2023-12-23 19.27.51 - A realistic image of an electric jigsaw with a small \'AAM\' logo, suitable for showcasing as AAM Electric Jigsaw on a website, set against a pure white.png'),
(99, 18, 'AAM Electric Angle Grinder', 'Robust angle grinder for cutting, grinding, and polishing applications.', 110.00, 60, '../../New folder (3)/images/DALL·E 2023-12-23 19.27.54 - A realistic image of an electric angle grinder with a small \'AAM\' logo, suitable for showcasing as AAM Electric Angle Grinder on a website, set agains.png'),
(100, 18, 'AAM Electric Impact Wrench', 'Heavy-duty impact wrench for high-torque applications.', 150.00, 12, '../../New folder (3)/images/DALL·E 2023-12-23 19.28.26 - A realistic image of an electric impact wrench with a small \'AAM\' logo, suitable for showcasing as AAM Electric Impact Wrench on a website, set agains.png'),
(101, 18, ' AAM Electric Heat Gun', 'Multipurpose heat gun for stripping paint, thawing pipes, and more.', 70.00, 100, '../../New folder (3)/images/DALL·E 2023-12-23 19.28.29 - A realistic image of an electric heat gun with a small \'AAM\' logo, suitable for showcasing as AAM Electric Heat Gun on a website, set against a pure w.png'),
(102, 18, 'AAM Electric Chainsaw', 'Efficient and powerful chainsaw for cutting wood quickly and easily.', 200.00, 24, '../../New folder (3)/images/DALL·E 2023-12-23 19.28.37 - A realistic image of an electric chainsaw with a small \'AAM\' logo, suitable for showcasing as AAM Electric Chainsaw on a website, set against a pure w.png'),
(103, 18, ' AAM Electric Planer', 'Precision planer for smooth and accurate wood shaping.', 120.00, 60, '../../New folder (3)/images/DALL·E 2023-12-23 19.34.17 - A realistic image of an electric planer with a small \'AAM\' logo, suitable for showcasing as AAM Electric Planer on a website, set against a pure white.png'),
(104, 18, 'AAM Electric Router', 'Advanced router for detailed woodworking and edging.', 149.00, 50, '../../New folder (3)/images/DALL·E 2023-12-23 19.34.20 - A realistic image of an electric router with a small \'AAM\' logo, suitable for showcasing as AAM Electric Router on a website, set against a pure white.png'),
(105, 19, 'AAM Rainwater Harvesting System', 'High-efficiency solar panels to harness renewable energy and reduce electricity bills.', 600.00, 120, '../../New folder (3)/images/DALL·E 2023-12-23 19.35.54 - A realistic image of solar panels with a small \'AAM\' logo, suitable for showcasing as AAM Solar Panels on a website, set against a pure white backgrou.png'),
(106, 19, ' AAM LED Lighting Solutions', ' Energy-saving LED lighting options for reducing your carbon footprint.', 20.00, 200, '../../New folder (3)/images/DALL·E 2023-12-23 19.36.06 - A realistic image of LED light bulbs with a small \'AAM\' logo, suitable for showcasing as AAM LED Lighting Solutions on a website, set against a pure w.png');

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
(15, 'Laith_slait', '$2y$10$QpZ0hkiWOLZMrmgGjOUYwOxbpmmTKpVhU2/Kn0vk9fHVSmtugs0IG', 'landlord@gmail.com', 2),
(17, 'L1aith', '$2y$10$bbVvhUcKKQBd.vBlkwKb/eh.VSNSRqq/hRooxipheNshlxfsSH/y.', 'L1aith@gmail.com', 1),
(18, 'laiths', '$2y$10$8deTlzX4lGs.Nn4Eob04Jucb0fKPWluHDJrt7NLm7gw2Nl7AVI54y', 'asd@123', 1),
(19, 'abd', '$2y$10$ZFVRso0eCa1KQPZnrkcvVOaGfP0uLIZoy5mSkuEq.keHAGPwrynRG', 'abs@123', 2),
(20, 'aaa', '$2y$10$H9bfH7BcA9UW.48wuyvOw.iEmMrbYWTa3G5UWua4yrC.ocZ8zAKri', 'aaa@aaa', 1),
(21, 'lith_s1234', '$2y$10$CNch0gJoKwIsz5RqxZuRte.KZnZRRGzigJJxPX2.uHKdihEI7O/L6', 'lord@gmail.com', 2),
(22, 'laith098', '$2y$10$96ENScgEOpQQsVdzOTztsuMwJW9nHHvlYHiE2dcrT1I1TeQ0FbFE.', 'laith098@laith098', 2),
(23, 'admin123', '$2y$10$06byCgVBdDXGDeduWVpui.t.5tiVvwgYAAfXhjo45n27kJdTsYfJK', 'admin123@gmail.com', 1),
(24, 'ahmad', '$2y$10$LxWzqQIL6Gkob2I6Bp.r/uZctTauWUuQg/WJScIkS9OBPSJrvQk7u', 'updateduser@example.com', 2),
(25, '', '$2y$10$PF/LxhcmNsUzFczQYUoZzeQAcUpYX.Yr0LHeJEEIQvHVOf5BHbwd2', '', 2),
(26, 'Laith_sleit', '$2y$10$BSDHVhg2BFs7Mt7iBPCkCeY6pL.xxPU0VyPVNhiLygZ9trXasQKgG', 'asd@gmail.com', 2),
(27, 'Signin', '$2y$10$QTmJslEn8wZD/JXY.ZWMG.S6wGodSbVnvnoOh/0QNSdeP.w2VHI7C', 'Signin@g.com', 2),
(28, 'lith_sleet', '$2y$10$qzIhe2QfGmk8mRjqjdJte.LCzuqzeWN5bsFJNnd5YLjzUDlAK09aO', 'lith@sleet.com', 2);

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
  MODIFY `CartID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=168;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `CategoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `orderitems`
--
ALTER TABLE `orderitems`
  MODIFY `OrderItemID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `OrderID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `ProductID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

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
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

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

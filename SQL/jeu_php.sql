-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 27 mars 2026 à 17:22
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `jeu_php`
--

-- --------------------------------------------------------

--
-- Structure de la table `personnages`
--

CREATE TABLE `personnages` (
  `id_personnage` int(11) NOT NULL,
  `type` varchar(32) NOT NULL,
  `degat` int(11) NOT NULL,
  `vie` int(11) NOT NULL,
  `mechant` tinyint(1) NOT NULL,
  `img` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `personnages`
--

INSERT INTO `personnages` (`id_personnage`, `type`, `degat`, `vie`, `mechant`, `img`) VALUES
(1, 'orc', 15, 100, 1, 'orc.png'),
(2, 'sorcier', 20, 80, 1, 'sorcier.png'),
(3, 'chevalier', 18, 120, 0, 'chevalier.png'),
(4, 'archer', 12, 90, 0, 'archer.png'),
(6, 'barbare', 22, 130, 0, 'barbare.png'),
(7, 'assassin', 25, 70, 0, 'assassin.png'),
(8, 'mage noir', 28, 60, 1, 'mage_noir.png'),
(9, 'gobelin', 10, 50, 1, 'gobelin.png'),
(10, 'paladin', 20, 140, 0, 'paladin.png'),
(11, 'nécromancien', 24, 75, 1, 'necromancien.png'),
(12, 'dragon', 35, 200, 1, 'dragon.png'),
(13, 'moine', 15, 110, 0, 'moine.png'),
(14, 'chasseur', 18, 95, 0, 'chasseur.png'),
(15, 'démon', 30, 150, 1, 'demon.png');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

CREATE TABLE `utilisateurs` (
  `id_utilisateur` int(11) NOT NULL,
  `pseudo` varchar(64) NOT NULL,
  `id_personnage` int(11) NOT NULL,
  `point` int(11) DEFAULT 0,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id_utilisateur`, `pseudo`, `id_personnage`, `point`, `date`) VALUES
(22, 'Maxime', 1, 0, '2026-03-25 13:31:58'),
(23, 'Maxime', 1, 0, '2026-03-25 13:36:39'),
(24, 'Maxime', 3, 0, '2026-03-25 15:09:44'),
(25, 'Maxime', 3, 0, '2026-03-25 15:11:33'),
(26, 'Maxime', 1, 0, '2026-03-25 15:26:06'),
(27, 'Maxime', 1, 0, '2026-03-25 19:22:41'),
(28, 'Maxime', 1, 0, '2026-03-25 19:25:40'),
(29, 'Maxime', 1, 0, '2026-03-25 20:03:29'),
(30, 'Maxime', 1, 0, '2026-03-25 20:14:12'),
(31, 'Maxime', 2, 0, '2026-03-25 20:37:10'),
(32, 'Maxime', 3, 0, '2026-03-25 20:47:33'),
(33, 'Maxime', 3, 0, '2026-03-25 20:50:05'),
(34, 'Maxime', 1, 0, '2026-03-25 20:56:37'),
(35, 'Maxime', 4, 0, '2026-03-25 20:57:58'),
(36, 'Maxime', 4, 0, '2026-03-25 21:04:00'),
(37, 'Maxime', 1, 0, '2026-03-26 06:32:54'),
(38, 'Maxime', 1, 0, '2026-03-26 06:37:00'),
(39, 'Maxime', 2, 0, '2026-03-26 06:38:53'),
(40, 'mc', 4, 0, '2026-03-26 07:29:13'),
(41, 'Maxime', 3, 0, '2026-03-26 07:33:44'),
(42, 'Maxime', 1, 0, '2026-03-26 07:35:21'),
(43, 'Maxime', 1, 0, '2026-03-26 07:36:09'),
(44, 'Maxime', 1, 0, '2026-03-26 07:36:54'),
(45, 'pp', 3, 0, '2026-03-26 09:19:01'),
(48, 'Maxime', 7, 0, '2026-03-26 17:14:49'),
(49, 'Maxime', 8, 0, '2026-03-26 17:18:55'),
(51, 'Maxime', 10, 0, '2026-03-26 17:44:43'),
(52, 'Maxime', 9, 0, '2026-03-26 17:46:19'),
(53, 'Maxime', 11, 0, '2026-03-26 18:02:36'),
(54, 'Maxime', 7, 0, '2026-03-26 18:04:29'),
(55, 'Maxime', 12, 0, '2026-03-26 18:50:23'),
(56, 'Maxime', 6, 0, '2026-03-26 18:52:31'),
(57, 'Maxime', 1, 0, '2026-03-26 18:55:59'),
(59, 'Maxime', 11, 0, '2026-03-27 10:40:23'),
(60, 'Maxime', 11, 0, '2026-03-27 10:41:38'),
(61, 'Maxime', 12, 0, '2026-03-27 10:45:57'),
(62, 'Maxime', 7, 0, '2026-03-27 10:48:01'),
(63, 'Maxime', 1, 0, '2026-03-27 12:07:29'),
(64, 'Maxime', 1, 0, '2026-03-27 12:11:40'),
(65, 'Maxime', 10, 0, '2026-03-27 13:36:37'),
(66, 'Maxime', 2, 0, '2026-03-27 13:44:15'),
(67, 'Maxime', 2, 0, '2026-03-27 13:46:42'),
(69, 'Maxime', 12, 0, '2026-03-27 14:28:44'),
(70, 'morceaufv', 12, 0, '2026-03-27 14:34:08'),
(71, 'pp', 7, 0, '2026-03-27 14:36:39'),
(72, 'bb', 15, 0, '2026-03-27 14:37:30'),
(73, 'gob', 9, 0, '2026-03-27 14:39:00'),
(74, 'pala', 10, 0, '2026-03-27 14:39:58');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `personnages`
--
ALTER TABLE `personnages`
  ADD PRIMARY KEY (`id_personnage`);

--
-- Index pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`id_utilisateur`),
  ADD KEY `id_personnage` (`id_personnage`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `personnages`
--
ALTER TABLE `personnages`
  MODIFY `id_personnage` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `id_utilisateur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD CONSTRAINT `utilisateurs_ibfk_1` FOREIGN KEY (`id_personnage`) REFERENCES `personnages` (`id_personnage`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

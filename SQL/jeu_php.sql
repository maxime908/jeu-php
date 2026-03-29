-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 29 mars 2026 à 19:59
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
(93, 'the king', 10, 3, '2026-03-29 13:28:15'),
(94, 'the king', 1, 0, '2026-03-29 13:38:49'),
(95, 'Max', 1, 5, '2026-03-29 14:19:52'),
(96, 'Max', 1, 0, '2026-03-29 14:29:52'),
(97, 'qsdqsdqs', 7, 0, '2026-03-29 15:33:00'),
(98, 'qsdqsd', 1, 0, '2026-03-29 15:33:01'),
(99, 'dqsdqsd', 13, 0, '2026-03-29 15:33:02'),
(100, 'qsdqsd', 1, 0, '2026-03-29 15:33:03'),
(101, 'qsdqsdqd', 11, 0, '2026-03-29 15:33:04'),
(102, 'qsdqsdqsq', 3, 0, '2026-03-29 15:33:05'),
(103, 'qsdqsd', 12, 0, '2026-03-29 15:33:06'),
(104, 'qsdqsdqsd', 2, 0, '2026-03-29 15:33:07'),
(105, 'qsdqsdq', 10, 0, '2026-03-29 15:33:08'),
(106, 'qsdqsdqd', 8, 0, '2026-03-29 15:33:09'),
(107, 'Max', 1, 0, '2026-03-29 15:44:07'),
(108, 'Max', 1, 0, '2026-03-29 15:52:15'),
(109, 'Max', 1, 0, '2026-03-29 16:11:10'),
(110, 'Max', 12, 7, '2026-03-29 16:56:40'),
(111, 'Max', 1, 0, '2026-03-29 17:00:13');

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
  MODIFY `id_utilisateur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

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

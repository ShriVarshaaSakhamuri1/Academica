-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 23, 2024 at 05:16 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `conference_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `activities`
--

CREATE TABLE `activities` (
  `id` int(11) NOT NULL,
  `activity` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activities`
--

INSERT INTO `activities` (`id`, `activity`, `created_at`) VALUES
(1, 'New user registered: John Doe', '2024-11-19 21:24:36'),
(2, 'Job posted: Software Developer at Tech Corp', '2024-11-19 21:24:36'),
(3, 'New event added: AI Conference 2024', '2024-11-19 21:24:36');

-- --------------------------------------------------------

--
-- Table structure for table `career_articles`
--

CREATE TABLE `career_articles` (
  `article_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author_id` int(11) DEFAULT NULL,
  `content` text NOT NULL,
  `published_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `career_articles`
--

INSERT INTO `career_articles` (`article_id`, `title`, `author_id`, `content`, `published_date`) VALUES
(1, 'How to Ace Technical Interviews', 2, 'Here are some tips to prepare for technical interviews...', '2024-10-01');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `type` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `speaker` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `title`, `date`, `type`, `location`, `description`, `speaker`) VALUES
(1, 'mew', '2024-11-23', 'Conference', 'Texas', 'Texas', NULL),
(2, 'new event', '2024-11-20', 'Conference', 'Texas', 'UTA', 'New Speaker'),
(3, 'New Event5', '2024-11-21', 'Conference', 'New York', 'Descroiption', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `forum_posts`
--

CREATE TABLE `forum_posts` (
  `post_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `forum_posts`
--

INSERT INTO `forum_posts` (`post_id`, `user_id`, `group_id`, `title`, `content`, `created_at`) VALUES
(1, 1, 1, 'Introduction to Data Science', 'Let’s discuss how to start learning data science.', '2024-11-15 18:33:29'),
(2, 2, 2, 'React vs Angular', 'What are your experiences using React and Angular?', '2024-11-15 18:33:29');

-- --------------------------------------------------------

--
-- Table structure for table `interest_groups`
--

CREATE TABLE `interest_groups` (
  `group_id` int(11) NOT NULL,
  `group_name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `interest_groups`
--

INSERT INTO `interest_groups` (`group_id`, `group_name`, `description`, `created_at`) VALUES
(1, 'Data Science Enthusiasts', 'A group for students and academics interested in data science topics', '2024-11-15 18:33:29'),
(2, 'Web Development Masters', 'Discuss all things related to web development and frameworks', '2024-11-15 18:33:29');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `job_id` int(11) NOT NULL,
  `job_title` varchar(100) NOT NULL,
  `company_name` varchar(100) NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  `job_description` text DEFAULT NULL,
  `job_type` enum('full-time','internship') NOT NULL,
  `posted_by` int(11) DEFAULT NULL,
  `posted_date` date DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`job_id`, `job_title`, `company_name`, `location`, `job_description`, `job_type`, `posted_by`, `posted_date`) VALUES
(1, 'Frontend Developer', 'TechCorp', 'Remote', 'We are looking for a skilled frontend developer with experience in React.', 'full-time', 2, '2024-11-16'),
(2, 'Data Analyst', 'DataInsights Ltd.', 'New York, NY', 'Join our team as a data analyst to work on exciting projects in data science.', 'internship', 3, '2024-11-16'),
(3, 'Frontend Developer', 'TechCorp', 'Remote', 'We are looking for a skilled frontend developer with experience in React.', 'full-time', 3, '2024-11-16'),
(5, 'Backend Developer', 'Test', 'Hyderanad', 'Description', 'internship', 2, '2024-11-19'),
(6, 'Full Stack Developer', 'Test', 'Hyde', '555', '', 2, '2024-11-19'),
(7, 'Full Stack', 'New York', 'New York', 'Description', '', 2, '2024-11-19'),
(8, 'Data Analyst', 'Test', 'New York', 'Description', '', 2, '2024-11-19'),
(9, 'Data Analyst', 'Deve', 'New york', 'Description', '', 2, '2024-11-19');

-- --------------------------------------------------------

--
-- Table structure for table `job_applications`
--

CREATE TABLE `job_applications` (
  `id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `cover_letter` text NOT NULL,
  `experience` text NOT NULL,
  `skills` text NOT NULL,
  `resume_path` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `job_applications`
--

INSERT INTO `job_applications` (`id`, `job_id`, `user_id`, `cover_letter`, `experience`, `skills`, `resume_path`, `created_at`) VALUES
(1, 1, NULL, '55', '55', '55', '\\uploads\\1490f0bffb06d8bf60041b602.png', '2024-11-19 18:39:35'),
(2, 1, NULL, '55', '55', '55', '\\uploads\\1490f0bffb06d8bf60041b603.png', '2024-11-19 18:40:48'),
(3, 1, 4, '5555', '555', '55', '\\uploads\\1490f0bffb06d8bf60041b605.png', '2024-11-19 18:43:40'),
(4, 1, 4, '555', '555', '55', '\\uploads\\1490f0bffb06d8bf60041b606.png', '2024-11-19 18:44:13'),
(5, 1, 4, '44', '444', '44', '\\uploads\\1490f0bffb06d8bf60041b607.png', '2024-11-19 18:44:28'),
(6, 5, 4, 'New', '5 years', 'JS', '\\uploads\\1490f0bffb06d8bf60041b608.png', '2024-11-19 22:24:00');

-- --------------------------------------------------------

--
-- Table structure for table `mentorship_program`
--

CREATE TABLE `mentorship_program` (
  `mentor_id` int(11) NOT NULL,
  `mentee_id` int(11) NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_type` enum('student','academic','mentor') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `phone` varchar(15) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `gender` enum('Male','Female','Other') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `email`, `password`, `user_type`, `created_at`, `phone`, `bio`, `gender`) VALUES
(1, 'John', 'Doe', 'john.doe@example.com', '$2b$10$N4U3M/mzt6RNyQeiNgJFKeMAXSkDG8p3aDczm8/sFCKj930rRsai2', 'student', '2024-11-15 18:33:29', NULL, NULL, NULL),
(2, 'Jane', 'Smith', 'admin@gmail.com', '$2b$10$N4U3M/mzt6RNyQeiNgJFKeMAXSkDG8p3aDczm8/sFCKj930rRsai2', 'academic', '2024-11-15 18:33:29', NULL, NULL, NULL),
(3, 'Mike', 'Johnson', 'mike.johnson@example.com', '$2b$10$N4U3M/mzt6RNyQeiNgJFKeMAXSkDG8p3aDczm8/sFCKj930rRsai2', 'mentor', '2024-11-15 18:33:29', NULL, NULL, NULL),
(4, 'New', 'User', 'student@gmail.com', '$2b$10$N4U3M/mzt6RNyQeiNgJFKeMAXSkDG8p3aDczm8/sFCKj930rRsai2', 'student', '2024-11-19 14:23:19', '9638527410', 'Developer', 'Male');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `career_articles`
--
ALTER TABLE `career_articles`
  ADD PRIMARY KEY (`article_id`),
  ADD KEY `author_id` (`author_id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `forum_posts`
--
ALTER TABLE `forum_posts`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `group_id` (`group_id`);

--
-- Indexes for table `interest_groups`
--
ALTER TABLE `interest_groups`
  ADD PRIMARY KEY (`group_id`),
  ADD UNIQUE KEY `group_name` (`group_name`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`job_id`),
  ADD KEY `posted_by` (`posted_by`);

--
-- Indexes for table `job_applications`
--
ALTER TABLE `job_applications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mentorship_program`
--
ALTER TABLE `mentorship_program`
  ADD PRIMARY KEY (`mentor_id`,`mentee_id`),
  ADD KEY `mentee_id` (`mentee_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activities`
--
ALTER TABLE `activities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `career_articles`
--
ALTER TABLE `career_articles`
  MODIFY `article_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `forum_posts`
--
ALTER TABLE `forum_posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `interest_groups`
--
ALTER TABLE `interest_groups`
  MODIFY `group_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `job_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `job_applications`
--
ALTER TABLE `job_applications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `career_articles`
--
ALTER TABLE `career_articles`
  ADD CONSTRAINT `career_articles_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `forum_posts`
--
ALTER TABLE `forum_posts`
  ADD CONSTRAINT `forum_posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `forum_posts_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `interest_groups` (`group_id`);

--
-- Constraints for table `jobs`
--
ALTER TABLE `jobs`
  ADD CONSTRAINT `jobs_ibfk_1` FOREIGN KEY (`posted_by`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `mentorship_program`
--
ALTER TABLE `mentorship_program`
  ADD CONSTRAINT `mentorship_program_ibfk_1` FOREIGN KEY (`mentor_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `mentorship_program_ibfk_2` FOREIGN KEY (`mentee_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

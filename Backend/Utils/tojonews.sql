-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 26, 2025 at 02:47 PM
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
-- Database: `tojonews`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `ID` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`ID`, `email`, `password`, `type`) VALUES
(1, 'admin@gmail.com', '1234', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `authors`
--

CREATE TABLE `authors` (
  `ID` int(11) NOT NULL,
  `uuid` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `authors`
--

INSERT INTO `authors` (`ID`, `uuid`, `name`) VALUES
(2, 'f12c441b-2931-4651-a151-14041b2cf2b9', 'swapnil ahmed shishir123'),
(3, 'e1e1df96-74c9-4fac-bd88-27948b60548b', 'swapnil ahmed shishir'),
(4, 'd0806f74-4d43-46f4-838c-6d5b375f71e0', 'shishir');

-- --------------------------------------------------------

--
-- Table structure for table `blognews`
--

CREATE TABLE `blognews` (
  `ID` int(11) NOT NULL,
  `uuid` char(36) DEFAULT NULL,
  `author1_id` int(11) NOT NULL,
  `author2_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `permalink` varchar(255) NOT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `dateAndTime` datetime DEFAULT NULL,
  `thumble` varchar(255) DEFAULT NULL,
  `articalpost` mediumtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blognews`
--

INSERT INTO `blognews` (`ID`, `uuid`, `author1_id`, `author2_id`, `title`, `permalink`, `subtitle`, `category_id`, `dateAndTime`, `thumble`, `articalpost`) VALUES
(22, '0677dca3-88ce-4834-979e-4db4f890f5ca', 2, NULL, 'Does the ETH ETF ‘fee war’ even matter to investors?', 'Does the ETH ETF fee war even matter to investors', 'Franklin Templeton has the lowest intended ETH fund fee so far, though a similar advantage did not help it win the race for bitcoin ETF assets', 3, '2024-07-28 20:37:01', '560fe69b-a312-43b5-a5ed-6a35e98c659e_1722177333496-template-1599667_1280.png', '<p>&ldquo;A BlackRock ether ETF would probably be much more popular than an ether ETF from an upstart ETF issuer, even if the BlackRock fund was five basis points more expensive,&rdquo; he told Blockworks.&nbsp;</p>\r\n<p>Roy acknowledged that a larger difference &mdash; such as 10 or 20 basis points &mdash; could prove to be a bigger deal to investors.&nbsp;</p>\r\n<p>Ultimately, he added, the spot bitcoin ETF saga offers &ldquo;a good template&rdquo; for how competition within the ether ETF category could shake out.</p>\r\n<p>&ldquo;BlackRock and Fidelity have huge advantages which they will exploit, but there is room for smaller issuers like&nbsp;<a href=\"https://blockworks.co/tag/bitwise\" target=\"_blank\" rel=\"nofollow noopener\">Bitwise</a>&nbsp;to gain a foothold in the space as well with low fees and unique angles,&rdquo; he said.</p>\r\n<p>The lowest US spot bitcoin ETF fee &mdash; excluding initial fee waivers &mdash; was Franklin Templeton&rsquo;s, at 0.19%. The firm&nbsp;<a href=\"https://blockworks.co/news/franklin-templeton-bitcoin-etf-fees\" target=\"_blank\" rel=\"nofollow noopener\">undercut Bitwise&rsquo;s 0.20% fee</a>&nbsp;a day after the funds launched.</p>\r\n<p>But Franklin Templeton&rsquo;s BTC fund has attracted just $345 million of net inflows after six months on the market. The Bitwise Bitcoin ETF (BITB) has brought in about $2.1 billion.</p>\r\n<p>Funds by BlackRock and Fidelity lead flows in the category, with $18 billion and $9.5 billion, respectively. Both charge a slightly higher 0.25%.</p>\r\n<p>The most expensive fund by far &mdash; the Grayscale Bitcoin Trust ETF (GBTC), at 1.5% &mdash; has endured $18.6 billion of net outflows.</p>\r\n<p>Industry watchers continue to watch what Grayscale might charge for&nbsp;<a href=\"https://blockworks.co/news/grayscale-takes-page-from-blackrock-playbook\" target=\"_blank\" rel=\"nofollow noopener\">the &ldquo;Mini&rdquo; versions</a>&nbsp;of GBTC and its&nbsp;<a href=\"https://blockworks.co/news/grayscale-eth-trust-ethe-filing-vaneck-proshares\" target=\"_blank\" rel=\"nofollow noopener\">Ethereum Trust</a>&nbsp;(ETHE).</p>\r\n<p>While some advisers have said they have moved money out of GBTC into cheaper BTC funds, others have considered custodians, spreads and liquidity when making decisions on which ETFs to allocate to. &nbsp;</p>\r\n<hr class=\"wp-block-separator has-alpha-channel-opacity\">\r\n<p><strong>Start your day with top cry</strong></p>'),
(23, '83fa41f6-b93f-4308-a502-2a6d3f510de3', 4, NULL, 'House fails to override veto of anti-SAB 121 bill ', 'House fails to override veto of anti SAB 121 bill ', 'Representatives on Thursday opted to back President Biden and uphold his veto of the legislation that sought to invalidate SAB 121', 10, '2024-07-28 20:35:07', 'c9a9dc01-6258-41ec-9eec-0e8a244c59d9_1722177307902-istockphoto-1346125184-612x612.jpg', '<p>House Financial Services Committee Chair Patrick McHenry, R-N.C., spoke in favor of overriding the veto Wednesday, arguing the bipartisan support the resolution received is proof Reps. should stand their ground.&nbsp;</p>\r\n<p>&ldquo;​​SAB 121 is one of the most glaring examples of the regulatory overreach that has defined Chair&nbsp;<a href=\"https://blockworks.co/tag/gary-gensler\" target=\"_blank\" rel=\"nofollow noopener\">Gary Gensler</a>&rsquo;s tenure at the [SEC],&rdquo; McHenry said. &ldquo;It limits consumers options to safely custody their digital assets, upending decades of bank custody practices and increasing concentration risk.&rdquo;&nbsp;</p>\r\n<p><strong>Read more from our opinion section:</strong>&nbsp;<a href=\"https://blockworks.co/news/senate-gensler-sec-overturn-sab-121\" target=\"_blank\" rel=\"nofollow noopener\">It&rsquo;s time to overturn SAB 121</a></p>\r\n<p>The House and Senate&nbsp;<a href=\"https://blockworks.co/news/senate-passes-resolution-to-overturn-sab121\" target=\"_blank\" rel=\"nofollow noopener\">passed Joint Resolution 109 in May</a>. The legislation, if passed, would have overturned SAB 121, the accounting guidance that states digital asset custodians should&nbsp;<a href=\"https://blockworks.co/news/sec-staff-call-for-crypto-entities-to-show-liability-on-balance-sheet\" target=\"_blank\" rel=\"nofollow noopener\">report a liability and &ldquo;corresponding assets&rdquo;</a>&nbsp;on their balance sheets for all custodied cryptocurrencies.&nbsp;</p>\r\n<p>Each chamber approved the resolution, which was brought under the Congressional Review Act, with bipartisan support. Thirty-three Democrats in total voted in favor of the legislation across both chambers.&nbsp;</p>\r\n<p>President Biden,&nbsp;<a href=\"https://www.whitehouse.gov/wp-content/uploads/2024/05/SAP-HJRes109.pdf\" target=\"_blank\" rel=\"nofollow noopener\">as expected</a>, vetoed the resolution shortly after it was passed. His administration stated that by invoking the Congressional Review Act, lawmakers could &ldquo;inappropriately constrain the&nbsp;<a href=\"https://blockworks.co/tag/sec\" target=\"_blank\" rel=\"nofollow noopener\">SEC</a>&rsquo;s ability to ensure appropriate guardrails.&rdquo;</p>\r\n<p>&ldquo;President Biden vetoed the first digital asset-specific legislation that ever passed the House and the Senate,&rdquo; McHenry said. &ldquo;It&rsquo;s never been clearer; this administration would rather play politics and side with power-hungry bureaucrats over the American people.&rdquo;</p>\r\n<hr class=\"wp-block-separator has-alpha-channel-opacity\">\r\n<p><strong>Start your day with top crypto insights from David Canellis and Katherine Ross.&nbsp;<a href=\"https://blockworks.co/newsletter/empire\" target=\"_blank\" rel=\"nofollow noopener\">Subscribe to the Empire newsletter</a>.</strong></p>\r\n<p><strong>Explore the growing intersection between crypto, macroeconomics, policy and finance with Ben Strack, Casey Wagner and Felix Jauvin.&nbsp;<a href=\"https://blockworks.co/newsletter/onthemargin\" target=\"_blank\" rel=\"nofollow noopener\">Subscribe to the On the Margin newsletter</a>.</strong></p>'),
(24, '6b3e4855-bd8d-4db4-9f63-6543b7d52a38', 2, NULL, 'Empire Newsletter: Is Coinbase stock a proxy bet on crypto’s success?', 'Empire Newsletter: Is Coinbase stock a proxy bet on crypto’s success?', 'Plus, do we have an “Amazon of crypto”?', 8, '2024-07-27 19:24:24', '7a62a895-76f8-466c-9cad-91f39dd4d099_1722086664517-Screenshot (12).png', '<p>But what does success mean for crypto?</p>\r\n<p>Basing it on rising prices and record-high valuations feels right but markets don&rsquo;t really tell the whole story.&nbsp;</p>\r\n<p>Maybe success is more about how much data is kept in decentralized file storage protocols, or stablecoin adoption in places with rampant high inflation.&nbsp;</p>\r\n<p>Perhaps it&rsquo;s the total value locked in real-world asset projects, like BlackRock&rsquo;s tokenized money market fund on Ethereum. All those have little to do with whether bitcoin&rsquo;s price goes up or down.</p>\r\n<p>Yep, crypto consuming traditional finance and bringing blockchain rails to the masses sounds like success to me.&nbsp;</p>\r\n<p>For Coinbase, figuring out ways to offer shareholders exposure to that goal seems like the move. But since its direct listing in April 2021 &mdash; practically peak bull market &mdash; the stock has been closely tied to bitcoin&rsquo;s price, as is the case with the rest of the crypto market.</p>\r\n<figure class=\"wp-block-image\"><span class=\"block\"><span class=\"hover:cursor-pointer align-center block\"><img src=\"https://lh7-us.googleusercontent.com/docsz/AD_4nXeKrl68okmmxUD-zanUyplZuDKHIOpf1Lz9n_EiajYdUyXXNWsLkJ7m6X_GK9knFNxGsn7zto3L2mIkZApNplgyPZxNZXksgQrcIJz2_amh8jUelY-T1NeMucRQDLACwwqjKGrixD9tRIEWoZqadSPgcbqd?key=NpibROXxzPGADSHu9JOh8w\" alt=\"\"></span></span></figure>'),
(26, '2c1973b0-05fe-4611-9abd-391841c8189c', 4, NULL, 'On the Margin Newsletter: Biden’s SEC nominee appears safe', 'On the Margin Newsletter: Biden’s SEC nominee appears safe', 'Plus, publicly traded crypto companies had a pretty eventful news week', 8, '2024-07-27 19:23:16', 'b5c20b30-f962-4ef0-be6a-130180941761_1722086596354-450972718_7993235647400889_4215672046595020564_n.jpg', '<h2 id=\"senate-seems-poised-to-push-biden-nominations-through\" class=\"wp-block-heading\">Senate seems poised to push Biden nominations through&nbsp;</h2>\r\n<p>Fortunately for the nominees, yesterday&rsquo;s Senate Banking Committee confirmation hearings were largely uneventful.&nbsp;</p>\r\n<p>SEC Commissioner Caroline Crenshaw, up for another term at the securities regulator, flew mostly under the radar. Committee members posed more questions to Christy Goldsmith Romero, President Biden&rsquo;s pick to chair the Federal Deposit Insurance Corporation.&nbsp;</p>\r\n<p>Kristin Johnson, put up to be an Assistant Secretary of the Treasury, and Gordon Ito, nominated to be a member of the Financial Stability Oversight Council, also faced questions Thursday.&nbsp;</p>\r\n<p>Goldsmith Romero stands to take over the FDIC as the agency faces controversy. A May&nbsp;<a href=\"https://www.fdic.gov/news/press-releases/fdic-special-review-committee-releases-independent-report-workplace-misconduct\" target=\"_blank\" rel=\"nofollow noopener\">report</a>&nbsp;uncovered allegations of sexual harassment and discrimination at the FDIC, raising questions about whether Chair Martin Gruenberg should continue in the role.&nbsp;</p>\r\n<p>The nominee told Senators Thursday she plans for a &ldquo;complete overhaul&rdquo; of the agency should she be approved, including firing employees who have harassed or abused others and implementing a new system for registering complaints.&nbsp;</p>'),
(27, 'e6df5b43-c7cd-480d-9827-c78544e05e73', 4, 2, 'Bitcoin ETF segment sees record-tying fifth straight day of outflows', 'Bitcoin ETF segment sees record tying fifth straight day of outflows', 'BlackRock’s iShares Bitcoin Trust continues to see daily positive net flows, though its inflow total for a single day hit a new low Wednesday', 4, '2024-07-27 19:22:44', '69b220d0-f284-45c4-ab10-d7849ab5fc5d_1722086564334-istockphoto-1346125184-612x612.jpg', '<p>The five-day net outflow total beginning on April 12 amounts to $319 million, reflecting an average of $64 million over the span. That peaked on Wednesday, when $165 million left the 11-fund sector.&nbsp;&nbsp;&nbsp;</p>\r\n<p>Such an outflow streak has happened just once before, with US spot bitcoin ETFs bleeding assets each day from March 18 to March 22. Those outflows were heavier than the latest active streak, totaling $888 million.</p>\r\n<p>The main culprit driving the net outflows is the Grayscale Bitcoin Trust (GBTC). The higher-priced fund, which converted to an ETF in January, has averaged $116 million of net outflows per day over the last five trading days.</p>\r\n<p>Aside from GBTC, only the Ark 21Shares Bitcoin ETF (ARKB) has contributed any meaningful net outflows, seeing $43 million exit the fund on Wednesday. Others meanwhile have watched their inflows completely stop.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>\r\n<p>Unique to its competitors, the flow-gathering leader in the space, BlackRock, has kept its daily flows positive.&nbsp;</p>\r\n<p>Nine US spot bitcoin ETFs saw zero inflows on both April 12 and April 15, according to Farside Investors&nbsp;<a href=\"https://farside.co.uk/?p=997\" target=\"_blank\" rel=\"nofollow noopener\">data</a>. IBIT&rsquo;s net inflows were $111 million and $73 million on those days, respectively.&nbsp;&nbsp;</p>\r\n<p><strong>Read more:&nbsp;</strong><a href=\"https://blockworks.co/news/blackrock-extends-bitcoin-etf-inflows\" target=\"_blank\" rel=\"nofollow noopener\">BlackRock</a></p>'),
(28, '10a16b2f-2a34-4d64-b549-0008613dc6b2', 2, NULL, 'উচ্চশিক্ষা প্রতিষ্ঠান খুলে দিতে শিক্ষামন্ত্রীর বার্তা', 'উচ্চশিক্ষা প্রতিষ্ঠান খুলে দিতে শিক্ষামন্ত্রীর বার্তা', 'দেশব্যাপী কোটা বিরোধী আন্দোলনকে ঘিরে সৃষ্ট সহিংসতার কারণে অনির্দিষ্টকালের জন্য বন্ধ রয়েছে দেশের সব সরকারি বেসরকারি বিশ্ববিদ্যালয়। এসব শিক্ষাপ্রতিষ্ঠান খোলার আগে ছাত্র সংগঠনগুলোর সঙ্গে আলোচনা করার উদ্যোগ নিয়েছে শিক্ষা মন্ত্রণালয়।', 7, '2024-07-27 19:22:31', '7fe28025-81b2-4793-8400-a8ca65832bca_1722086551055-1722010678-de2f058dbebea4ad50d6ca5bc2d35b9d.jpg', '<p>দেশব্যাপী কোটা বিরোধী আন্দোলনকে ঘিরে সৃষ্ট সহিংসতার কারণে অনির্দিষ্টকালের জন্য বন্ধ রয়েছে দেশের সব সরকারি বেসরকারি বিশ্ববিদ্যালয়। এসব শিক্ষাপ্রতিষ্ঠান খোলার আগে ছাত্র সংগঠনগুলোর সঙ্গে আলোচনা করার উদ্যোগ নিয়েছে শিক্ষা মন্ত্রণালয়।</p>\r\n<p>বিশ্ববিদ্যালয় খোলার কর্মপন্থা নিয়ে শুক্রবার (২৬ জুলাই) বিকেলে শিক্ষা মন্ত্রণালয়ের জনসংযোগ কর্মকর্তা এম এ খায়েরের পাঠানো শিক্ষামন্ত্রী মহিবুল হাসান চৌধুরীর এক বার্তায় এ তথ্য জানানো হয়।</p>\r\n<p>এতে বলা হয়েছে, উচ্চশিক্ষা প্রতিষ্ঠানগুলোতে নিরাপত্তা ও সৌহার্দপূর্ণ পরিবেশ নিশ্চিত করে পাঠদান শুরু করার জন্য ছাত্র সংগঠনগুলোর নেতাদের সঙ্গে আলোচনা করার জন্য প্রতিষ্ঠান প্রধানদের প্রতি অনুরোধ জানিয়েছে শিক্ষা মন্ত্রণালয়।</p>\r\n<div class=\"m-0 p-0\" data-position=\"desktop-details-article-mid\">&nbsp;</div>\r\n<p>&nbsp;</p>\r\n<p>উল্লেখ্য, গত ১৬ জুলাই রাতে কোটা বিরোধী আন্দোলনে সহিংসতা বাড়ার আশঙ্কায় দেশের সব সরকারি ও বেসরকারি বিশ্ববিদ্যালয়গুলোর উপাচার্যদের &nbsp;অনির্দিষ্টকালের জন্য বিশ্ববিদ্যালয় বন্ধ ঘোষণার নির্দেশনা দেয় বিশ্ববিদ্যালয় মঞ্জুরী কমিশন (ইউজিসি)। একইসঙ্গে শিক্ষার্থীদের আবাসিক হল ত্যাগের নির্দেশনা দেওয়া হয়। এর পরদিন থেকে বিশ্ববিদ্যালয়গুলো সিন্ডিকেট সভা আহ্বান করে ইউজিসির সিদ্ধান্ত বাস্তবায়ন করে।</p>'),
(29, '3aa75789-4c0b-42e4-8476-86965697cad8', 3, 3, 'Nomura’s crypto unit to offer yield-bearing ETH fund: Report', 'Nomura’s crypto unit to offer yield bearing ETH fund: Report', 'Accredited investors will soon be able to tap into a yield-bearing ETH fund', 4, '2024-07-27 19:22:11', '5e46d72f-39b0-4348-9fea-2c7bc949e9ba_1722086531832-template-1599667_1280.png', '<p>Swiss-based Laser Digital, the digital asset subsidiary of Japanese investment bank Nomura, is reportedly planning to introduce an alternative to spot ETH ETFs.</p>\r\n<p>Unlike the nine ether ETFs launched three days ago, Laser Digital&rsquo;s ETH fund would generate yield and accrue rewards from the underlying Ethereum blockchain network, according to&nbsp;<a href=\"https://news.bloomberglaw.com/business-and-practice/nomura-crypto-unit-to-offer-high-yielding-ether-etf-alternative\" target=\"_blank\" rel=\"nofollow noopener\">Bloomberg</a>.</p>\r\n<p>These rewards are made up of the same token emissions and maximal extractable value (MEV) that is accrued by Ethereum validators running their own node, or users staking ETH with a liquid staking platform like Lido. It&rsquo;s a notably absent element with the current ETH ETFs.</p>\r\n<p><strong>Read more:</strong>&nbsp;<a href=\"https://blockworks.co/news/proposed-ether-etfs-not-staking-eth\" target=\"_blank\" rel=\"nofollow noopener\">Proposed ether ETFs would not stake their ETH, new filings clarify</a></p>\r\n<p>According to&nbsp;<a href=\"https://www.bloomberg.com/news/articles/2024-07-26/nomura-s-crypto-unit-to-offer-higher-yielding-ether-etf-alternative?sref=dkjk6XjG\" target=\"_blank\" rel=\"nofollow noopener\">Bloomberg</a>, Galaxy Digital will potentially assist&nbsp;<a href=\"https://blockworks.co/tag/laser-digital\" target=\"_blank\" rel=\"nofollow noopener\">Laser Digital</a>&nbsp;in running the validator nodes that generate the yield for investors.</p>\r\n<p>The product is planned to be available only to non-US accredited investors in early September.&nbsp;<a href=\"https://blockworks.co/tag/nomura\" target=\"_blank\" rel=\"nofollow noopener\">Nomura</a>&nbsp;<a href=\"https://www.laserdigital.com/company-news/laser-digital-asset-management-launches-ethereum-adoption-fund-for-institutional-investors/\" target=\"_blank\" rel=\"nofollow noopener\">previously</a>&nbsp;launched an ETH-focused fund in late 2023.&nbsp;</p>\r\n<p>The firm wasn&rsquo;t immediately available to comment when reached.&nbsp;</p>\r\n<p>Interest in crypto by traditional finance investors has been slowly but steadily increasing. In a recent EY survey, 55% of 270+ institutional investors claimed they&nbsp;<a href=\"https://blockworks.co/news/empire-newsletter-tradfi-crypto-institutional-adoption\" target=\"_blank\" rel=\"nofollow noopener\">planned to allocate capital to crypto</a>&nbsp;over the next two to three years.</p>\r\n<p>Laser Digital&rsquo;s suite of crypto products already&nbsp;<a href=\"https://live-laser-digital.pantheonsite.io/services/asset-management/\" target=\"_blank\" rel=\"nofollow noopener\">includes</a>&nbsp;a&nbsp;<a href=\"https://blockworks.co/news/laser-digital-bitcoin-fund-asset-management-crypto\" target=\"_blank\" rel=\"nofollow noopener\">Bitcoin Adoption Fund</a>, Ethereum Adoption Fund and Polygon Adoption Fund &mdash; all institutional products for accredited investors to gain BTC/ETH/MATIC exposure.</p>');

-- --------------------------------------------------------

--
-- Table structure for table `blognews_tags`
--

CREATE TABLE `blognews_tags` (
  `blognews_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `blog_comments`
--

CREATE TABLE `blog_comments` (
  `id` int(11) NOT NULL,
  `blog_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `comment` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `blog_reading_time`
--

CREATE TABLE `blog_reading_time` (
  `id` int(11) NOT NULL,
  `blog_id` int(11) NOT NULL,
  `reading_time` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blog_reading_time`
--

INSERT INTO `blog_reading_time` (`id`, `blog_id`, `reading_time`) VALUES
(253, 26, 5813),
(266, 24, 196),
(271, 22, 17),
(284, 29, 1027);

-- --------------------------------------------------------

--
-- Table structure for table `blog_views`
--

CREATE TABLE `blog_views` (
  `id` int(11) NOT NULL,
  `blog_id` int(11) NOT NULL,
  `view_count` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blog_views`
--

INSERT INTO `blog_views` (`id`, `blog_id`, `view_count`) VALUES
(15, 27, 6),
(16, 29, 39),
(18, 26, 22),
(31, 28, 24),
(41, 24, 13),
(60, 23, 10),
(98, 22, 2);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `ID` int(11) NOT NULL,
  `uuid` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`ID`, `uuid`, `name`) VALUES
(3, '3c880af2-ad7f-41c8-99d5-71bc76a6bdc6', 'Crypto'),
(4, 'e9b2c96d-807a-44af-b77c-83557299f365', 'business'),
(5, 'c2aa167f-b0e7-4e51-bdd1-f104ce545843', 'opinion'),
(6, 'c70be7d7-ef48-4438-8221-fbc8b96d2542', 'defi'),
(7, 'b3ee533b-c4ee-4831-8708-da33c86cd16a', 'Education'),
(8, '043c29ac-57eb-4d05-b0f8-7f309036f158', 'Finance'),
(9, 'f2444dff-0f37-458e-9784-6bc18a6802e7', 'analysis'),
(10, 'f6bbe6e3-03ef-4039-8c62-493588d40e12', 'Web3'),
(11, 'e214ba62-d83d-4dc0-9636-4df7e3f3fd3e', 'people'),
(12, 'c6097cc1-f043-40d3-8696-796e7db0de0e', 'Sponsored');

-- --------------------------------------------------------

--
-- Table structure for table `episodes`
--

CREATE TABLE `episodes` (
  `ID` int(11) NOT NULL,
  `uuid` varchar(50) NOT NULL,
  `podcastID` int(11) NOT NULL,
  `dateAndTime` datetime DEFAULT NULL,
  `episodesInfo` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `audioFile` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `episodes`
--

INSERT INTO `episodes` (`ID`, `uuid`, `podcastID`, `dateAndTime`, `episodesInfo`, `title`, `audioFile`) VALUES
(2, 'cb8d8a1c-ee9b-4990-9690-07016059258c', 3, '2024-07-29 17:17:12', '<p>Get Start ...ffsafasf</p>', 'title is tle ', '929991ea-142e-44ec-89f6-283d01b407ff_1722251832218-5.mp3'),
(3, '3c744089-b989-422b-91b2-f99868dd6896', 1, '2024-07-30 23:07:20', '<p>In this episode, Lucas Bruder from Jito discusses their newly launched restaking platform for Solana. The conversation covers the history of Jito\'s products, the design choices behind their restaking solution, and how..</p>', 'New episode ', 'a2381e7c-6a95-41c4-8287-c455677400d6_1722359240068-2.mp3'),
(4, '27e78d4d-f02a-45f4-993a-b745fa581805', 1, '2024-08-02 11:02:18', '<p>In this episode, Lucas Bruder from Jito discusses their newly launched restaking platform for Solana. The conversation covers the history of Jito\'s products, the design choices behind their restaking solution, and how..</p>', 'How Jito is Unlocking Restaking for Solana | S8 Finale | Lucas Bruder', '484d45eb-da35-4834-8b91-74d0b65f4e75_1722574938792-6.mp3'),
(5, 'a003bb5e-1a4e-4fbe-ba5c-506a37c3e573', 1, '2024-08-04 21:41:29', '<p><strong>Get Start ...Another week another righteous debate within Bitcoin. Another week another righteous debate within Bitcoin. Another week another righteous debate within Bitcoin. Another week another righteous debate within Bitcoin. Another week an', 'Another week another righteous debate within Bitcoin. ', 'ad51d2af-cf68-41af-8e88-59787e206b21_1722786089251-7.mp3');

-- --------------------------------------------------------

--
-- Table structure for table `jobpost`
--

CREATE TABLE `jobpost` (
  `ID` int(11) NOT NULL,
  `uuid` varchar(50) NOT NULL,
  `jobTitle` varchar(255) NOT NULL,
  `jobPosition` varchar(255) NOT NULL,
  `jobTime` varchar(50) NOT NULL,
  `applyLink` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `jobpost`
--

INSERT INTO `jobpost` (`ID`, `uuid`, `jobTitle`, `jobPosition`, `jobTime`, `applyLink`) VALUES
(3, '5eb60790-9b65-4dd1-90af-a93d46e2eb62', 'font End web devloper ', 'web ', 'Full Time', 'https://api.tojoglobal.com/api/admin/jobpost'),
(4, '610ecaec-5554-49d0-902f-e7ad33691da2', 'Executive Officer & Developer', 'web dev', 'On-site', 'https://www.linkedin.com/company/tojo-global/jobs/');

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `article_id` int(11) NOT NULL,
  `user_id` varchar(250) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `article_id`, `user_id`, `created_at`) VALUES
(8, 29, '2s1GFGc5oaYgKgFsxSriK78qkwU2', '2025-03-18 11:08:56'),
(19, 26, 'kGhtmHBfvzYhTEGMiK6sTqzglcB3', '2025-03-19 11:09:16'),
(22, 29, 'kGhtmHBfvzYhTEGMiK6sTqzglcB3', '2025-03-22 15:11:44');

-- --------------------------------------------------------

--
-- Table structure for table `member_firm`
--

CREATE TABLE `member_firm` (
  `uuid` varchar(50) NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  `imageTitle` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `member_firm`
--

INSERT INTO `member_firm` (`uuid`, `img`, `imageTitle`) VALUES
('73bade6a-1306-4ed2-b23d-de12c27b2a92', 'b1e05ea6-aeac-48d8-afe6-113db6d82578_1722177007186-myw3schoolsimage.jpg', 'w3school');

-- --------------------------------------------------------

--
-- Table structure for table `newsletteremail`
--

CREATE TABLE `newsletteremail` (
  `ID` int(11) NOT NULL,
  `uuid` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `newsletteremail`
--

INSERT INTO `newsletteremail` (`ID`, `uuid`, `email`) VALUES
(2, '0f84589b-e06b-44f9-a53d-f57c21f6198b', 'swebcoderservice@gmail.com'),
(3, 'd0c59689-0411-4bb3-a5f5-fa9b33e36fb0', 'ahmed66882298@gmail.com'),
(4, '43233aa2-99d1-41b4-ac17-c4c6dc1185dd', 'ahmedshishirusa@gmail.com'),
(5, '17e99c04-ca1f-44ac-a429-7cb446a77bc7', 'swebcoderservice@gmail.com'),
(6, '61e2f00f-8f6a-480b-bc79-8e0a6803c9c4', 'superadmin@example.com'),
(7, '4b2457c1-2876-42ba-9b9e-ccf06a307997', 'ahmed66882298@gmail.com'),
(8, 'f9003636-eb61-4e72-bafa-2918c73bd021', 'ahmed66882298@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `newsletter_subscriptions`
--

CREATE TABLE `newsletter_subscriptions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `isSubscribed` tinyint(1) DEFAULT 1,
  `interests` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`interests`)),
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `podcasts`
--

CREATE TABLE `podcasts` (
  `ID` int(11) NOT NULL,
  `uuid` varchar(50) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `hostedInfo` varchar(255) DEFAULT NULL,
  `spotify` varchar(150) NOT NULL,
  `apple` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `podcasts`
--

INSERT INTO `podcasts` (`ID`, `uuid`, `image`, `name`, `hostedInfo`, `spotify`, `apple`) VALUES
(1, 'cb05d8e7-a107-484e-b510-7c4269531737', 'f73fae2f-a5e5-4182-9b9a-a0b85c5001e6_1722017435304-istockphoto-1346125184-612x612.jpg', 'Bitcoin Builders', 'Development, entrepreneurship and creation around Bitcoin, the Lightning Network and other freedom tech is exploding. This show digs into the Bitcoin ecosystem through the lens of the Cambrian explosion of creativity around it. This podcast is part of Blo', 'fdfsfsaf', 'fdsfsafsa'),
(3, '709905b7-4cc0-4381-b959-f0f260243b22', '83885409-a8cb-41bf-8bc9-973a2ba4da2b_1722238365780-Favicon.png', '0xResearch', 'Hosted by Boccaccio & Blockworks Analysts, 0xResearch is for savvy degens who want to think like a crypto analyst', 'fdfsa', 'fsfsaf'),
(4, '2b5febfb-6265-4041-baed-56c500492681', '595f5402-388c-4753-b8ba-103c263342ec_1722238393160-swapnilDu.jpg', 'swapnilahmed shishir', 'Hosted by Boccaccio & Blockworks Analysts, 0xResearch is for savvy degens who want to think like a crypto analyst', 'https://open.spotify.com/show/3uMWirMj2hc7IQYEUeBTyT', 'https://open.spotify.com/show/3uMWirMj2hc7IQYEUeBTyT');

-- --------------------------------------------------------

--
-- Table structure for table `sponsored_posts`
--

CREATE TABLE `sponsored_posts` (
  `id` int(11) NOT NULL,
  `title` varchar(300) NOT NULL,
  `description` text NOT NULL,
  `image_url` varchar(700) DEFAULT NULL,
  `sponsor_id` int(11) DEFAULT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `published_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sponsors`
--

CREATE TABLE `sponsors` (
  `id` int(11) NOT NULL,
  `name` varchar(300) NOT NULL,
  `logo_url` varchar(700) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subscribers`
--

CREATE TABLE `subscribers` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `interests` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subscribers`
--

INSERT INTO `subscribers` (`id`, `email`, `interests`, `created_at`) VALUES
(31, 'lb@gmail.com', 'Bitcoin, DeFi, Events, NFTs', '2025-03-25 13:29:17'),
(32, 'f@gmail.com', 'NFTs, Podcasts, Events', '2025-03-25 13:38:30');

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `ID` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `uuid` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`ID`, `name`, `uuid`) VALUES
(5, 'marketing123', '70e4f0e1-2781-47e6-9b83-361fdf635b5a'),
(7, 'defi', '5ddfac10-63a3-410e-9c1b-943dbfcac9d3'),
(8, 'marketing', '8f7c9983-e533-4d6c-a346-38fbef26cb95');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `uid` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `displayName` varchar(255) DEFAULT NULL,
  `photoURL` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `premiumTaken` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `uid`, `email`, `displayName`, `photoURL`, `createdAt`, `premiumTaken`) VALUES
(1, 'k9UA7zv39Kc2hmcio7kPfxqazsq1', 'sk@gmail.com', 'swapnil ahmed shishir', 'https://avatars.githubusercontent.com/u/83201513?v=4', '2025-03-06 06:06:10', NULL),
(2, 'kGhtmHBfvzYhTEGMiK6sTqzglcB3', 'swapnilahmedshishir2018@gmail.com', 'SWAPNIL AHMMED SHISHIR', 'https://lh3.googleusercontent.com/a/ACg8ocJn799E8ZSqWfJ1-uGQ5ROcMnsUQFay6SXq0Re5v7wdawJLUv6g=s96-c', '2025-03-06 06:48:49', NULL),
(3, 'sIehZBsHbYRINwKOQr3TlcatsTp2', 'ahmed66882298@gmail.com', 'swapnil shishir', 'https://lh3.googleusercontent.com/a/ACg8ocKuRHZhGTGgbkBnVvHAN4olQWjLkdQ4MMyZKM6TEXiJMQD6e1eV=s96-c', '2025-03-06 07:16:21', NULL),
(4, '2s1GFGc5oaYgKgFsxSriK78qkwU2', 'freeservise7@gmail.com', 'Fun Mix', 'https://lh3.googleusercontent.com/a/ACg8ocLklh6B3-PlzXQC138Dg50c5XD2OlpUlqIGBfNV1PLVxcD6Pis=s96-c', '2025-03-18 10:53:04', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `blognews`
--
ALTER TABLE `blognews`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `author1_id` (`author1_id`),
  ADD KEY `author2_id` (`author2_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `blognews_tags`
--
ALTER TABLE `blognews_tags`
  ADD PRIMARY KEY (`blognews_id`,`tag_id`),
  ADD KEY `tag_id` (`tag_id`);

--
-- Indexes for table `blog_comments`
--
ALTER TABLE `blog_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `blog_id` (`blog_id`);

--
-- Indexes for table `blog_reading_time`
--
ALTER TABLE `blog_reading_time`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `blog_id` (`blog_id`);

--
-- Indexes for table `blog_views`
--
ALTER TABLE `blog_views`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `blog_id` (`blog_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `episodes`
--
ALTER TABLE `episodes`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `podcastID` (`podcastID`);

--
-- Indexes for table `jobpost`
--
ALTER TABLE `jobpost`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_like` (`article_id`,`user_id`);

--
-- Indexes for table `member_firm`
--
ALTER TABLE `member_firm`
  ADD PRIMARY KEY (`uuid`);

--
-- Indexes for table `newsletteremail`
--
ALTER TABLE `newsletteremail`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `newsletter_subscriptions`
--
ALTER TABLE `newsletter_subscriptions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `podcasts`
--
ALTER TABLE `podcasts`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `sponsored_posts`
--
ALTER TABLE `sponsored_posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sponsor_id` (`sponsor_id`);

--
-- Indexes for table `sponsors`
--
ALTER TABLE `sponsors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscribers`
--
ALTER TABLE `subscribers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uid` (`uid`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `authors`
--
ALTER TABLE `authors`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `blognews`
--
ALTER TABLE `blognews`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `blog_comments`
--
ALTER TABLE `blog_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `blog_reading_time`
--
ALTER TABLE `blog_reading_time`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=312;

--
-- AUTO_INCREMENT for table `blog_views`
--
ALTER TABLE `blog_views`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=134;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `episodes`
--
ALTER TABLE `episodes`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `jobpost`
--
ALTER TABLE `jobpost`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `newsletteremail`
--
ALTER TABLE `newsletteremail`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `newsletter_subscriptions`
--
ALTER TABLE `newsletter_subscriptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `podcasts`
--
ALTER TABLE `podcasts`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `sponsored_posts`
--
ALTER TABLE `sponsored_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sponsors`
--
ALTER TABLE `sponsors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subscribers`
--
ALTER TABLE `subscribers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blognews`
--
ALTER TABLE `blognews`
  ADD CONSTRAINT `blognews_ibfk_1` FOREIGN KEY (`author1_id`) REFERENCES `authors` (`ID`),
  ADD CONSTRAINT `blognews_ibfk_2` FOREIGN KEY (`author2_id`) REFERENCES `authors` (`ID`),
  ADD CONSTRAINT `blognews_ibfk_3` FOREIGN KEY (`category_id`) REFERENCES `categories` (`ID`);

--
-- Constraints for table `blognews_tags`
--
ALTER TABLE `blognews_tags`
  ADD CONSTRAINT `blognews_tags_ibfk_1` FOREIGN KEY (`blognews_id`) REFERENCES `blognews` (`ID`),
  ADD CONSTRAINT `blognews_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`ID`);

--
-- Constraints for table `blog_comments`
--
ALTER TABLE `blog_comments`
  ADD CONSTRAINT `blog_comments_ibfk_1` FOREIGN KEY (`blog_id`) REFERENCES `blognews` (`ID`) ON DELETE CASCADE;

--
-- Constraints for table `blog_views`
--
ALTER TABLE `blog_views`
  ADD CONSTRAINT `blog_views_ibfk_1` FOREIGN KEY (`blog_id`) REFERENCES `blognews` (`ID`) ON DELETE CASCADE;

--
-- Constraints for table `episodes`
--
ALTER TABLE `episodes`
  ADD CONSTRAINT `episodes_ibfk_1` FOREIGN KEY (`podcastID`) REFERENCES `podcasts` (`ID`);

--
-- Constraints for table `newsletter_subscriptions`
--
ALTER TABLE `newsletter_subscriptions`
  ADD CONSTRAINT `newsletter_subscriptions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `sponsored_posts`
--
ALTER TABLE `sponsored_posts`
  ADD CONSTRAINT `sponsored_posts_ibfk_1` FOREIGN KEY (`sponsor_id`) REFERENCES `sponsors` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

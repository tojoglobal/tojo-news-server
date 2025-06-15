-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 15, 2025 at 07:07 AM
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
  `password` varchar(500) NOT NULL,
  `type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`ID`, `email`, `password`, `type`) VALUES
(1, 'admin@gmail.com', '$2b$10$1.ZQkM5H1IPohM3Zk05Kou5D8f2hZC/QI3lktD.lcplQmFLc1U6nu', 'admin');

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
(2, 'f12c441b-2931-4651-a151-14041b2cf2b9', 'swapnil ahmed shishir 22983'),
(3, 'e1e1df96-74c9-4fac-bd88-27948b60548b', 'swapnil ahmed shishir'),
(4, 'd0806f74-4d43-46f4-838c-6d5b375f71e0', 'shishir'),
(7, 'b75a7ebb-6888-4c71-9ab1-0690af4db6e2', 'swapnil sk');

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
  `subtitle` varchar(255) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `dateAndTime` datetime DEFAULT NULL,
  `thumble` varchar(255) DEFAULT NULL,
  `articalpost` mediumtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blognews`
--

INSERT INTO `blognews` (`ID`, `uuid`, `author1_id`, `author2_id`, `title`, `subtitle`, `category_id`, `dateAndTime`, `thumble`, `articalpost`) VALUES
(22, '0677dca3-88ce-4834-979e-4db4f890f5ca', 2, NULL, 'Does the ETH ETF ‘fee war’ even matter to investors?', 'Franklin Templeton has the lowest intended ETH fund fee so far, though a similar advantage did not help it win the race for bitcoin ETF assets', 3, '2024-07-28 20:37:01', '560fe69b-a312-43b5-a5ed-6a35e98c659e_1722177333496-template-1599667_1280.png', '<p>&ldquo;A BlackRock ether ETF would probably be much more popular than an ether ETF from an upstart ETF issuer, even if the BlackRock fund was five basis points more expensive,&rdquo; he told Blockworks.&nbsp;</p>\r\n<p>Roy acknowledged that a larger difference &mdash; such as 10 or 20 basis points &mdash; could prove to be a bigger deal to investors.&nbsp;</p>\r\n<p>Ultimately, he added, the spot bitcoin ETF saga offers &ldquo;a good template&rdquo; for how competition within the ether ETF category could shake out.</p>\r\n<p>&ldquo;BlackRock and Fidelity have huge advantages which they will exploit, but there is room for smaller issuers like&nbsp;<a href=\"https://blockworks.co/tag/bitwise\" target=\"_blank\" rel=\"nofollow noopener\">Bitwise</a>&nbsp;to gain a foothold in the space as well with low fees and unique angles,&rdquo; he said.</p>\r\n<p>The lowest US spot bitcoin ETF fee &mdash; excluding initial fee waivers &mdash; was Franklin Templeton&rsquo;s, at 0.19%. The firm&nbsp;<a href=\"https://blockworks.co/news/franklin-templeton-bitcoin-etf-fees\" target=\"_blank\" rel=\"nofollow noopener\">undercut Bitwise&rsquo;s 0.20% fee</a>&nbsp;a day after the funds launched.</p>\r\n<p>But Franklin Templeton&rsquo;s BTC fund has attracted just $345 million of net inflows after six months on the market. The Bitwise Bitcoin ETF (BITB) has brought in about $2.1 billion.</p>\r\n<p>Funds by BlackRock and Fidelity lead flows in the category, with $18 billion and $9.5 billion, respectively. Both charge a slightly higher 0.25%.</p>\r\n<p>The most expensive fund by far &mdash; the Grayscale Bitcoin Trust ETF (GBTC), at 1.5% &mdash; has endured $18.6 billion of net outflows.</p>\r\n<p>Industry watchers continue to watch what Grayscale might charge for&nbsp;<a href=\"https://blockworks.co/news/grayscale-takes-page-from-blackrock-playbook\" target=\"_blank\" rel=\"nofollow noopener\">the &ldquo;Mini&rdquo; versions</a>&nbsp;of GBTC and its&nbsp;<a href=\"https://blockworks.co/news/grayscale-eth-trust-ethe-filing-vaneck-proshares\" target=\"_blank\" rel=\"nofollow noopener\">Ethereum Trust</a>&nbsp;(ETHE).</p>\r\n<p>While some advisers have said they have moved money out of GBTC into cheaper BTC funds, others have considered custodians, spreads and liquidity when making decisions on which ETFs to allocate to. &nbsp;</p>\r\n<hr class=\"wp-block-separator has-alpha-channel-opacity\">\r\n<p><strong>Start your day with top cry</strong></p>'),
(23, '83fa41f6-b93f-4308-a502-2a6d3f510de3', 4, NULL, 'House fails to override veto of anti-SAB 121 bill ', 'Representatives on Thursday opted to back President Biden and uphold his veto of the legislation that sought to invalidate SAB 121', 10, '2024-07-28 20:35:07', 'c9a9dc01-6258-41ec-9eec-0e8a244c59d9_1722177307902-istockphoto-1346125184-612x612.jpg', '<p>House Financial Services Committee Chair Patrick McHenry, R-N.C., spoke in favor of overriding the veto Wednesday, arguing the bipartisan support the resolution received is proof Reps. should stand their ground.&nbsp;</p>\r\n<p>&ldquo;​​SAB 121 is one of the most glaring examples of the regulatory overreach that has defined Chair&nbsp;<a href=\"https://blockworks.co/tag/gary-gensler\" target=\"_blank\" rel=\"nofollow noopener\">Gary Gensler</a>&rsquo;s tenure at the [SEC],&rdquo; McHenry said. &ldquo;It limits consumers options to safely custody their digital assets, upending decades of bank custody practices and increasing concentration risk.&rdquo;&nbsp;</p>\r\n<p><strong>Read more from our opinion section:</strong>&nbsp;<a href=\"https://blockworks.co/news/senate-gensler-sec-overturn-sab-121\" target=\"_blank\" rel=\"nofollow noopener\">It&rsquo;s time to overturn SAB 121</a></p>\r\n<p>The House and Senate&nbsp;<a href=\"https://blockworks.co/news/senate-passes-resolution-to-overturn-sab121\" target=\"_blank\" rel=\"nofollow noopener\">passed Joint Resolution 109 in May</a>. The legislation, if passed, would have overturned SAB 121, the accounting guidance that states digital asset custodians should&nbsp;<a href=\"https://blockworks.co/news/sec-staff-call-for-crypto-entities-to-show-liability-on-balance-sheet\" target=\"_blank\" rel=\"nofollow noopener\">report a liability and &ldquo;corresponding assets&rdquo;</a>&nbsp;on their balance sheets for all custodied cryptocurrencies.&nbsp;</p>\r\n<p>Each chamber approved the resolution, which was brought under the Congressional Review Act, with bipartisan support. Thirty-three Democrats in total voted in favor of the legislation across both chambers.&nbsp;</p>\r\n<p>President Biden,&nbsp;<a href=\"https://www.whitehouse.gov/wp-content/uploads/2024/05/SAP-HJRes109.pdf\" target=\"_blank\" rel=\"nofollow noopener\">as expected</a>, vetoed the resolution shortly after it was passed. His administration stated that by invoking the Congressional Review Act, lawmakers could &ldquo;inappropriately constrain the&nbsp;<a href=\"https://blockworks.co/tag/sec\" target=\"_blank\" rel=\"nofollow noopener\">SEC</a>&rsquo;s ability to ensure appropriate guardrails.&rdquo;</p>\r\n<p>&ldquo;President Biden vetoed the first digital asset-specific legislation that ever passed the House and the Senate,&rdquo; McHenry said. &ldquo;It&rsquo;s never been clearer; this administration would rather play politics and side with power-hungry bureaucrats over the American people.&rdquo;</p>\r\n<hr class=\"wp-block-separator has-alpha-channel-opacity\">\r\n<p><strong>Start your day with top crypto insights from David Canellis and Katherine Ross.&nbsp;<a href=\"https://blockworks.co/newsletter/empire\" target=\"_blank\" rel=\"nofollow noopener\">Subscribe to the Empire newsletter</a>.</strong></p>\r\n<p><strong>Explore the growing intersection between crypto, macroeconomics, policy and finance with Ben Strack, Casey Wagner and Felix Jauvin.&nbsp;<a href=\"https://blockworks.co/newsletter/onthemargin\" target=\"_blank\" rel=\"nofollow noopener\">Subscribe to the On the Margin newsletter</a>.</strong></p>'),
(24, '6b3e4855-bd8d-4db4-9f63-6543b7d52a38', 2, NULL, 'Empire Newsletter: Is Coinbase stock a proxy bet on crypto’s success?', 'Plus, do we have an “Amazon of crypto”?', 8, '2024-07-27 19:24:24', '7a62a895-76f8-466c-9cad-91f39dd4d099_1722086664517-Screenshot (12).png', '<p>But what does success mean for crypto?</p>\r\n<p>Basing it on rising prices and record-high valuations feels right but markets don&rsquo;t really tell the whole story.&nbsp;</p>\r\n<p>Maybe success is more about how much data is kept in decentralized file storage protocols, or stablecoin adoption in places with rampant high inflation.&nbsp;</p>\r\n<p>Perhaps it&rsquo;s the total value locked in real-world asset projects, like BlackRock&rsquo;s tokenized money market fund on Ethereum. All those have little to do with whether bitcoin&rsquo;s price goes up or down.</p>\r\n<p>Yep, crypto consuming traditional finance and bringing blockchain rails to the masses sounds like success to me.&nbsp;</p>\r\n<p>For Coinbase, figuring out ways to offer shareholders exposure to that goal seems like the move. But since its direct listing in April 2021 &mdash; practically peak bull market &mdash; the stock has been closely tied to bitcoin&rsquo;s price, as is the case with the rest of the crypto market.</p>\r\n<figure class=\"wp-block-image\"><span class=\"block\"><span class=\"hover:cursor-pointer align-center block\"><img src=\"https://lh7-us.googleusercontent.com/docsz/AD_4nXeKrl68okmmxUD-zanUyplZuDKHIOpf1Lz9n_EiajYdUyXXNWsLkJ7m6X_GK9knFNxGsn7zto3L2mIkZApNplgyPZxNZXksgQrcIJz2_amh8jUelY-T1NeMucRQDLACwwqjKGrixD9tRIEWoZqadSPgcbqd?key=NpibROXxzPGADSHu9JOh8w\" alt=\"\"></span></span></figure>'),
(26, '2c1973b0-05fe-4611-9abd-391841c8189c', 4, NULL, 'On the Margin Newsletter: Biden’s SEC nominee appears safe', 'Plus, publicly traded crypto companies had a pretty eventful news week', 8, '2024-07-27 19:23:16', 'b5c20b30-f962-4ef0-be6a-130180941761_1722086596354-450972718_7993235647400889_4215672046595020564_n.jpg', '<h2 id=\"senate-seems-poised-to-push-biden-nominations-through\" class=\"wp-block-heading\">Senate seems poised to push Biden nominations through&nbsp;</h2>\r\n<p>Fortunately for the nominees, yesterday&rsquo;s Senate Banking Committee confirmation hearings were largely uneventful.&nbsp;</p>\r\n<p>SEC Commissioner Caroline Crenshaw, up for another term at the securities regulator, flew mostly under the radar. Committee members posed more questions to Christy Goldsmith Romero, President Biden&rsquo;s pick to chair the Federal Deposit Insurance Corporation.&nbsp;</p>\r\n<p>Kristin Johnson, put up to be an Assistant Secretary of the Treasury, and Gordon Ito, nominated to be a member of the Financial Stability Oversight Council, also faced questions Thursday.&nbsp;</p>\r\n<p>Goldsmith Romero stands to take over the FDIC as the agency faces controversy. A May&nbsp;<a href=\"https://www.fdic.gov/news/press-releases/fdic-special-review-committee-releases-independent-report-workplace-misconduct\" target=\"_blank\" rel=\"nofollow noopener\">report</a>&nbsp;uncovered allegations of sexual harassment and discrimination at the FDIC, raising questions about whether Chair Martin Gruenberg should continue in the role.&nbsp;</p>\r\n<p>The nominee told Senators Thursday she plans for a &ldquo;complete overhaul&rdquo; of the agency should she be approved, including firing employees who have harassed or abused others and implementing a new system for registering complaints.&nbsp;</p>'),
(27, 'e6df5b43-c7cd-480d-9827-c78544e05e73', 4, 2, 'Bitcoin ETF segment sees record-tying fifth straight day of outflows', 'BlackRock’s iShares Bitcoin Trust continues to see daily positive net flows, though its inflow total for a single day hit a new low Wednesday', 4, '2024-07-27 19:22:44', '69b220d0-f284-45c4-ab10-d7849ab5fc5d_1722086564334-istockphoto-1346125184-612x612.jpg', '<p>The five-day net outflow total beginning on April 12 amounts to $319 million, reflecting an average of $64 million over the span. That peaked on Wednesday, when $165 million left the 11-fund sector.&nbsp;&nbsp;&nbsp;</p>\r\n<p>Such an outflow streak has happened just once before, with US spot bitcoin ETFs bleeding assets each day from March 18 to March 22. Those outflows were heavier than the latest active streak, totaling $888 million.</p>\r\n<p>The main culprit driving the net outflows is the Grayscale Bitcoin Trust (GBTC). The higher-priced fund, which converted to an ETF in January, has averaged $116 million of net outflows per day over the last five trading days.</p>\r\n<p>Aside from GBTC, only the Ark 21Shares Bitcoin ETF (ARKB) has contributed any meaningful net outflows, seeing $43 million exit the fund on Wednesday. Others meanwhile have watched their inflows completely stop.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>\r\n<p>Unique to its competitors, the flow-gathering leader in the space, BlackRock, has kept its daily flows positive.&nbsp;</p>\r\n<p>Nine US spot bitcoin ETFs saw zero inflows on both April 12 and April 15, according to Farside Investors&nbsp;<a href=\"https://farside.co.uk/?p=997\" target=\"_blank\" rel=\"nofollow noopener\">data</a>. IBIT&rsquo;s net inflows were $111 million and $73 million on those days, respectively.&nbsp;&nbsp;</p>\r\n<p><strong>Read more:&nbsp;</strong><a href=\"https://blockworks.co/news/blackrock-extends-bitcoin-etf-inflows\" target=\"_blank\" rel=\"nofollow noopener\">BlackRock</a></p>'),
(28, '10a16b2f-2a34-4d64-b549-0008613dc6b2', 2, NULL, 'উচ্চশিক্ষা প্রতিষ্ঠান খুলে দিতে শিক্ষামন্ত্রীর বার্তা', 'দেশব্যাপী কোটা বিরোধী আন্দোলনকে ঘিরে সৃষ্ট সহিংসতার কারণে অনির্দিষ্টকালের জন্য বন্ধ রয়েছে দেশের সব সরকারি বেসরকারি বিশ্ববিদ্যালয়। এসব শিক্ষাপ্রতিষ্ঠান খোলার আগে ছাত্র সংগঠনগুলোর সঙ্গে আলোচনা করার উদ্যোগ নিয়েছে শিক্ষা মন্ত্রণালয়।', 7, '2025-06-13 15:07:04', '7fe28025-81b2-4793-8400-a8ca65832bca_1722086551055-1722010678-de2f058dbebea4ad50d6ca5bc2d35b9d.jpg', '<p>দেশব্যাপী কোটা বিরোধী আন্দোলনকে ঘিরে সৃষ্ট সহিংসতার কারণে অনির্দিষ্টকালের জন্য বন্ধ রয়েছে দেশের সব সরকারি বেসরকারি বিশ্ববিদ্যালয়। এসব শিক্ষাপ্রতিষ্ঠান খোলার আগে ছাত্র সংগঠনগুলোর সঙ্গে আলোচনা করার উদ্যোগ নিয়েছে শিক্ষা মন্ত্রণালয়।</p>\r\n<p>বিশ্ববিদ্যালয় খোলার কর্মপন্থা নিয়ে শুক্রবার (২৬ জুলাই) বিকেলে শিক্ষা মন্ত্রণালয়ের জনসংযোগ কর্মকর্তা এম এ খায়েরের পাঠানো শিক্ষামন্ত্রী মহিবুল হাসান চৌধুরীর এক বার্তায় এ তথ্য জানানো হয়।</p>\r\n<p>এতে বলা হয়েছে, উচ্চশিক্ষা প্রতিষ্ঠানগুলোতে নিরাপত্তা ও সৌহার্দপূর্ণ পরিবেশ নিশ্চিত করে পাঠদান শুরু করার জন্য ছাত্র সংগঠনগুলোর নেতাদের সঙ্গে আলোচনা করার জন্য প্রতিষ্ঠান প্রধানদের প্রতি অনুরোধ জানিয়েছে শিক্ষা মন্ত্রণালয়।</p>\r\n<p>উল্লেখ্য, গত ১৬ জুলাই রাতে কোটা বিরোধী আন্দোলনে সহিংসতা বাড়ার আশঙ্কায় দেশের সব সরকারি ও বেসরকারি বিশ্ববিদ্যালয়গুলোর উপাচার্যদের &nbsp;অনির্দিষ্টকালের জন্য বিশ্ববিদ্যালয় বন্ধ ঘোষণার নির্দেশনা দেয় বিশ্ববিদ্যালয় মঞ্জুরী কমিশন (ইউজিসি)। একইসঙ্গে শিক্ষার্থীদের আবাসিক হল ত্যাগের নির্দেশনা দেওয়া হয়। এর পরদিন থেকে বিশ্ববিদ্যালয়গুলো সিন্ডিকেট সভা আহ্বান করে ইউজিসির সিদ্ধান্ত বাস্তবায়ন করে।</p>'),
(29, '3aa75789-4c0b-42e4-8476-86965697cad8', 3, 3, 'Nomura’s crypto unit to offer yield-bearing ETH fund: Report', 'Accredited investors will soon be able to tap into a yield-bearing ETH fund', 4, '2024-07-27 19:22:11', '5e46d72f-39b0-4348-9fea-2c7bc949e9ba_1722086531832-template-1599667_1280.png', '<p>Swiss-based Laser Digital, the digital asset subsidiary of Japanese investment bank Nomura, is reportedly planning to introduce an alternative to spot ETH ETFs.</p>\r\n<p>Unlike the nine ether ETFs launched three days ago, Laser Digital&rsquo;s ETH fund would generate yield and accrue rewards from the underlying Ethereum blockchain network, according to&nbsp;<a href=\"https://news.bloomberglaw.com/business-and-practice/nomura-crypto-unit-to-offer-high-yielding-ether-etf-alternative\" target=\"_blank\" rel=\"nofollow noopener\">Bloomberg</a>.</p>\r\n<p>These rewards are made up of the same token emissions and maximal extractable value (MEV) that is accrued by Ethereum validators running their own node, or users staking ETH with a liquid staking platform like Lido. It&rsquo;s a notably absent element with the current ETH ETFs.</p>\r\n<p><strong>Read more:</strong>&nbsp;<a href=\"https://blockworks.co/news/proposed-ether-etfs-not-staking-eth\" target=\"_blank\" rel=\"nofollow noopener\">Proposed ether ETFs would not stake their ETH, new filings clarify</a></p>\r\n<p>According to&nbsp;<a href=\"https://www.bloomberg.com/news/articles/2024-07-26/nomura-s-crypto-unit-to-offer-higher-yielding-ether-etf-alternative?sref=dkjk6XjG\" target=\"_blank\" rel=\"nofollow noopener\">Bloomberg</a>, Galaxy Digital will potentially assist&nbsp;<a href=\"https://blockworks.co/tag/laser-digital\" target=\"_blank\" rel=\"nofollow noopener\">Laser Digital</a>&nbsp;in running the validator nodes that generate the yield for investors.</p>\r\n<p>The product is planned to be available only to non-US accredited investors in early September.&nbsp;<a href=\"https://blockworks.co/tag/nomura\" target=\"_blank\" rel=\"nofollow noopener\">Nomura</a>&nbsp;<a href=\"https://www.laserdigital.com/company-news/laser-digital-asset-management-launches-ethereum-adoption-fund-for-institutional-investors/\" target=\"_blank\" rel=\"nofollow noopener\">previously</a>&nbsp;launched an ETH-focused fund in late 2023.&nbsp;</p>\r\n<p>The firm wasn&rsquo;t immediately available to comment when reached.&nbsp;</p>\r\n<p>Interest in crypto by traditional finance investors has been slowly but steadily increasing. In a recent EY survey, 55% of 270+ institutional investors claimed they&nbsp;<a href=\"https://blockworks.co/news/empire-newsletter-tradfi-crypto-institutional-adoption\" target=\"_blank\" rel=\"nofollow noopener\">planned to allocate capital to crypto</a>&nbsp;over the next two to three years.</p>\r\n<p>Laser Digital&rsquo;s suite of crypto products already&nbsp;<a href=\"https://live-laser-digital.pantheonsite.io/services/asset-management/\" target=\"_blank\" rel=\"nofollow noopener\">includes</a>&nbsp;a&nbsp;<a href=\"https://blockworks.co/news/laser-digital-bitcoin-fund-asset-management-crypto\" target=\"_blank\" rel=\"nofollow noopener\">Bitcoin Adoption Fund</a>, Ethereum Adoption Fund and Polygon Adoption Fund &mdash; all institutional products for accredited investors to gain BTC/ETH/MATIC exposure.</p>'),
(30, '087a0b5c-025a-4b86-a824-d48f8fe57bef', 2, 3, 'Crypto Influencer Marketing for Complete Guide to 2026', 'Crypto influencer marketing is one of the smartest ways to grow your crypto business in 2025. It helps you reach more people, build trust, and boost engagement. Influencers can connect you directly with loyal followers who care about crypto. This creates ', 9, '2025-06-13 15:02:55', '5378bd2c-7924-45f1-87a4-98f046b727b7_1744290669507-5536d7d4-525a-4947-a52d-23ddd9cedde9_1738416383031.png', '<div class=\"postSummary\">\r\n<p dir=\"ltr\">Crypto influencer marketing is one of the smartest ways to grow your crypto business in 2025. It helps you reach more people, build trust, and boost engagement. Influencers can connect you directly with loyal followers who care about crypto. This creates powerful opportunities to promote your brand and services.</p>\r\n<p dir=\"ltr\">In 2025, 70% of crypto brands are expected to increase spending on influencer marketing. Studies show that 89% of businesses see better ROI with influencer campaigns compared to traditional ads. The global influencer marketing industry is estimated to reach $21.1 billion, with crypto taking a big slice of that pie.</p>\r\n<p dir=\"ltr\">Working with influencers builds real connections. Audiences trust their recommendations, making it 50% more effective at driving purchases. Plus, 84% of consumers prefer authentic content, which influencers are great at delivering.By using this approach, you stay ahead in a crowded crypto market and create meaningful relationships with your audience.</p>\r\n<h2 dir=\"ltr\"><strong>What is Crypto Influencer Marketing?</strong></h2>\r\n<p dir=\"ltr\">Crypto influencer marketing is about partnering with popular people in the crypto world to promote your brand or project. These influencers already have a loyal audience who trust their advice on topics like blockchain, cryptocurrency, and Web3 technologies.</p>\r\n<p dir=\"ltr\">Why are influencers so powerful in the crypto industry? It&rsquo;s because they simplify complicated ideas, making it easier for people to understand. In a market where trust is everything, influencers act as a bridge between your project and potential investors or users.</p>\r\n<p dir=\"ltr\">Influencers also drive community engagement, which is vital for crypto success. Did you know that 80% of crypto investors follow influencers before making decisions? Their recommendations spark curiosity and encourage discussions among followers. This is especially important in a space where word-of-mouth spreads faster than traditional ads.</p>\r\n<p dir=\"ltr\">For example, if an influencer talks about your crypto project, they&rsquo;re not just promoting it&mdash;they&rsquo;re starting a conversation. This buzz can quickly grow, helping you reach thousands, or even millions, of potential users.</p>\r\n<p dir=\"ltr\">By using crypto influencer marketing, you&rsquo;re not just marketing; you&rsquo;re building relationships, trust, and a loyal audience. It&rsquo;s a proven way to stand out in the competitive crypto market.</p>\r\n<h2 dir=\"ltr\">Why Choose Influencer Marketing for Crypto?</h2>\r\n<p dir=\"ltr\">Crypto influencer marketing is one of the smartest ways to grow your brand in 2025. Why? Because it combines trust, reach, and engagement like no other strategy.</p>\r\n<p dir=\"ltr\">Statistics back this up: Over 70% of crypto users say they trust influencers more than traditional ads. And campaigns with influencers deliver 11x higher ROI than other forms of digital marketing.</p>\r\n<p dir=\"ltr\">Influencers help you reach niche audiences who are already interested in crypto. For example, micro-influencers with smaller but dedicated followers can create stronger connections. Their posts often have an engagement rate of 7%, compared to 1%-2% for big influencers.</p>\r\n<p dir=\"ltr\">In 2025, the crypto industry is expected to grow by over 30%, with more startups and projects entering the space. To stay relevant, you need a strategy that builds trust quickly and gets people talking about your brand. Influencers can do just that.</p>\r\n<p dir=\"ltr\">Imagine launching a new token. By working with influencers, you can generate hype, attract investors, and create an active community around your project. Plus, using AI tools, you can measure the success of these campaigns in real-time, ensuring better results.</p>\r\n<h2 dir=\"ltr\">Types of Crypto Influencers</h2>\r\n<p dir=\"ltr\">When you\'re diving into crypto influencer marketing, it\'s important to know which type of influencer will work best for your goals. Here\'s a breakdown of the three main types of crypto influencers:</p>\r\n<h3 dir=\"ltr\">1. Macro-Influencers</h3>\r\n<ul>\r\n<li dir=\"ltr\" aria-level=\"1\">\r\n<p dir=\"ltr\" role=\"presentation\">Large following: These influencers have hundreds of thousands or even millions of followers. If you\'re looking to get mass exposure, they can help you reach a wide audience quickly.</p>\r\n</li>\r\n<li dir=\"ltr\" aria-level=\"1\">\r\n<p dir=\"ltr\" role=\"presentation\">Wide reach: With a broad audience, macro-influencers can get your message in front of people from all over the world. This is especially useful if you\'re aiming for global brand recognition.</p>\r\n</li>\r\n<li dir=\"ltr\" aria-level=\"1\">\r\n<p dir=\"ltr\" role=\"presentation\">Less personalized: Although they have a big reach, the engagement can feel less personal. Their followers may not feel as close to them compared to smaller influencers. This could make it harder to build deeper connections with your audience.</p>\r\n</li>\r\n</ul>\r\n<p dir=\"ltr\">According to a report, 67% of marketers say that macro-influencers are ideal for brand awareness campaigns.</p>\r\n<h3 dir=\"ltr\">2. Micro-Influencers</h3>\r\n<ul>\r\n<li dir=\"ltr\" aria-level=\"1\">\r\n<p dir=\"ltr\" role=\"presentation\">Niche-focused: Micro-influencers typically have a smaller following, but their audience is highly targeted. They often focus on a specific niche, such as crypto trading, blockchain technology, or NFTs.</p>\r\n</li>\r\n<li dir=\"ltr\" aria-level=\"1\">\r\n<p dir=\"ltr\" role=\"presentation\">Better engagement: Because of their niche focus, micro-influencers have higher engagement rates. Their followers trust their opinions more, making them effective in driving interactions and conversions.</p>\r\n</li>\r\n<li dir=\"ltr\" aria-level=\"1\">\r\n<p dir=\"ltr\" role=\"presentation\">Effective targeting: You can tailor your campaigns specifically to crypto enthusiasts, helping you reach the right people for your product or service.</p>\r\n</li>\r\n</ul>\r\n<p dir=\"ltr\">Research shows that micro-influencers generate 60% higher engagement rates than macro-influencers. This makes them a powerful choice for businesses looking to connect with a targeted group.</p>\r\n<h3 dir=\"ltr\">3. Nano-Influencers</h3>\r\n<ul>\r\n<li dir=\"ltr\" aria-level=\"1\">\r\n<p dir=\"ltr\" role=\"presentation\">Hyper-specific communities: Nano-influencers have the smallest followings, usually around 1,000 to 10,000 followers. Their audience is very niche, and they often have very close relationships with their followers.</p>\r\n</li>\r\n<li dir=\"ltr\" aria-level=\"1\">\r\n<p dir=\"ltr\" role=\"presentation\">Loyal followers: The great thing about nano-influencers is that their followers tend to be loyal and highly engaged. They trust the influencer&rsquo;s recommendations, which can lead to higher conversion rates.</p>\r\n</li>\r\n<li dir=\"ltr\" aria-level=\"1\">\r\n<p dir=\"ltr\" role=\"presentation\">Cost-effective: Because they have fewer followers, nano-influencers are generally more affordable. This is great for startups or brands with a smaller budget.</p>\r\n</li>\r\n</ul>\r\n<p dir=\"ltr\">Nano-influencers have an engagement rate of 8%, which is significantly higher than both macro and micro-influencers.</p>\r\n<h2 dir=\"ltr\">Steps to Build a Winning Influencer Campaign</h2>\r\n<h3 dir=\"ltr\">Set Clear Goals</h3>\r\n<p dir=\"ltr\">Before starting your campaign, the first and most important step is to set clear goals. Without defined objectives, your efforts can easily go off track. Are you aiming to increase brand awareness, boost engagement rates, or drive conversions? Each goal requires a different approach. For instance, campaigns focused on awareness might prioritize reach and impressions, while conversion-driven campaigns should focus on actions like sign-ups or sales.</p>\r\n<p dir=\"ltr\">Recent studies show that campaigns with clearly defined goals are 376% more likely to succeed. This means taking the time to understand what your crypto project needs most can significantly improve your chances of success. When your goals are clear, it becomes easier to measure results and adjust your strategy.</p>\r\n<h3 dir=\"ltr\">Choose the Right Influencers</h3>\r\n<p dir=\"ltr\">Finding the right influencer is critical for a successful campaign. Not all influencers are the same, and picking someone just because they have a huge following can be a mistake. Instead, look for influencers who align with your brand&rsquo;s niche and audience. For example, if your crypto project targets DeFi enthusiasts, choose influencers who are active in that space and have a proven connection with their followers.</p>\r\n<p dir=\"ltr\">A recent report revealed that micro-influencers (those with 10K to 50K followers) tend to have 60% higher engagement rates compared to larger influencers. They also tend to have stronger trust and loyalty within their communities. By focusing on quality over quantity, you can achieve better engagement and more meaningful connections with potential customers.</p>\r\n<h3 dir=\"ltr\">Collaborate on Authentic Content</h3>\r\n<p dir=\"ltr\">Audiences today are highly aware of promotional content and can easily spot inauthentic campaigns. This is why creating authentic, relatable content with influencers is so important. Instead of pushing overt ads, let influencers share their genuine experiences with your crypto product or service. Authenticity builds trust, which is crucial in the crypto industry, where scams and misinformation are common concerns.</p>\r\n<p dir=\"ltr\">Statistics show that campaigns with authentic content achieve 22% higher engagement rates than those with overly branded promotions. For example, an influencer might share a story about how your platform helped them manage their investments better, making their audience feel more connected to your brand.</p>\r\n<h3 dir=\"ltr\">Measure Success</h3>\r\n<p dir=\"ltr\">To know if your campaign is effective, you need to measure its performance. Use tools like Google Analytics, social media insights, or specialized platforms to track metrics such as reach, engagement, and return on investment (ROI). These numbers provide a clear picture of what&rsquo;s working and what needs improvement.</p>\r\n<p dir=\"ltr\">Brands that monitor campaign performance in real time report achieving 43% better ROI compared to those that don&rsquo;t track results. Make sure to regularly analyze your data and tweak your strategy based on what you learn. This way, you can maximize your efforts and achieve better outcomes.</p>\r\n<h2 dir=\"ltr\">Challenges in Crypto Influencer Marketing</h2>\r\n<h3 dir=\"ltr\">Regulatory Concerns</h3>\r\n<p dir=\"ltr\">One of the biggest challenges in crypto influencer marketing is navigating the complex regulatory landscape. Crypto promotions are often under scrutiny, and failing to comply with local advertising laws can lead to penalties. It&rsquo;s essential to ensure that all influencers disclose paid partnerships and adhere to advertising standards.</p>\r\n<h3 dir=\"ltr\">Fake Followers</h3>\r\n<p dir=\"ltr\">Another major issue is the presence of fake followers. Some influencers artificially inflate their follower counts using bots, which can reduce the effectiveness of your campaign. Collaborating with such influencers means you&rsquo;re paying for reach that doesn&rsquo;t exist, wasting valuable resources.</p>\r\n<h3 dir=\"ltr\">Oversaturation</h3>\r\n<p dir=\"ltr\">The crypto space has become extremely competitive, with more brands entering the market daily. This oversaturation makes it harder for campaigns to stand out. In 2023, over 68% of marketers reported that their biggest challenge was cutting through the noise in the influencer marketing space.</p>\r\n<h3 dir=\"ltr\">Tips to Overcome Challenges</h3>\r\n<p dir=\"ltr\">To tackle these issues, use platforms like HypeAuditor to verify influencer authenticity and spot fake followers. Focus on influencers with smaller but highly engaged communities. These individuals often have a greater impact on their audience than those with inflated numbers. Additionally, get creative with your campaigns-try interactive content, giveaways, or exclusive sneak peeks to capture attention and stand out.</p>\r\n<h2 dir=\"ltr\">Final thoughts</h2>\r\n<p dir=\"ltr\">Crypto influencer marketing is a game-changer for startups looking to thrive in the competitive crypto landscape. From building trust with targeted audiences to driving meaningful engagement, the benefits are unmatched. It&rsquo;s not just about promotions-it&rsquo;s about creating connections and fostering a loyal community around your brand.</p>\r\n<p dir=\"ltr\">As we step into 2025, staying ahead of the curve means leveraging innovative strategies and expert partnerships. That&rsquo;s where&nbsp;<a href=\"https://www.tojoglobal.com/\">Tojo Global</a>&nbsp;comes in. Whether you&rsquo;re new to influencer marketing or ready to take your campaigns to the next level, our team of experts will craft customized solutions that help your startup stand out and thrive.</p>\r\n</div>');

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
(266, 24, 289),
(271, 22, 17),
(284, 29, 1027),
(313, 28, 776),
(335, 30, 1020);

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
(15, 27, 7),
(16, 29, 40),
(18, 26, 22),
(31, 28, 42),
(41, 24, 16),
(60, 23, 13),
(98, 22, 4),
(142, 30, 53);

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
-- Table structure for table `documentaries_featured`
--

CREATE TABLE `documentaries_featured` (
  `id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `show_in` set('featured','continue') NOT NULL DEFAULT 'featured'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `documentaries_featured`
--

INSERT INTO `documentaries_featured` (`id`, `image`, `link`, `created_at`, `show_in`) VALUES
(1, '1749888007284-images.jpeg', 'https://tojonews.netlify.app', '2025-06-14 08:00:07', 'featured,continue'),
(3, '1749889141645-JMqcf5wY.png', 'https://tojonews.netlify.app/documentaries', '2025-06-14 08:19:01', 'featured');

-- --------------------------------------------------------

--
-- Table structure for table `documentaries_hero`
--

CREATE TABLE `documentaries_hero` (
  `id` int(11) NOT NULL,
  `logo` varchar(255) NOT NULL,
  `heading` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `documentaries_hero`
--

INSERT INTO `documentaries_hero` (`id`, `logo`, `heading`, `description`, `created_at`) VALUES
(1, '1749886401464-Documentaries.ac0018fd.jpg', 'TOP 5 Crypto Conference in 2025', 'The world of cryptocurrency and blockchain has transformed the way we think about money, technology, and innovation.', '2025-06-14 07:25:35');

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
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `uuid` varchar(64) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `location` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `uuid`, `title`, `description`, `location`, `date`, `image_url`, `created_at`, `updated_at`) VALUES
(1, '66521546-6cc4-47e1-93bb-0499b40a10f9', 'to', 'ffd', 'Tangail, Dhaka', '2025-06-26', 'd0d6094f-6430-4dd2-9f44-c74d3308157b_1749834918985-leica-survey-accessories.jpg', '2025-06-13 17:15:18', '2025-06-13 17:15:18'),
(2, '939af76c-444e-4e5c-b2c0-65d994cb0d1e', 'Digital Assets Sumit 2025', 'Welcome to ts-geosystemss.com.bd The terms “We”, “Us”, “Our”, “TS Geosystems” are used to refer to only TS Geosystems Bangladesh. By using this website (the “Site”), you hereby accept these terms and conditions (including the linked information herein) and represent that you agree to comply with these terms and conditions (the \"User Agreement\"). This User Agreement is deemed effective upon your use of the Site which signifies your acceptance of these terms. If you do not agree to be bound by this User Agreement please do not access, register with or or use this Site.\r\n\r\nThis Site is owned and operated by TS Geosystems Bangladesh, a company (Registration Number: C-XX XX XX And BIN: XX XX XX-XX. User Eligibility: You must be at least 18 years old and capable of entering into a legally binding agreement to use our website. By using our website, you represent and warrant that you meet these eligibility requirements. Account Information: You may be required to create an account to access certain features of our website. You must provide accurate and complete information during the registration process. You are responsible\r\n\r\nfor maintaining the confidentiality of your account information and for all activities that occur under your account and. By agreeing to these terms and conditions you are vouching for the accuracy of all the information that is given at the time of registration and giving us the permission to use all the information provided in your account to use for our internal or external use including giving it to a third party for marketing and research purposes. TS Geosystems won’t be responsible for any kind of incident that will happen\r\n\r\ndue to the use of information that is provided by you. Product Information: We strive to provide accurate and up-to-date information about our products, including descriptions, prices, and availability. However, we do not warrant that all information is error-free, complete, or current. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update information at any time without prior notice. Product Purchases: All purchases made through our website are subject to our terms of sale. By placing an order, you agree to provide valid payment\r\n\r\ninformation and authorise us to charge the designated amount for the purchase. Pricing, Discounts and Special Offers Product Price May Change Any Time Depending on International Supply, Demand & Currency. The customer should be liable for paying the price on which the order was placed. Any discounted price on the website refers to a Discounted price only applicable for the orders purchased from the Website. This Discounted price has no relation with Sumash Tech’s physical outlet price. For any kind of campaigns or offers, the campaign or offer shall be\r\n\r\nvalid till the stock lasts and TS Geosystems reserves all the rights to change any campaign or offer rules or end a campaign during the campaign or offer. Cancellation of Orders TS Geosystems reserves all rights to cancel any order of the customer due to unavailability, inappropriate product information or Quality control issue of the product. The user or the customer needs to call our customer support number 02-55168061 to cancel any order before it is shipped. If the order is already shipped, the order can not be cancelled. If\r\n\r\nany order is cancelled, the customer will get a refund according to our refund and return policy. Return and Refund: For any kind of Return or Refund, our Return and Refund Policy will be followed. EMI Policy To avail EMI service while purchasing products from the website, you must follow and maintain the payment as per the rules of our EMI Policy. If the EMI Policy is not properly followed, Sumash Tech will not be liable for payment to be converted into an EMI. Resell and Exploitation of Service You\r\n\r\nagree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service on the website through which the service is provided, without express written permission by us. Third-Party Links: Our website may contain links to third-party websites or services that are not owned or controlled by us. We are not responsible for the content, privacy policies, or practices of any third-party websites. Accessing these links is at your own risk. Limitation of Liability: To the maximum extent permitted\r\n\r\nby law, we shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of or in connection with your use or inability to use our website, even if we have been advised of the possibility of such damages. Indemnification: You agree to indemnify, defend, and hold harmless our company and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, costs, or expenses arising out of your use of our website or any violation of these terms and conditions. Intellectual Property:\r\n\r\nAll content on our website, including text, graphics, logos, images, and software, is protected by intellectual property laws and is the property of our company or its licensors. You may not use, reproduce, modify, distribute, or display any part of our website without our prior written consent. Modifications to Terms: We reserve the right to modify or update these terms and conditions at any time without prior notice. Your continued use of our website after any changes constitutes acceptance of the modified terms. Governing Law: These terms and conditions shall\r\n\r\nbe governed by and construed in accordance with the laws of Bangladesh. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of a competent Court in Bangladesh.', 'Ghatail', '2025-07-01', '59ff900e-f598-4af4-aa40-031ba60e58a0_1749835854540-Computer_gaming_room_lit_up_purple.jpg', '2025-06-13 17:30:54', '2025-06-13 17:43:10'),
(3, '4b851a74-3a19-4f5f-a8bd-ec34822f975f', 'New Event coming soon', 'dsad', 'adsas', '2025-06-17', 'b7c93e4f-ae82-40fb-9f35-f1be5203a7de_1749835870738-Website-Home-Page-3-1536x803.jpg', '2025-06-13 17:31:10', '2025-06-14 05:20:41'),
(4, 'f773121d-bc9d-44a8-adfa-59f7d0ae941e', 'dsadas', 'dasd', 'asd', '2025-06-27', 'cc4da861-667b-4031-abcc-e709d92afe74_1749835884011-service-grid-1746355526918.jpg', '2025-06-13 17:31:24', '2025-06-13 17:31:24'),
(5, '2707edcc-9e65-482d-b6da-11db0371fb0c', 'Tangail, Dhaka Concert 2026', 'asdas', 'Tangail, Dhaka', '2025-06-21', '0d62bdcd-feda-416c-9fec-112cad497089_1749835902898-service-banner-1746355526919.jpg', '2025-06-13 17:31:42', '2025-06-14 13:15:33');

-- --------------------------------------------------------

--
-- Table structure for table `featured_news`
--

CREATE TABLE `featured_news` (
  `id` int(11) NOT NULL,
  `image` varchar(500) NOT NULL,
  `title` varchar(255) NOT NULL,
  `link` varchar(500) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `featured_news`
--

INSERT INTO `featured_news` (`id`, `image`, `title`, `link`, `created_at`) VALUES
(1, '1749908312073-images.jpeg', 'UK Treasury\'s Cryptocurrency Holdings', 'http://localhost:3000/documentaries', '2025-06-14 13:38:32'),
(2, '1749908997763-YouTube-Image-panorama.jpg', 'news today 23', 'https://www.tojoglobal.com', '2025-06-14 13:49:57');

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
(22, 29, 'kGhtmHBfvzYhTEGMiK6sTqzglcB3', '2025-03-22 15:11:44'),
(27, 24, 'kGhtmHBfvzYhTEGMiK6sTqzglcB3', '2025-03-28 11:12:55'),
(30, 30, 'kGhtmHBfvzYhTEGMiK6sTqzglcB3', '2025-04-10 16:58:27'),
(31, 28, 'pu0ym5YybOTn6v9tJ28SbSwTj8H3', '2025-06-13 09:09:00');

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
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `published_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_recent` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sponsored_posts`
--

INSERT INTO `sponsored_posts` (`id`, `title`, `description`, `image_url`, `start_date`, `end_date`, `published_at`, `is_recent`) VALUES
(5, 'Sponsored Poster', 'Description trying koroaa', 'be257936-fedc-4395-9cc2-56d1b36c4c92_1748064248349-JMqcf5wY.png', '2025-05-24', '2025-05-25', '2025-05-24 07:39:10', 1),
(6, 'sponsor for youtube add', 'You may include paid product placements, endorsements, sponsorships, or other content that requires disclosure to viewers in your videos. You have to let us know if you include any of those by selecting the paid promotion box in your video details. \r\n\r\nAll paid promotions need to follow Google Ads policies and YouTube\'s Community Guidelines. You and the brands you work with are responsible for understanding and complying with local and legal obligations to disclose Paid Promotion in their content. Some of these obligations include when and how to disclose, and to whom to disclose.\r\n\r\nThe vast majority of YouTubers make money by monetizing their videos through YouTube’s partnership program, commonly known as YouTube Partner Program or YPP.\r\n\r\nSo, why bother with trying to find sponsors when you can simply make videos, sit back, and let YouTube do all the work?\r\n\r\nThere are two big reasons:\r\n\r\nFirst, sponsorship is a great option for content creators to monetize their channels and generate (good) income beyond traditional ad revenue.\r\n\r\nSecond, it’s not all that easy to get accepted into the YPP these days, so you may look for alternatives.\r\n\r\nRecently YouTube has drastically increased the requirements for the channels to be considered for the program.', 'e8c95c79-4b4e-4337-9c87-9e38f7ad6c4d_1748063755808-YouTube-Image-panorama.jpg', '2025-06-13', '2025-06-28', '2025-06-13 09:21:41', 1),
(7, 'What is a sponsored post? Definition, examples, and best practices', 'Sponsored posts – both in the form of social media content ads and written or video content – are a way for brands to cut through the clutter in a crowded online marketplace and say more than they can with a simple banner ad.\r\n\r\nIn this guide, we’ll explain what a sponsored post is and why they are valuable to B2B marketers. Additionally, we’ll outline LinkedIn sponsored content ads best practices that generate measurable success.\r\n\r\n', 'a4c4f341-30b3-4f65-991f-cb4a8167bac9_1748064624938-BPT-Blog-How-To-Make-The-Most-of-Your-Media-Placements-8-Expert-Tips-768x384.png', '2025-05-24', '2025-05-26', '2025-05-24 07:32:40', 1),
(8, 'nice working', 'asda', '51691e13-97ca-451a-8db7-65af2d700bef_1748072816791-macos-monterey-wwdc-21-stock-dark-mode-5k-6016x6016-5585.jpg', '2025-06-13', '2025-07-04', '2025-06-13 06:42:50', 1),
(9, 'check', 'The replacement warranty is applicable only once. And for this, the product, box, all accessories inside the box and papers must be intact. If there is any stain or scratch or dent anywhere, that product will not be covered under the replacement warranty. Then the general warranty policy will be effective. TS Geosystems\' brand warranty will apply to all products of Total Station, Auto Level, Digital Level, Theodolite and RTK GNSS for a specified period of time. Warranty periods may vary by product and brand for different parts of of the same product.\r\n\r\nThe decision of the relevant manufacturer\'s international service centre will be final regarding any internal or external damage to the device or unauthorized modifications or repairs. Service Warranty • The buyer will be covered by the service warranty from the date of purchase of the product until the specified time. • In case of software-related issues of the product or operating system-related issues of the Equipment, the buyer will receive service without any charge during the service warranty period. • In case of hardware-related problems, if the product can be\r\n\r\nrepaired by servicing, the customer will receive the service without any charge. • In case of any damage or replacement of any part, the buyer must pay for the cost of the part. In this case, the service period will depend on the availability of the part. The product warranty may be voided for the following reasons: • If the serial number or sticker containing the number of a product is partially or completely erased, removed, or damaged, the warranty of that product will be deemed void. • If the\r\n\r\nproduct is damaged due to any type of accident or careless use or natural causes such as falling from hands, exposure to fire or water, fungus, rust, insects, voltage fluctuations, lightning strikes, etc., the product warranty will be considered void. • Many of the above issues may be visible after opening the device at the service center. The warranty cancellation issue will then be presented to the buyer with photos or videos. • If any parts, screws, or cables are missing inside the device, or if there is evidence of\r\n\r\nthe device being opened or repaired by an unauthorized person or organization, the warranty will be void. In terms of after-sales service policy, TS Geosystems Bangladesh reserves the right to make reasonable changes to its policy at any time. The detailed and latest warranty policy will be posted on the TS Geosystems Bangladesh website. The latest policy on the website will be considered final for any decision related to the warranty.', 'e1f2ffdc-75ff-4bd7-be2c-02eb480fb2f9_1748072840895-neon-circles-hi-tech-dark-background-loop-5k-8k-7680x4320-8312.png', '2025-06-13', '2025-06-27', '2025-06-13 06:44:48', 0);

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
(32, 'f@gmail.com', 'NFTs, Podcasts, Events', '2025-03-25 13:38:30'),
(33, 'mominitmbstu@gmail.com', 'Events', '2025-06-13 06:15:19'),
(34, 'it19026@mbstu.ac.bd', 'NFTs, Podcasts', '2025-06-13 06:17:06');

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
(4, '2s1GFGc5oaYgKgFsxSriK78qkwU2', 'freeservise7@gmail.com', 'Fun Mix', 'https://lh3.googleusercontent.com/a/ACg8ocLklh6B3-PlzXQC138Dg50c5XD2OlpUlqIGBfNV1PLVxcD6Pis=s96-c', '2025-03-18 10:53:04', NULL),
(5, 'pu0ym5YybOTn6v9tJ28SbSwTj8H3', 'it19026@mbstu.ac.bd', 'MD Momin Hossain', 'https://lh3.googleusercontent.com/a/ACg8ocLhEXEE7mHb7Z7RExT3xm3MF7ISN0mconu8MrfiZwXwTTd-lkg=s96-c', '2025-06-13 06:16:56', NULL),
(6, 'i1O4l8tqpNUgPlfmaYjJ1erKmrK2', 'momintheboss@gmail.com', 'Momin Hossain', 'https://lh3.googleusercontent.com/a/ACg8ocLoLEY-xqWOBY3CVJQ39IxgeH5Pmj1EqnbRJF1ynWiV6_iwx3uvDA=s96-c', '2025-06-14 06:27:27', NULL);

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
-- Indexes for table `documentaries_featured`
--
ALTER TABLE `documentaries_featured`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `documentaries_hero`
--
ALTER TABLE `documentaries_hero`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `episodes`
--
ALTER TABLE `episodes`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `podcastID` (`podcastID`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`);

--
-- Indexes for table `featured_news`
--
ALTER TABLE `featured_news`
  ADD PRIMARY KEY (`id`);

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
  ADD PRIMARY KEY (`id`);

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `blognews`
--
ALTER TABLE `blognews`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `blog_comments`
--
ALTER TABLE `blog_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `blog_reading_time`
--
ALTER TABLE `blog_reading_time`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=399;

--
-- AUTO_INCREMENT for table `blog_views`
--
ALTER TABLE `blog_views`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=215;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `documentaries_featured`
--
ALTER TABLE `documentaries_featured`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `documentaries_hero`
--
ALTER TABLE `documentaries_hero`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `episodes`
--
ALTER TABLE `episodes`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `featured_news`
--
ALTER TABLE `featured_news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `jobpost`
--
ALTER TABLE `jobpost`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `sponsors`
--
ALTER TABLE `sponsors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subscribers`
--
ALTER TABLE `subscribers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 15, 2024 at 04:19 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

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
(17, '4356f4ec-d20f-4519-ab08-0dba1196a95d', 3, 2, 'Don’t forget about merged mining', 'It’s now time for the entire Bitcoin community to recognize that Satoshi’s design transcends the confines of a single chain', 9, '2024-07-12 15:47:39', 'd131d74f-d4e0-40c3-9a7a-2868d489d6cc_1720703936883-pexels-fauxels-3184163(1920x1280).jpg', '<p><span class=\"blockInner\"><span class=\"entry objProp\" data-size=\" // 1 item\"><span class=\"entry arrElem\" data-size=\" // 10 items\"><span class=\"entry objProp\"><span class=\"k\">st</span>\":&nbsp;<span class=\"s\">\"&lt;p&gt;The error message you received indicates that the `req.file` object is `undefined`, which suggests that the file upload process is not working as expected. Here are steps to troubleshoot and resolve this issue:&lt;/p&gt;\\r\\n&lt;p&gt;1. **Ensure Multer is Configured Correctly**:&lt;br&gt;&amp;nbsp; &amp;nbsp;Make sure you have configured Multer correctly to handle file uploads. Here\'s an example of how to set it up in your server file (e.g., `app.js` or `server.js`):&lt;/p&gt;\\r\\n&lt;p&gt;&amp;nbsp; &amp;nbsp;```javascript&lt;br&gt;&amp;nbsp; &amp;nbsp;const multer = require(\'multer\');&lt;br&gt;&amp;nbsp; &amp;nbsp;const path = require(\'path\');&lt;/p&gt;\\r\\n&lt;p&gt;&amp;nbsp; &amp;nbsp;// Set storage engine&lt;br&gt;&amp;nbsp; &amp;nbsp;const storage = multer.diskStorage({&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp;destination: \'./uploads/\',&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp;filename: function (req, file, cb) {&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp;cb(null, file.fieldname + \'-\' + Date.now() + path.extname(file.originalname));&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp;},&lt;br&gt;&amp;nbsp; &amp;nbsp;});&lt;/p&gt;\\r\\n&lt;p&gt;&amp;nbsp; &amp;nbsp;// Initialize upload&lt;br&gt;&amp;nbsp; &amp;nbsp;const upload = multer({&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp;storage: storage,&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp;limits: { fileSize: 1000000 }, // 1MB limit&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp;fileFilter: function (req, file, cb) {&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp;checkFileType(file, cb);&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp;},&lt;br&gt;&amp;nbsp; &amp;nbsp;}).single(\'file\'); // \'file\' is the name of the field in your form&lt;/p&gt;\\r\\n&lt;p&gt;&amp;nbsp; &amp;nbsp;// Check file type&lt;br&gt;&amp;nbsp; &amp;nbsp;function checkFileType(file, cb) {&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp;const filetypes = /jpeg|jpg|png|gif/;&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp;const extname = filetypes.test(path.extname(file.originalname).toLowerCase());&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp;const mimetype = filetypes.test(file.mimetype);&lt;/p&gt;\\r\\n&lt;p&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp;if (mimetype &amp;amp;&amp;amp; extname) {&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp;return cb(null, true);&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp;} else {&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp;cb(\'Error: Images Only!\');&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp;}&lt;br&gt;&amp;nbsp; &amp;nbsp;}&lt;br&gt;&amp;nbsp; &amp;nbsp;```&lt;/p&gt;\\r\\n&lt;p&gt;2. **Update Route to Use Multer**:&lt;br&gt;&amp;nbsp; &amp;nbsp;Ensure that your route is using the `upload` middleware correctly. Here is an example of how to use it in your route:&lt;/p&gt;\\r\\n&lt;p&gt;&amp;nbsp; &amp;nbsp;```javascript&lt;br&gt;&amp;nbsp; &amp;nbsp;const express = require(\'express\');&lt;br&gt;&amp;nbsp; &amp;nbsp;const router = express.Router();&lt;/p&gt;\\r\\n&lt;p&gt;&amp;nbsp; &amp;nbsp;// Import the createBlogPost controller&lt;br&gt;&amp;nbsp; &amp;nbsp;const { createBlogPost } = require(\'./controllers/AdminControllers\');&lt;/p&gt;\\r\\n&lt;p&gt;&amp;nbsp; &amp;nbsp;// Use the upload middleware&lt;br&gt;&amp;nbsp; &amp;nbsp;router.post(\'/api/admin/blogpost/create\', upload, createBlogPost);&lt;/p&gt;\\r\\n&lt;p&gt;&amp;nbsp; &amp;nbsp;module.exports = router;&lt;br&gt;&amp;nbsp; &amp;nbsp;```&lt;/p&gt;\\r\\n&lt;p&gt;3. **Update `createBlogPost` Function**:&lt;br&gt;&amp;nbsp; &amp;nbsp;Ensure that your `createBlogPost` function correctly handles the uploaded file:&lt;/p&gt;\\r\\n&lt;p&gt;&amp;nbsp; &amp;nbsp;```javascript&lt;br&gt;&amp;nbsp; &amp;nbsp;const createBlogPost = (req, res) =&amp;gt; {&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp;// Generate the current date and time&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp;const currentDate = new Date();&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp;const formattedDate = currentDate.toISOString().slice(0, 19).replace(\'T\', \' \'); // Format to \'YYYY-MM-DD HH:MM:SS\'&lt;/p&gt;\\r\\n&lt;p&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp;// Check if file was uploaded&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp;if (!req.file) {&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp;return res.json({ Status: false, Error: \'No file uploaded\' });&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp;}&lt;/p&gt;\\r\\n&lt;p&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp;const imageFile = req.file.filename;&lt;/p&gt;\\r\\n&lt;p&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp;const values = [&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp;uuidv4(),&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp;req.body.title,&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp;req.body.subTitle,&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp;req.body.AuthorOne,&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp;req.body.AuthorTwo,&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp;req.body.newsCategory,&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp;imageFile,&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp;req.body.artical,&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp;formattedDate,&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp;];&lt;/p&gt;\\r\\n&lt;p&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp;db.query(createBlogPostQuery, [values], (err, result) =&amp;gt; {&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp;if (err) {&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp;return res.json({ Status: false, Error: \'Query Error\' });&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp;} else {&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp;return res.json({ Status: true, Result: result });&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp;}&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp;});&lt;br&gt;&amp;nbsp; &amp;nbsp;};&lt;br&gt;&amp;nbsp; &amp;nbsp;```&lt;/p&gt;\\r\\n&lt;p&gt;4. **Ensure Form Data Matches**:&lt;br&gt;&amp;nbsp; &amp;nbsp;Make sure that the form data sent from the client matches what Multer is expecting. In your `CreateBlogPost` component, ensure that the file input field name matches what Multer is expecting (`file` in this case):&lt;/p&gt;\\r\\n&lt;p&gt;&amp;nbsp; &amp;nbsp;```html&lt;br&gt;&amp;nbsp; &amp;nbsp;&amp;lt;input&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp;id=\\\"file\\\"&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp;type=\\\"file\\\"&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp;name=\\\"file\\\"&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp;onChange={handleChange}&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp;accept=\\\".jpg, .png\\\"&lt;br&gt;&amp;nbsp; &amp;nbsp; &amp;nbsp;required&lt;br&gt;&amp;nbsp; &amp;nbsp;/&amp;gt;&lt;br&gt;&amp;nbsp; &amp;nbsp;```&lt;/p&gt;\\r\\n&lt;p&gt;By following these steps, you ensure that the file upload process is correctly configured and the file data is properly handled in the server-side code. This should resolve the `TypeError: Cannot read properties of undefined (reading \'filename\')` error.&lt;/p&gt;\"</span></span><span class=\"b\">}</span></span><span class=\"b\">]</span></span></span><span class=\"b\">}</span></p>'),
(19, '0eda54fc-1d52-430d-b3a8-f0d9b9277c2a', 2, NULL, 'Don’t forget about merged mining 2:05am', 'Don’t forget about merged miningDon’t forget about merged miningDon’t forget about merged mining', 11, '2024-07-12 15:47:28', '0f95371c-9da8-412b-b647-34ab10088f01_1720704755537-Top-5-Crypto-wallets-in-crypto-industry.jpg', '<p>Get Start ...</p>\r\n<h1 class=\"self-stretch flex-grow-0 flex-shrink-0 text-xl md:text-3xl lg:text-4xl xl:text-5xl font-headline text-left text-dark\">Don&rsquo;t forget about merged mining</h1>\r\n<h1 class=\"self-stretch flex-grow-0 flex-shrink-0 text-xl md:text-3xl lg:text-4xl xl:text-5xl font-headline text-left text-dark\">Don&rsquo;t forget about merged mining</h1>\r\n<h1 class=\"self-stretch flex-grow-0 flex-shrink-0 text-xl md:text-3xl lg:text-4xl xl:text-5xl font-headline text-left text-dark\">Don&rsquo;t forget about merged mining</h1>\r\n<h1 class=\"self-stretch flex-grow-0 flex-shrink-0 text-xl md:text-3xl lg:text-4xl xl:text-5xl font-headline text-left text-dark\">Don&rsquo;t forget about merged mining</h1>'),
(20, '116367e0-2997-4b70-a2f7-213a25789ad2', 3, NULL, 'Tokenized treasurys are ‘growing way faster than stablecoins:’ Securitize CEO', 'Securitize CEO Carlos Domingo thinks BUIDL will potentially hit its next $500 million milestone in just a few months', 7, '2024-07-12 15:50:16', 'dc955f02-6bfd-4d63-8ace-0c5f2f6ba8d6_1720777816416-Screenshot (1).png', '<p>Right now the total value of the tokenized treasurys market, which includes BUIDL, sits at $1.8 billion. Domingo wouldn&rsquo;t be surprised to see that market cap top $2 billion soon.</p>\r\n<p>While the market is obviously far smaller than the $160 billion stablecoin market, &ldquo;it&rsquo;s definitely growing way faster than stablecoins.&rdquo;</p>\r\n<p>&ldquo;Keep in mind, stablecoins are easier to purchase and use because they&rsquo;re permissionless, while tokenized treasurys are securities. So they have some restrictions in terms of who can purchase them, how you can transfer them, etc. So they&rsquo;re never going to be &mdash; in my opinion &mdash; as big as stablecoins&hellip;but I think they can easily become 10% to 20% of the market of stablecoins,&rdquo; he said.</p>\r\n<p>While the rest of the industry was no doubt buoyed by the&nbsp;<a href=\"https://blockworks.co/news/sec-approves-bitcoin-etf\" target=\"_blank\" rel=\"nofollow noopener\">launch of the bitcoin ETFs</a>&nbsp;earlier this year, Domingo thinks the two have operated in &ldquo;parallel paths.&rdquo;</p>\r\n<p>&ldquo;The way I see it is: You&rsquo;re taking a Web3 asset, which is bitcoin, and you put it on the [traditional finance] world through an ETF. Rather, I think&nbsp;<a href=\"https://blockworks.co/tag/tokenization\" target=\"_blank\" rel=\"nofollow noopener\">tokenization</a> is the opposite. You&rsquo;re taking a [traditional finance] asset and you put it on the crypto &mdash; on the Web3 space &mdash; through tokenization. So they are like two distinct things that are very valuable but have nothing to do with each other,&rdquo; he said.</p>'),
(21, 'fd2df9fb-f9cc-48d4-8862-7cf2e1df5bc0', 4, 3, 'We should be tokenizing assets with substance, not speculation ', 'If we tokenize all assets in a speculative rush, the risk of creating illiquid markets and trapped value will manifest on a large scale', 10, '2024-07-12 16:42:06', '6c17b958-5f7b-4f0e-9a34-9451f325f36a_1720778097283-pexels-ella-olsson-572949-1640772.jpg', '<h2 id=\"tokenization-doesnt-promise-success\" class=\"wp-block-heading\">Tokenization doesn&rsquo;t promise success&nbsp;</h2>\r\n<p>Firstly, though, there needs to be a reassessment of how assets are evaluated and qualified as being a sensical tokenization option. Just because the technology to tokenize complex assets exists, doesn&rsquo;t mean it should be deployed frivolously.&nbsp;</p>\r\n<p>To gauge whether something should be tokenized, we should be asking the following question: Does this asset have intrinsic value and will its tokenization address the market by solving a problem?&nbsp;</p>\r\n<p>We can already see that speculative RWA tokenization doesn&rsquo;t always guarantee (and often fails to deliver) liquidity. Take the real estate market, for example. The surface gleams with promise to disarm economic disparity and put the underprivileged on the map through fractional ownership opportunities. But what good is it to own 0.001% of a property in a system that lacks any meaningful dividend structure? Value gets trapped, liquidity stagnates. It is therefore not surprising to see that onchain real estate is the&nbsp;<a href=\"https://www.galaxy.com/insights/research/overview-of-on-chain-rwas/\" target=\"_blank\" rel=\"nofollow noopener\">slowest growing</a>&nbsp;RWA category.&nbsp;</p>\r\n<h2 id=\"careful-assessment-is-necessary\" class=\"wp-block-heading\">Careful assessment is necessary&nbsp;</h2>\r\n<p>Making previously inaccessible assets accessible to the majority is a clear potential benefit of tokenization. But the initial spike in demand that we&rsquo;re now seeing won&rsquo;t be sustained if there&rsquo;s no emphasis on deriving true intrinsic value. There&rsquo;s not much point in tokenizing an asset without clarifying if it actually has commercial viability. It&rsquo;s simple supply and demand principles that seem to be ignored.&nbsp;</p>\r\n<p><strong>Read more from our opinion section:</strong>&nbsp;<a href=\"https://blockworks.co/news/rwas-tokenized-nonsense-stablecoins\" target=\"_blank\" rel=\"nofollow noopener\">Most RWAs today are tokenized nonsense</a></p>\r\n<p>That said, on the other end of the spectrum, I hope there&rsquo;s no need for me to protest against any encores still circling the likes of Pokemon cards. We should&rsquo;ve all passed that checkpoint by now. Instead, mature assets such as private equity and private credit can consolidate the upward trajectory of the RWA market by providing serious utility to investors.<br>Private credit loans are one of the fastest growing categories, worth over&nbsp;<a href=\"https://www.imf.org/en/Blogs/Articles/2024/04/08/fast-growing-USD2-trillion-private-credit-market-warrants-closer-watch\" target=\"_blank\" rel=\"nofollow noopener\">$2 trillion</a>&nbsp;as of last year.&nbsp;</p>\r\n<p>Secondly, once a genuine demand for real value has been identified, we need responsible approaches to bringing the assets onchain. There must be a presence of market makers who can conduct comprehensive risk assessments around the underlying price discovery. This is how any inherent volatilities can be managed and accounted for. Otherwise, in spite of any real world success, the nature of an asset becomes susceptible to fluctuations in the wider market.&nbsp;</p>\r\n<p>Web3 must also play to its strengths as well.</p>'),
(22, '0677dca3-88ce-4834-979e-4db4f890f5ca', 2, NULL, 'Does the ETH ETF ‘fee war’ even matter to investors?', 'Franklin Templeton has the lowest intended ETH fund fee so far, though a similar advantage did not help it win the race for bitcoin ETF assets', 3, '2024-07-12 15:55:51', '339cf41f-8ea5-47af-8a92-99f1c61d97ea_1720778151870-pexels-quang-nguyen-vinh-222549-2132180.jpg', '<p>&ldquo;A BlackRock ether ETF would probably be much more popular than an ether ETF from an upstart ETF issuer, even if the BlackRock fund was five basis points more expensive,&rdquo; he told Blockworks.&nbsp;</p>\r\n<p>Roy acknowledged that a larger difference &mdash; such as 10 or 20 basis points &mdash; could prove to be a bigger deal to investors.&nbsp;</p>\r\n<p>Ultimately, he added, the spot bitcoin ETF saga offers &ldquo;a good template&rdquo; for how competition within the ether ETF category could shake out.</p>\r\n<p>&ldquo;BlackRock and Fidelity have huge advantages which they will exploit, but there is room for smaller issuers like&nbsp;<a href=\"https://blockworks.co/tag/bitwise\" target=\"_blank\" rel=\"nofollow noopener\">Bitwise</a>&nbsp;to gain a foothold in the space as well with low fees and unique angles,&rdquo; he said.</p>\r\n<p>The lowest US spot bitcoin ETF fee &mdash; excluding initial fee waivers &mdash; was Franklin Templeton&rsquo;s, at 0.19%. The firm&nbsp;<a href=\"https://blockworks.co/news/franklin-templeton-bitcoin-etf-fees\" target=\"_blank\" rel=\"nofollow noopener\">undercut Bitwise&rsquo;s 0.20% fee</a>&nbsp;a day after the funds launched.</p>\r\n<p>But Franklin Templeton&rsquo;s BTC fund has attracted just $345 million of net inflows after six months on the market. The Bitwise Bitcoin ETF (BITB) has brought in about $2.1 billion.</p>\r\n<p>Funds by BlackRock and Fidelity lead flows in the category, with $18 billion and $9.5 billion, respectively. Both charge a slightly higher 0.25%.</p>\r\n<p>The most expensive fund by far &mdash; the Grayscale Bitcoin Trust ETF (GBTC), at 1.5% &mdash; has endured $18.6 billion of net outflows.</p>\r\n<p>Industry watchers continue to watch what Grayscale might charge for&nbsp;<a href=\"https://blockworks.co/news/grayscale-takes-page-from-blackrock-playbook\" target=\"_blank\" rel=\"nofollow noopener\">the &ldquo;Mini&rdquo; versions</a>&nbsp;of GBTC and its&nbsp;<a href=\"https://blockworks.co/news/grayscale-eth-trust-ethe-filing-vaneck-proshares\" target=\"_blank\" rel=\"nofollow noopener\">Ethereum Trust</a>&nbsp;(ETHE).</p>\r\n<p>While some advisers have said they have moved money out of GBTC into cheaper BTC funds, others have considered custodians, spreads and liquidity when making decisions on which ETFs to allocate to. &nbsp;</p>\r\n<hr class=\"wp-block-separator has-alpha-channel-opacity\">\r\n<p><strong>Start your day with top cry</strong></p>'),
(23, '83fa41f6-b93f-4308-a502-2a6d3f510de3', 4, NULL, 'House fails to override veto of anti-SAB 121 bill ', 'Representatives on Thursday opted to back President Biden and uphold his veto of the legislation that sought to invalidate SAB 121', 10, '2024-07-12 15:56:55', '9fb07d84-fd37-4d83-ba66-10f3b3721d77_1720778215180-pexels-hyunjoo-kang-1089919465-24859790.jpg', '<p>House Financial Services Committee Chair Patrick McHenry, R-N.C., spoke in favor of overriding the veto Wednesday, arguing the bipartisan support the resolution received is proof Reps. should stand their ground.&nbsp;</p>\r\n<p>&ldquo;​​SAB 121 is one of the most glaring examples of the regulatory overreach that has defined Chair&nbsp;<a href=\"https://blockworks.co/tag/gary-gensler\" target=\"_blank\" rel=\"nofollow noopener\">Gary Gensler</a>&rsquo;s tenure at the [SEC],&rdquo; McHenry said. &ldquo;It limits consumers options to safely custody their digital assets, upending decades of bank custody practices and increasing concentration risk.&rdquo;&nbsp;</p>\r\n<p><strong>Read more from our opinion section:</strong>&nbsp;<a href=\"https://blockworks.co/news/senate-gensler-sec-overturn-sab-121\" target=\"_blank\" rel=\"nofollow noopener\">It&rsquo;s time to overturn SAB 121</a></p>\r\n<p>The House and Senate&nbsp;<a href=\"https://blockworks.co/news/senate-passes-resolution-to-overturn-sab121\" target=\"_blank\" rel=\"nofollow noopener\">passed Joint Resolution 109 in May</a>. The legislation, if passed, would have overturned SAB 121, the accounting guidance that states digital asset custodians should&nbsp;<a href=\"https://blockworks.co/news/sec-staff-call-for-crypto-entities-to-show-liability-on-balance-sheet\" target=\"_blank\" rel=\"nofollow noopener\">report a liability and &ldquo;corresponding assets&rdquo;</a>&nbsp;on their balance sheets for all custodied cryptocurrencies.&nbsp;</p>\r\n<p>Each chamber approved the resolution, which was brought under the Congressional Review Act, with bipartisan support. Thirty-three Democrats in total voted in favor of the legislation across both chambers.&nbsp;</p>\r\n<p>President Biden,&nbsp;<a href=\"https://www.whitehouse.gov/wp-content/uploads/2024/05/SAP-HJRes109.pdf\" target=\"_blank\" rel=\"nofollow noopener\">as expected</a>, vetoed the resolution shortly after it was passed. His administration stated that by invoking the Congressional Review Act, lawmakers could &ldquo;inappropriately constrain the&nbsp;<a href=\"https://blockworks.co/tag/sec\" target=\"_blank\" rel=\"nofollow noopener\">SEC</a>&rsquo;s ability to ensure appropriate guardrails.&rdquo;</p>\r\n<p>&ldquo;President Biden vetoed the first digital asset-specific legislation that ever passed the House and the Senate,&rdquo; McHenry said. &ldquo;It&rsquo;s never been clearer; this administration would rather play politics and side with power-hungry bureaucrats over the American people.&rdquo;</p>\r\n<hr class=\"wp-block-separator has-alpha-channel-opacity\">\r\n<p><strong>Start your day with top crypto insights from David Canellis and Katherine Ross.&nbsp;<a href=\"https://blockworks.co/newsletter/empire\" target=\"_blank\" rel=\"nofollow noopener\">Subscribe to the Empire newsletter</a>.</strong></p>\r\n<p><strong>Explore the growing intersection between crypto, macroeconomics, policy and finance with Ben Strack, Casey Wagner and Felix Jauvin.&nbsp;<a href=\"https://blockworks.co/newsletter/onthemargin\" target=\"_blank\" rel=\"nofollow noopener\">Subscribe to the On the Margin newsletter</a>.</strong></p>'),
(24, '6b3e4855-bd8d-4db4-9f63-6543b7d52a38', 2, NULL, 'Empire Newsletter: Is Coinbase stock a proxy bet on crypto’s success?', 'Plus, do we have an “Amazon of crypto”?', 8, '2024-07-12 18:43:38', 'c8ee4a80-da58-4ea3-8b5a-842f671e6d16_1720788218718-pexels-xmtnguyen-699953.jpg', '<p>But what does success mean for crypto?</p>\r\n<p>Basing it on rising prices and record-high valuations feels right but markets don&rsquo;t really tell the whole story.&nbsp;</p>\r\n<p>Maybe success is more about how much data is kept in decentralized file storage protocols, or stablecoin adoption in places with rampant high inflation.&nbsp;</p>\r\n<p>Perhaps it&rsquo;s the total value locked in real-world asset projects, like BlackRock&rsquo;s tokenized money market fund on Ethereum. All those have little to do with whether bitcoin&rsquo;s price goes up or down.</p>\r\n<p>Yep, crypto consuming traditional finance and bringing blockchain rails to the masses sounds like success to me.&nbsp;</p>\r\n<p>For Coinbase, figuring out ways to offer shareholders exposure to that goal seems like the move. But since its direct listing in April 2021 &mdash; practically peak bull market &mdash; the stock has been closely tied to bitcoin&rsquo;s price, as is the case with the rest of the crypto market.</p>\r\n<figure class=\"wp-block-image\"><span class=\"block\"><span class=\"hover:cursor-pointer align-center block\"><img src=\"https://lh7-us.googleusercontent.com/docsz/AD_4nXeKrl68okmmxUD-zanUyplZuDKHIOpf1Lz9n_EiajYdUyXXNWsLkJ7m6X_GK9knFNxGsn7zto3L2mIkZApNplgyPZxNZXksgQrcIJz2_amh8jUelY-T1NeMucRQDLACwwqjKGrixD9tRIEWoZqadSPgcbqd?key=NpibROXxzPGADSHu9JOh8w\" alt=\"\"></span></span></figure>'),
(25, '2d04e758-829e-4579-978a-173630e09fa9', 3, NULL, 'New security council debuts with Coinbase, Anchorage as founding members', 'New security council debuts with Coinbase, Anchorage as founding membersNew security council debuts with Coinbase, Anchorage as founding membersNew security council debuts with Coinbase, Anchorage as founding members', 11, '2024-07-12 18:47:06', '1b0f342d-32a6-497a-84d7-6d41cf325fd8_1720788426724-balram-pandey-_GBiU5qcMLM-unsplash.jpg', '<h1 class=\"self-stretch flex-grow-0 flex-shrink-0 text-xl md:text-3xl lg:text-4xl xl:text-5xl font-headline text-left text-dark\">New security council debuts with Coinbase, Anchorage as founding members</h1>\r\n<h1 class=\"self-stretch flex-grow-0 flex-shrink-0 text-xl md:text-3xl lg:text-4xl xl:text-5xl font-headline text-left text-dark\">New security council debuts with Coinbase, Anchorage as founding members</h1>\r\n<h1 class=\"self-stretch flex-grow-0 flex-shrink-0 text-xl md:text-3xl lg:text-4xl xl:text-5xl font-headline text-left text-dark\">New security council debuts with Coinbase, Anchorage as founding members</h1>\r\n<h1 class=\"self-stretch flex-grow-0 flex-shrink-0 text-xl md:text-3xl lg:text-4xl xl:text-5xl font-headline text-left text-dark\">New security council debuts with Coinbase, Anchorage as founding members</h1>\r\n<h1 class=\"self-stretch flex-grow-0 flex-shrink-0 text-xl md:text-3xl lg:text-4xl xl:text-5xl font-headline text-left text-dark\">New security council debuts with Coinbase, Anchorage as founding members</h1>\r\n<h1 class=\"self-stretch flex-grow-0 flex-shrink-0 text-xl md:text-3xl lg:text-4xl xl:text-5xl font-headline text-left text-dark\">New security council debuts with Coinbase, Anchorage as founding members</h1>\r\n<h1 class=\"self-stretch flex-grow-0 flex-shrink-0 text-xl md:text-3xl lg:text-4xl xl:text-5xl font-headline text-left text-dark\">New security council debuts with Coinbase, Anchorage as founding members</h1>\r\n<h1 class=\"self-stretch flex-grow-0 flex-shrink-0 text-xl md:text-3xl lg:text-4xl xl:text-5xl font-headline text-left text-dark\">New security council debuts with Coinbase, Anchorage as founding members</h1>\r\n<h1 class=\"self-stretch flex-grow-0 flex-shrink-0 text-xl md:text-3xl lg:text-4xl xl:text-5xl font-headline text-left text-dark\">New security council debuts with Coinbase, Anchorage as founding members</h1>'),
(26, '2c1973b0-05fe-4611-9abd-391841c8189c', 4, NULL, 'On the Margin Newsletter: Biden’s SEC nominee appears safe', 'Plus, publicly traded crypto companies had a pretty eventful news week', 8, '2024-07-13 15:20:23', 'c1516605-3826-4636-8de1-0c268fac03a9_1720862423872-Best-new-sites-for-cryptocurrency-news.jpg', '<h2 id=\"senate-seems-poised-to-push-biden-nominations-through\" class=\"wp-block-heading\">Senate seems poised to push Biden nominations through&nbsp;</h2>\r\n<p>Fortunately for the nominees, yesterday&rsquo;s Senate Banking Committee confirmation hearings were largely uneventful.&nbsp;</p>\r\n<p>SEC Commissioner Caroline Crenshaw, up for another term at the securities regulator, flew mostly under the radar. Committee members posed more questions to Christy Goldsmith Romero, President Biden&rsquo;s pick to chair the Federal Deposit Insurance Corporation.&nbsp;</p>\r\n<p>Kristin Johnson, put up to be an Assistant Secretary of the Treasury, and Gordon Ito, nominated to be a member of the Financial Stability Oversight Council, also faced questions Thursday.&nbsp;</p>\r\n<p>Goldsmith Romero stands to take over the FDIC as the agency faces controversy. A May&nbsp;<a href=\"https://www.fdic.gov/news/press-releases/fdic-special-review-committee-releases-independent-report-workplace-misconduct\" target=\"_blank\" rel=\"nofollow noopener\">report</a>&nbsp;uncovered allegations of sexual harassment and discrimination at the FDIC, raising questions about whether Chair Martin Gruenberg should continue in the role.&nbsp;</p>\r\n<p>The nominee told Senators Thursday she plans for a &ldquo;complete overhaul&rdquo; of the agency should she be approved, including firing employees who have harassed or abused others and implementing a new system for registering complaints.&nbsp;</p>'),
(27, 'e6df5b43-c7cd-480d-9827-c78544e05e73', 4, 2, 'Bitcoin ETF segment sees record-tying fifth straight day of outflows', 'BlackRock’s iShares Bitcoin Trust continues to see daily positive net flows, though its inflow total for a single day hit a new low Wednesday', 4, '2024-07-14 16:42:22', '84a5fc8c-5b62-49a9-8fff-d72141a4b0e5_1720953742069-why-choose-tojo-global.jpg', '<p>The five-day net outflow total beginning on April 12 amounts to $319 million, reflecting an average of $64 million over the span. That peaked on Wednesday, when $165 million left the 11-fund sector.&nbsp;&nbsp;&nbsp;</p>\r\n<p>Such an outflow streak has happened just once before, with US spot bitcoin ETFs bleeding assets each day from March 18 to March 22. Those outflows were heavier than the latest active streak, totaling $888 million.</p>\r\n<p>The main culprit driving the net outflows is the Grayscale Bitcoin Trust (GBTC). The higher-priced fund, which converted to an ETF in January, has averaged $116 million of net outflows per day over the last five trading days.</p>\r\n<p>Aside from GBTC, only the Ark 21Shares Bitcoin ETF (ARKB) has contributed any meaningful net outflows, seeing $43 million exit the fund on Wednesday. Others meanwhile have watched their inflows completely stop.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>\r\n<p>Unique to its competitors, the flow-gathering leader in the space, BlackRock, has kept its daily flows positive.&nbsp;</p>\r\n<p>Nine US spot bitcoin ETFs saw zero inflows on both April 12 and April 15, according to Farside Investors&nbsp;<a href=\"https://farside.co.uk/?p=997\" target=\"_blank\" rel=\"nofollow noopener\">data</a>. IBIT&rsquo;s net inflows were $111 million and $73 million on those days, respectively.&nbsp;&nbsp;</p>\r\n<p><strong>Read more:&nbsp;</strong><a href=\"https://blockworks.co/news/blackrock-extends-bitcoin-etf-inflows\" target=\"_blank\" rel=\"nofollow noopener\">BlackRock</a></p>');

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
  `podcastID` int(11) NOT NULL,
  `dateAndTime` datetime DEFAULT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `audioFile` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(7, '4b2457c1-2876-42ba-9b9e-ccf06a307997', 'ahmed66882298@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `podcasts`
--

CREATE TABLE `podcasts` (
  `ID` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `hostedInfo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(5, 'marketing123', '70e4f0e1-2781-47e6-9b83-361fdf635b5a');

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
-- Indexes for table `newsletteremail`
--
ALTER TABLE `newsletteremail`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `podcasts`
--
ALTER TABLE `podcasts`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`ID`);

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `episodes`
--
ALTER TABLE `episodes`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `newsletteremail`
--
ALTER TABLE `newsletteremail`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `podcasts`
--
ALTER TABLE `podcasts`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
-- Constraints for table `episodes`
--
ALTER TABLE `episodes`
  ADD CONSTRAINT `episodes_ibfk_1` FOREIGN KEY (`podcastID`) REFERENCES `podcasts` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

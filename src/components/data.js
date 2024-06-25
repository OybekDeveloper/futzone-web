import {
  APL,
  bundesliga,
  laliga,
  league1,
  mls,
  rusAPL,
  saudiLeagues,
  seriaA,
  uzbSupper,
} from "../images";
import {
  france,
  german,
  italy,
  russian,
  saudi,
  spain,
  uk,
  usa,
  uzb,
} from "../images/leagues";

import { FaTelegram } from "react-icons/fa6";
import { RiRobot2Fill } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { AiFillYoutube } from "react-icons/ai";

export const SoccerLeagues = [
  { id: 30, liga_id: "1", name: "euro" },
  { id: 1, liga_id: "336", name: "uzSuperliga" },
  { id: 2, liga_id: "603", name: "uzCup" },
  { id: 3, liga_id: "657", name: "uzSuperCup" },
  { id: 4, liga_id: "344", name: "ruPL" },
  { id: 5, liga_id: "278", name: "saudiLeague" },
  { id: 6, liga_id: "604", name: "saudiKingsCup" },
  { id: 7, liga_id: "536", name: "saudiSuperCup" },
  { id: 8, liga_id: "7974", name: "asianCupU17" },
  { id: 9, liga_id: "7968", name: "asianCupU20" },
  { id: 10, liga_id: "570", name: "asianCupU23" },
  { id: 11, liga_id: "347", name: "asianCup" },
  { id: 12, liga_id: "418", name: "asianCupQualification" },
  { id: 13, liga_id: "477", name: "asianGames" },
  { id: 14, liga_id: "10", name: "asianCL" },
  { id: 15, liga_id: "17", name: "copaAmerica" },
  { id: 16, liga_id: "356", name: "friendlyMatches" },
  { id: 17, liga_id: "355", name: "friendlyMatchesClubs" },
  { id: 18, liga_id: "29", name: "africaNationsCup" },
  { id: 19, liga_id: "3", name: "ucl" },
  { id: 20, liga_id: "4", name: "uel" },
  { id: 21, liga_id: "372", name: "uefaSuperCup" },
  { id: 22, liga_id: "633", name: "uefaNationsLeague" },
  { id: 23, liga_id: "683", name: "uefaConfLeague" },
  { id: 24, liga_id: "24", name: "uefaWorldCupQu" },
  { id: 25, liga_id: "28", name: "worldCup" },
  { id: 26, liga_id: "27", name: "comnebolWorldCupQu" },
  { id: 27, liga_id: "22", name: "afcWorldCupQu" },
  { id: 28, liga_id: "19", name: "fifaClubWorldCup" },
  { id: 29, liga_id: "646", name: "arabClubsChampionsCup" },
  { id: 31, liga_id: "152", name: "englishPL" },
  { id: 32, liga_id: "146", name: "englishFA" },
  { id: 33, liga_id: "302", name: "laliga" },
  { id: 34, liga_id: "383", name: "spainSuperCup" },
  { id: 35, liga_id: "300", name: "copaDelRey" },
  { id: 36, liga_id: "207", name: "serieA" },
  { id: 37, liga_id: "175", name: "bundesliga" },
  { id: 38, liga_id: "379", name: "germainSuperCup" },
  { id: 39, liga_id: "168", name: "liga1" },
  { id: 40, liga_id: "332", name: "mls" },
];

export const navLinkData = [
  {
    id: 1,
    title: "Asosiy",
    link: "/",
  },
  {
    id: 2,
    title: "Yangiliklar",
    link: "/news",
  },
  {
    id: 3,
    title: "O’yinlar",
    link: "/matches",
  },
  {
    id: 4,
    title: "Ligalar",
    link: "/leagues",
  },
  {
    id: 5,
    title: "Futzone TV",
    link: "/futzone-tv",
  },
];

export const leaguesData = [
  { id: "336", league: uzbSupper, flag: uzb, name: "O'zbekiston Superliga" },
  { id: "152", league: APL, flag: uk, name: "English Premier League" },
  { id: "302", league: laliga, flag: spain, name: "La Liga" },
  { id: "207", league: seriaA, flag: italy, name: "Serie A" },
  { id: "175", league: bundesliga, flag: german, name: "Bundesliga" },
  { id: "168", league: league1, flag: france, name: "Ligue 1" },
  { id: "344", league: rusAPL, flag: russian, name: "Russian Premier League" },
  { id: "278", league: saudiLeagues, flag: saudi, name: "Saudi Pro League" },
  { id: "332", league: mls, flag: usa, name: "Major League Soccer" },
];

export const matchEventsData = [
  {
    id: 1,
    title: "Asosiy",
  },
  {
    id: 2,
    title: "Tarkiblar",
  },
  {
    id: 3,
    title: "Comment",
  },
];
export const leagueEventsData = [
  {
    id: 1,
    title: "Turnir jadvali",
  },
  {
    id: 2,
    title: "To'purarlar",
  },
];

export const socialMedias = [
  { name: "Telegram", url: "https://t.me/futzoneuz", icon: <FaTelegram /> },
  { name: "Bot", url: "https://t.me/futzone_bot", icon: <RiRobot2Fill /> },
  {
    name: "Support Bot",
    url: "https://t.me/Futzone_SupportBot",
    icon: <BiSupport />,
  },
  {
    name: "App",
    url: "https://futzone.uz/apps",
    icon: <IoPhonePortraitOutline />,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/futzone.uz",
    icon: <FaInstagram />,
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@futzoneuz",
    icon: <AiFillYoutube />,
  },
];

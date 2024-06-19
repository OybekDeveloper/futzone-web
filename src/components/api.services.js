import axios from "axios";
const baseUrl = `https://apiv3.apifootball.com/?action=`;
const apiKey = process.env.REACT_APP_FOOTBALL_API_KEY;
export const ApiServer = {
  async getEventsData(from, to, liga_id) {
    const response = await axios({
      method: "GET",
      url: `${baseUrl}get_events&from=${from}&to=${to}&league_id=${liga_id}&APIkey=${apiKey}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
  async getStandingData(liga_id) {
    const response = await axios({
      method: "GET",
      url: `${baseUrl}get_standings&league_id=${liga_id}&APIkey=${apiKey}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
  async getStatisticData(match_id) {
    const response = await axios({
      method: "GET",
      url: `${baseUrl}get_statistics&match_id=${match_id}&APIkey=${apiKey}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
  async getPredictionsData(from, to) {
    const response = await axios({
      method: "GET",
      url: `${baseUrl}get_predictions&from=${from}&to=${to}&APIkey=${apiKey}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
  async getTopScoreData(league_id) {
    const response = await axios({
      method: "GET",
      url: `${baseUrl}get_topscorers&league_id=${league_id}&APIkey=${apiKey}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
  async getNews(league_id) {
    const response = await axios({
      method: "GET",
      url: `${baseUrl}get_topscorers&league_id=${league_id}&APIkey=${apiKey}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
};

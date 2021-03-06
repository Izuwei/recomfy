import { getUuid } from "./uuid";
import axios from "axios";

import config from "../../config.json";

export const getBookmarks = async () => {
  let uniqueId = await getUuid();

  try {
    const res = await axios.get(
      config.api_url + ":" + config.api_port + "/recommendation/getBookmarks",
      {
        params: {
          userId: uniqueId,
        },
      }
    );

    var data = [];
    for (const item of res.data) {
      let split = item.itemId.split("_");
      let category = split[0];
      let id = split.slice(1).join("_");
      let detail = null;
      switch (category) {
        case "movie":
          detail = await get_movie_detail(id);
          break;
        case "serial":
          detail = await get_serial_detail(id);
          break;
        case "game":
          detail = await get_game_detail(id);
          break;
        case "book":
          detail = await get_book_detail(id);
          break;
        case "anime":
          detail = await get_anime_detail(id);
          break;
        case "manga":
          detail = await get_manga_detail(id);
          break;
        default:
          console.log("error - unknown category");
      }
      if (detail) {
        data.push({
          key: id,
          type: category,
          title: detail.name,
          image: detail.image,
          description: detail.description,
          rating: detail.rating + "/" + detail.rating_top,
        });
      }
    }
    return data;
  } catch (err) {
    return [];
  }
};

export const getRecommendations = async () => {
  let uniqueId = await getUuid();
  const categories = ["movie", "serial", "game", "book", "anime", "manga"];
  let data_out = {};

  for (const category of categories) {
    try {
      const res = await axios.get(
        config.api_url +
          ":" +
          config.api_port +
          "/recommendation/getRecommendations",
        {
          params: {
            userId: uniqueId,
            category: category,
          },
        }
      );
      var data = [];
      for (const item of res.data.recomms) {
        let split = item.id.split("_");
        let category = split[0];
        let id = split.slice(1).join("_");
        let detail = null;
        switch (category) {
          case "movie":
            detail = await get_movie_detail(id);
            break;
          case "serial":
            detail = await get_serial_detail(id);
            break;
          case "game":
            detail = await get_game_detail(id);
            break;
          case "book":
            detail = await get_book_detail(id);
            break;
          case "anime":
            detail = await get_anime_detail(id);
            break;
          case "manga":
            detail = await get_manga_detail(id);
            break;
          default:
            console.log("error - unknown category");
        }
        if (detail) {
          data.push({
            key: id,
            type: category,
            title: detail.name,
            image: detail.image,
            description: detail.description,
            rating: detail.rating + "/" + detail.rating_top,
          });
        }
      }
      data_out[category] = data;
    } catch (err) {
      data_out[category] = [];
    }
  }
  return data_out;
};

async function get_movie_detail(id) {
  try {
    const res = await axios.get(
      config.api_url + ":" + config.api_port + "/movies/" + id
    );
    return res.data;
  } catch (err) {
    return null;
  }
}

async function get_serial_detail(id) {
  try {
    const res = await axios.get(
      config.api_url + ":" + config.api_port + "/serials/" + id
    );
    return res.data;
  } catch (err) {
    return null;
  }
}

async function get_game_detail(id) {
  try {
    const res = await axios.get(
      config.api_url + ":" + config.api_port + "/games/" + id
    );
    return res.data;
  } catch (err) {
    return null;
  }
}

async function get_book_detail(id) {
  try {
    const res = await axios.get(
      config.api_url + ":" + config.api_port + "/books/" + id
    );
    return res.data;
  } catch (err) {
    return null;
  }
}

async function get_anime_detail(id) {
  try {
    const res = await axios.get(
      config.api_url + ":" + config.api_port + "/anime/" + id
    );
    return res.data;
  } catch (err) {
    return null;
  }
}

async function get_manga_detail(id) {
  try {
    const res = await axios.get(
      config.api_url + ":" + config.api_port + "/manga/" + id
    );
    return res.data;
  } catch (err) {
    return null;
  }
}

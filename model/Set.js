/* 
Description: Create set
Docs: https://galeva.com/docs.html
Author: Peter Joy
Created: March 19, 2020
 */

const axios = require("axios");
const path = require("./BasePath");

let methods = {
  create: async function(accessToken, body) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken
        }
      };
      return await axios.post(
        path.getBasePath() + "/rows/set",
        body,
        config
      );
    } catch (error) {
      console.log("create set catch " + error);
      if (error.response) {
        return await error.response;
      } else {
        throw error;
      }
    }
  },
  get: async function(accessToken, batchSize, dataId, startsFrom) {
    try {
      const params = {
        batchSize: batchSize,
        dataId: dataId,
        startsFrom: startsFrom
      };
      const config = {
        headers: { 
          Authorization: accessToken 
        },
        params: params
      };
      return await axios.get(path.getBasePath() + "/rows/set", config);
    } catch (error) {
      console.log("get set catch " + error);
      if (error.response) {
        return await error.response;
      } else {
        throw error;
      }
    }
  }
};

module.exports = methods;

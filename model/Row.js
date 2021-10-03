/* 
Description: Row - get, create, update, delete
Docs: https://galeva.com/docs.html
Author: Peter Joy
Created: March 19, 2020
 */

const axios = require("axios");
const path = require("./BasePath");

let methods = {
  get: async function(accessToken, entity, rowid, attributes) {
    try {
      const params = {
        entity: entity,
        rowid: rowid,
        attributes: attributes
      };
      const config = {
        headers: { 
          Authorization: accessToken 
        },
        params: params
      };
      return await axios.get(path.getBasePath() + "/row", config);
    } catch (error) {
      console.log("row get catch " + error);
      if (error.response) {
        return await error.response;
      } else {
        throw error;
      }
    }
  },
  create: async function(accessToken, body) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken
        }
      };
      return await axios.post(
        path.getBasePath() + "/row",
        body,
        config
      );
    } catch (error) {
      console.log("create row catch " + error);
      if (error.response) {
        return await error.response;
      } else {
        throw error;
      }
    }
  },
  update: async function(accessToken, body) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken
        }
      };
      return await axios.put(
        path.getBasePath() + "/row",
        body,
        config
      );
    } catch (error) {
      console.log("put row catch " + error);
      if (error.response) {
        return await error.response;
      } else {
        throw error;
      }
    }
  },
  delete: async function(accessToken, entity, rowid) {
    try {
      const params = {
        entity: entity,
        rowid: rowid
      };
      const config = {
        headers: { 
          Authorization: accessToken,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        params: params
      };
      return await axios.delete(path.getBasePath() + "/row", config);
    } catch (error) {
      console.log("row delete catch " + error);
      if (error.response) {
        return await error.response;
      } else {
        throw error;
      }
    }
  }
};

module.exports = methods;

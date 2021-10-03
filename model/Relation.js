/* 
Description: Relation - get relation, link, unlink
Docs: https://galeva.com/docs.html
Author: Sharon Xavier
Created: March 19, 2020
 */

const axios = require("axios");
const path = require("./BasePath");

let methods = {
  definition: async function(accessToken, entity1, entity2) {
    try {
      const params = {
        entity1: entity1,
        entity2: entity2
      };
      const config = {
        headers: {
          Authorization: accessToken 
        },
        params: params
      };
      return await axios.get(path.getBasePath() + "/relation/definition", config);
    } catch (error) {
      console.log("relation definition catch " + error);
      if (error.response) {
        return await error.response;
      } else {
        throw error;
      }
    }
  },
  link: async function(accessToken, body) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken
        }
      };
      return await axios.post(
        path.getBasePath() + "/relation/link",
        body,
        config
      );
    } catch (error) {
      console.log("link catch " + error);
      if (error.response) {
        return await error.response;
      } else {
        throw error;
      }
    }
  },
  unlink: async function(accessToken, body) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken
        }
      };
      let res = await axios.post(
        path.getBasePath() + "/relation/unlink",
        body,
        config
      );
      return await res;
    } catch (error) {
      console.log("unlink catch " + error);
      if (error.response) {
        return await error.response;
      } else {
        throw error;
      }
    }
  }
};
module.exports = methods;

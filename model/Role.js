/* 
Description: Role - get and change
Docs: https://galeva.com/docs.html
Author: Sharon Xavier
Created: March 19, 2020
 */

const qs = require("qs");
const axios = require("axios");
const path = require("./basePath");

let methods = {
  get: async function(accessToken) {
    try {
      const config = {
        headers: {
          Authorization: accessToken
        }
      };
      return await axios.get(path.getBasePath() + "/role", config);
    } catch (error) {
      console.log("login catch " + error);
      if (error.response) {
        return await error.response;
      } else {
        throw error;
      }
    }
  },
  change: async function(accessToken, newRole) {
    try {
        const params = {
            role: newRole,
          };
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: accessToken
        }
      };
      return await axios.put(path.getBasePath() + "/role", qs.stringify(params), config);
    } catch (error) {
      console.log("login catch " + error);
      if (error.response) {
        return await error.response;
      } else {
        throw error;
      }
    }
  }
};
module.exports = methods;

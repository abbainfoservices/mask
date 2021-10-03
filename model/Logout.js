/* 
Description: Logout
Docs: https://galeva.com/docs.html
Author: Sharon Xavier
Created: March 19, 2020
 */

const qs = require("qs");
const axios = require("axios");
const path = require("./basePath");

let methods = {
  logout: async function(accessToken) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: accessToken
        }
      };

      return await axios.post(path.getBasePath() + "/logout", "", config);
    } catch (error) {
      console.log("error in logout function" + error);
    }
  }
};
module.exports = methods;

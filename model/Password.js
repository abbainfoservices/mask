/* 
Description: Password
Docs: https://galeva.com/docs.html
Author: Sharon Xavier
Created: March 19, 2020
 */

const qs = require("qs");
const axios = require("axios");
const path = require("./basePath");

let methods = {
  resetPassword: async function(email, password, newPassword) {
    try {
      const body = {
        email: email,
        password: password,
        newPassword: newPassword
      };

      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      };

      return await axios.put(
        path.getBasePath() + "/password",
        qs.stringify(body),
        config
      );
    } catch (error) {
      if (error.response) {
        return await error.response;
      }
    }
  }
};
module.exports = methods;

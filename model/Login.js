/* 
Description: Login
Docs: https://galeva.com/docs.html
Author: Sharon Xavier
Created: March 19, 2020
 */

const qs = require("qs");
const axios = require("axios");
const path = require("./basePath");

let methods = {
  login: async function(email, password) {
    try {
      const body = {
        email: email,
        password: password
      };

      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      };

      return await axios.post(
        path.getBasePath() + "/login",
        qs.stringify(body),
        config
      );
    } catch (error) {
      console.log("login catch " + error);
      if (error.response) {
        return await error.response;
      } else if (error.address) {
        return await {
          data: {
            statuscode: 401,
            message: "Failure. Server Not Found",
            status: "Unauthorized"
          }
        };
      } else {
        throw error;
      }
    }
  }
};

module.exports = methods;

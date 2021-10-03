/* 
Description: Base path
Docs: https://galeva.com/docs.html
Author: Sharon Xavier
Created: March 19, 2020
 */

const basePath = 'https://api.galeva.com/v1.0';

let methods = {
    getBasePath: function () {
        return basePath;
    },
    isValidUrl: function ()
    {
        return true;
    }
};
module.exports = methods;


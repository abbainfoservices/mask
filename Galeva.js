/* 
Author: Peter Joy
Description: Export Galeva's Node functions
Created: March 19, 2020
 */

const path = require("./model/BasePath");
const login = require("./model/Login");
const logout = require("./model/Logout");
const password = require("./model/Password");
const role = require("./model/Role");
const relation = require("./model/Relation");
const row = require("./model/Row");
const entity = require("./model/Entity");
const slice = require("./model/Slice");
const page = require("./model/Page");
const set = require("./model/Set");
const transaction = require("./model/Transaction");

module.exports.basePath = path.getBasePath;
module.exports.login = login.login;
module.exports.logout = logout.logout;
module.exports.password = password.resetPassword;
module.exports.getRole = role.get;
module.exports.changeRole = role.change;
module.exports.relationDefinition = relation.definition;
module.exports.link = relation.link;
module.exports.unlink = relation.unlink;
module.exports.getRow = row.get;
module.exports.createRow = row.create;
module.exports.updateRow = row.update;
module.exports.deleteRow = row.delete;
module.exports.entityDefinition = entity.definition;
module.exports.slice = slice.slice;
module.exports.page = page.page;
module.exports.createSet = set.create;
module.exports.getSet = set.get;
module.exports.transaction = transaction.transaction;
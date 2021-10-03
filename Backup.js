const galeva = require("./Galeva");
const plan = require("./BackupPlan");

async function backup() {
  console.log(await plan.get());
}

backup();

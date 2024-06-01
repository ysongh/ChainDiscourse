const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ChainDiscourseModule", (m) => {
  const chainDiscourse = m.contract("ChainDiscourse");

  return { chainDiscourse };
});

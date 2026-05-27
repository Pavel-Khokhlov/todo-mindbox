// config-overrides.js
// Отключаем Babel для этого файла
/* eslint-disable */
// @ts-nocheck
const path = require("path");
const { override, addWebpackModuleRule } = require("customize-cra");

const environment = process.env.NODE_ENV || "development";
const isProduction = environment === "production";

// Используем PUBLIC_URL из переменных окружения
const publicUrl =
  process.env.PUBLIC_URL || "/";

module.exports = override((config) => {
  config.output.publicPath = publicUrl;

  const buildPaths = {
    development: "build-development",
    staging: "build-staging",
    production: "build",
  };
  config.output.path = path.resolve(
    __dirname,
    buildPaths[environment] || "build",
  );

  // Linaria rule
  const linariaRule = {
    test: /\.(js|jsx|ts|tsx)$/,
    exclude: /node_modules/,
    use: [
      {
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
        },
      },
      {
        loader: "@linaria/webpack-loader",
        options: {
          sourceMap: !isProduction,
          cacheDirectory: "src/.linaria_cache",
          displayName: environment === "development",
        },
      },
    ],
  };

  config.module.rules.push(linariaRule);

  console.log("═══════════════════════════════");
  console.log(`🔨 Mode: ${environment}`);
  console.log(`📂 Output: ${config.output.path}`);
  console.log(`🔗 Using HashRouter (no path issues)`);
  console.log("═══════════════════════════════");

  return config;
});

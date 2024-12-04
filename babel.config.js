module.exports = {
  presets: ["babel-preset-expo"], // Keep the Expo preset
  plugins: [
    [
      "module:react-native-dotenv",
      {
        moduleName: "@env", // Import variables using @env
        path: ".env", // Path to your .env file
        blacklist: null, // Deprecated; remove or use blocklist
        whitelist: null, // Deprecated; remove or use allowlist
        blocklist: null, // Correct usage; specify variables to block (if needed)
        allowlist: null, // Correct usage; specify variables to allow (if needed)
        safe: false, // Whether to check for a .env.example file
        allowUndefined: true, // Allow undefined variables (set to false if you want strict validation)
      },
    ],
  ],
};
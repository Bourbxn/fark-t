module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-theme": "#1C6758",
        "secondary-theme": "#3D8361",
        "third-theme": "#D6CDA4",
        "fourth-theme": "#EEF2E6",
      },
    },
  },
  daisyui: {
    themes: false,
  },
  plugins: [require("daisyui")],
};

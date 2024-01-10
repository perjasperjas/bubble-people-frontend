/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#1280ab",
        "main-glow": "#9eddf6",
        button: "#bceb21",
        buttondark: "#aad422",
        black: "#0f0e15",
        "bg-blue": "#0b0b0c",
        headergradientto: "#4f9b85",
      },
      keyframes: {
        rotateDesktop: {
          "0%": { transform: "perspective(640px) rotate3d(0, 1, 0, 0deg)" },
          "50%": { transform: "perspective(640px) rotate3d(0, 1, 0, 180deg)" },
          "100%": { transform: "perspective(640px) rotate3d(0, 1, 0, 360deg)" },
        },
        rotateMobile: {
          "0%": { transform: "perspective(320px) rotate3d(0, 1, 0, 0deg)" },
          "50%": { transform: "perspective(320px) rotate3d(0, 1, 0, 180deg)" },
          "100%": { transform: "perspective(320px) rotate3d(0, 1, 0, 360deg)" },
        },
        brightnessPulse: {
          "0%, 100%": { filter: "brightness(1)" },
          "50%": { filter: "brightness(0)" },
        },
        brightnessPulseAntiPhase: {
          "0%, 100%": { filter: "brightness(0)" },
          "50%": { filter: "brightness(1)" },
        },
      },
      animation: {
        spinDesktop: "rotateDesktop 16s linear infinite",
        spinMobile: "rotateMobile 16s linear infinite",
        pulseBrightness: "brightnessPulse 16s linear infinite",
        pulseBrightnessAntiPhase:
          "brightnessPulseAntiPhase 16s linear infinite",
      },
      fontFamily: {
        title: ["Big Shoulders Text", "sans-serif"],
        main: ["Rajdhani", "sans-serif"],
        bubble: ["Rubik Bubbles", "sans-serif"],
        dirt: ["Rubik Dirt", "sans-serif"],
      },
    },
    animation: {},
  },
  plugins: [],
};

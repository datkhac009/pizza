/** @type {import('tailwindcss').Config} */
export default {
  content: [
    //// Nơi Tailwind quét className
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // toàn bộ src
  ],
  // Nơi định nghĩa theme, colors, fonts, spacing, v.v
  theme: {
    //nghĩa là “mở rộng thêm, không ghi đè”.
    extend: {
      //tạo font mới tên là font-pizza
      fontFamily: {
        pizza: "Roboto Mono, monospace",
      },
    },
  },
  plugins: [], //// Plugin mở rộng tính năng
};

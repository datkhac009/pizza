/** @type {import("prettier").Config} */
export default {
  plugins: ["prettier-plugin-tailwindcss"],
  // Tuỳ chọn: sắp xếp cả className & class
  tailwindAttributes: ["className", "class"],
};
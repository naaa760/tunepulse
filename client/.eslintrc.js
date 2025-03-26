module.exports = {
  extends: ["next/core-web-vitals"],
  rules: {
    // Disable the img element warning since we're using standard HTML in some places
    "@next/next/no-img-element": "off",
  },
};

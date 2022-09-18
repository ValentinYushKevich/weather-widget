const dewPoint = (t, h) => {
  return (17.27 * t) / (237.7 + t) + Math.log(h / 100);
};
export { dewPoint };

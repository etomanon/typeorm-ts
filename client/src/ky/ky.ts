import kyDefault from "ky";

const ky = kyDefault.extend({
  prefixUrl: "/api/",
  timeout: 20000,
});

export default ky;

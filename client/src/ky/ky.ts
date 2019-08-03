import kyDefault from 'ky';

const ky = kyDefault.extend({
  prefixUrl: "/api/",
})

export default ky;
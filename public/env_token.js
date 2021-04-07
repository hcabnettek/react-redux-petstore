(function (window) {
  window.__env = window.__env || {};

  window.__env.features = {
    storage: "${FEATURE_STORAGE}",
    timeToLive: "${FEATURE_TIME_TO_LIVE}",
    testing: "${FEATURE_TESTING}",
    multiCloud: "${FEATURE_MULTI_CLOUD}",
  };
})(this);

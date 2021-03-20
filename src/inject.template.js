window.injectedEnv = {
  NODE_ENV: '${NODE_ENV}',
  RENDER_URL: '${RENDER_URL}',
};

function buildConfig(env) {
  if (!env) {
    env = (process || {}).env || {};
  }
  return {
    NODE_ENV: `${env.NODE_ENV}`,
    RENDER_URL: `${env.RENDER_URL}`,
  };
}

export default { buildConfig };

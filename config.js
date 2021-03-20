// window.injectedEnv = {
//     NODE_ENV: '${NODE_ENV}',
//     RENDER_URL: '${RENDER_URL}',
// };

function buildConfig(r) {
  try {
    var env = (process || {}).env || {};
    // if(!env) {
    //     env = (process||{}).env || {};
    // }
    return {
      NODE_ENV: `${env.NODE_ENV}`,
      RENDER_URL: `${env.RENDER_URL}`,
    };
  } catch (e) {
    r.return(400, e);
  }
}

export default { buildConfig };

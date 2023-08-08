const axios = require('axios');

function saveTrend(siteName) {
  axios.post(`${process.env.UPDATE_TREND_URL}${siteName}`, {});    
}

saveTrend('zenn');
saveTrend('qiita');
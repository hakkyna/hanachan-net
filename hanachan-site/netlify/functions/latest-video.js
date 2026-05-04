// YouTubeの最新動画を取得するNetlify Function
// 30分ごとにキャッシュされます（アクセスが増えても安心）

const https = require('https');

exports.handler = async () => {
  try {
    const xml = await fetchUrl(
      'https://www.youtube.com/feeds/videos.xml?channel_id=UCaPZr0WT-yeB7Cjw2upNd9Q'
    );

    // 最初の動画IDを取得
    const videoIdMatch = xml.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
    if (!videoIdMatch) throw new Error('動画が見つかりませんでした');
    const videoId = videoIdMatch[1];

    // 最初のエントリからタイトルを取得
    const entryMatch = xml.match(/<entry>([\s\S]*?)<\/entry>/);
    const titleMatch = entryMatch ? entryMatch[0].match(/<title>([^<]+)<\/title>/) : null;
    const title = titleMatch ? titleMatch[1] : '';

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=1800', // 30分キャッシュ
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        videoId,
        title,
        thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        url: `https://www.youtube.com/watch?v=${videoId}`
      })
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message })
    };
  }
};

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

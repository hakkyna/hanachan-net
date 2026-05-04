export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/latest-video') {
      try {
        const res = await fetch(
          'https://www.youtube.com/feeds/videos.xml?channel_id=UCaPZr0WT-yeB7Cjw2upNd9Q',
          { headers: { 'User-Agent': 'Mozilla/5.0' } }
        );
        const xml = await res.text();

        const videoIdMatch = xml.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
        if (!videoIdMatch) throw new Error('動画が見つかりません');
        const videoId = videoIdMatch[1];

        const entryMatch = xml.match(/<entry>([\s\S]*?)<\/entry>/);
        const titleMatch = entryMatch ? entryMatch[0].match(/<title>([^<]+)<\/title>/) : null;
        const title = titleMatch ? titleMatch[1] : '';

        return new Response(JSON.stringify({
          videoId,
          title,
          thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
          url: `https://www.youtube.com/watch?v=${videoId}`
        }), {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=1800',
            'Access-Control-Allow-Origin': '*'
          }
        });
      } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
      }
    }

    return env.ASSETS.fetch(request);
  }
};

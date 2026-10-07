export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Range');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const { url, filename, format } = req.query;
  const mediaUrl = typeof url === 'string' ? decodeURIComponent(url) : '';
  const safeFilename = typeof filename === 'string' ? decodeURIComponent(filename) : `quicktok_video.${format || 'mp4'}`;

  if (!mediaUrl || !mediaUrl.startsWith('http')) {
    return res.status(400).json({ error: 'Invalid or missing media URL' });
  }

  try {
    const upstreamRes = await fetch(mediaUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Referer': 'https://www.tiktok.com/',
      },
    });

    if (!upstreamRes.ok || !upstreamRes.body) {
      // Direct redirect fallback: user browser downloads the full file directly
      return res.redirect(302, mediaUrl);
    }

    const contentType = upstreamRes.headers.get('content-type') || (format === 'mp3' ? 'audio/mpeg' : 'video/mp4');
    const contentLength = upstreamRes.headers.get('content-length');

    // Never return HTML error as a video
    if (contentType.includes('text/html')) {
      return res.redirect(302, mediaUrl);
    }

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${safeFilename}"`);
    if (contentLength) {
      res.setHeader('Content-Length', contentLength);
    }

    const buffer = await upstreamRes.arrayBuffer();
    return res.status(200).send(Buffer.from(buffer));
  } catch {
    // If proxying fails or times out, redirect directly to CDN for full media download
    return res.redirect(302, mediaUrl);
  }
}

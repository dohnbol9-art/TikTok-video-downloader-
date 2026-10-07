export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  let targetUrl = '';
  if (req.method === 'POST') {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    targetUrl = body.url || '';
  } else {
    targetUrl = req.query?.url || '';
  }

  if (!targetUrl || typeof targetUrl !== 'string') {
    return res.status(400).json({
      success: false,
      error: { code: 'INVALID_URL', message: 'Please provide a valid TikTok URL.' },
    });
  }

  try {
    const upstreamRes = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(targetUrl)}&hd=1`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      },
    });

    const json = await upstreamRes.json();
    if (json.code === 0 && json.data) {
      const d = json.data;
      const formats = [];
      if (d.hdplay || d.play) {
        formats.push({
          id: 'mp4_hd',
          format: 'MP4',
          quality: '1080p HD (No Watermark)',
          type: 'video',
          downloadUrl: d.hdplay || d.play,
          fileSize: d.size ? `${(d.size / 1024 / 1024).toFixed(1)} MB` : undefined,
          isDirectDownloadAvailable: true,
        });
        formats.push({
          id: 'mp4_sd',
          format: 'MP4',
          quality: 'Standard Quality (Fast)',
          type: 'video',
          downloadUrl: d.play,
          fileSize: d.size ? `${(d.size / 1024 / 1024).toFixed(1)} MB` : undefined,
          isDirectDownloadAvailable: true,
        });
      }
      if (d.music) {
        formats.push({
          id: 'mp3',
          format: 'MP3',
          quality: 'Original Audio (HQ)',
          type: 'audio',
          downloadUrl: d.music,
          isDirectDownloadAvailable: true,
        });
      }

      return res.status(200).json({
        success: true,
        data: {
          id: d.id || `${Date.now()}`,
          url: targetUrl,
          title: d.title || 'TikTok Video',
          author: {
            username: d.author?.unique_id || 'user',
            nickname: d.author?.nickname || d.author?.unique_id || 'TikTok Creator',
            avatarUrl: d.author?.avatar,
          },
          thumbnailUrl: d.cover || d.origin_cover,
          durationFormatted: d.duration ? `${Math.floor(d.duration / 60)}:${(d.duration % 60).toString().padStart(2, '0')}` : undefined,
          formats,
          isDownloadReady: true,
          providerType: 'configured',
        },
      });
    }

    return res.status(400).json({
      success: false,
      error: { code: 'EXTRACT_FAILED', message: json.msg || 'Unable to retrieve media from URL.' },
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: err?.message || 'Processing server error.' },
    });
  }
}

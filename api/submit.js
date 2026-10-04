export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const { date, time, place } = req.body || {};
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date || '') || !/^\d{2}:\d{2}$/.test(time || '')) {
      return res.status(400).json({ error: 'Invalid date/time' });
    }
    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_OWNER || 'namvtk34-boop';
    const repo = process.env.GITHUB_REPO || 'bbq-date-invitation';
    if (!token) return res.status(500).json({ error: 'Server not configured' });

    const [y,m,d] = date.split('-');
    const title = `💕 BBQ Date: ${d}/${m}/${y} ${time}`;
    const body = `## 💗 Em đồng ý đi ăn thịt nướng!\n\n- 📅 Ngày: **${d}/${m}/${y}**\n- ⏰ Giờ: **${time}**\n- 📍 Địa điểm: **${place || 'Quán gần nhà em'}**\n\n> Được rùiiiiiiii 😌💕`;
    const gh = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, {
      method: 'POST',
      headers: { 'Accept':'application/vnd.github+json','Authorization':`Bearer ${token}`,'X-GitHub-Api-Version':'2022-11-28','Content-Type':'application/json' },
      body: JSON.stringify({ title, body })
    });
    if (!gh.ok) return res.status(502).json({ error: 'GitHub request failed', detail: await gh.text() });
    const issue = await gh.json();
    return res.status(200).json({ ok: true, issue_number: issue.number });
  } catch (e) {
    return res.status(500).json({ error: 'Unexpected server error' });
  }
}

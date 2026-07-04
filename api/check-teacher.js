module.exports = async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "POST 요청만 사용할 수 있습니다." });
  }

  try {
    const expectedPassword = process.env.TEACHER_PASSWORD;

    if (!expectedPassword) {
      return res.status(500).json({
        ok: false,
        message: "Vercel 환경변수 TEACHER_PASSWORD가 설정되지 않았습니다."
      });
    }

    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const password = String(body.password || "");

    if (password === expectedPassword) {
      return res.status(200).json({ ok: true });
    }

    return res.status(401).json({ ok: false, message: "강사 비밀번호가 맞지 않습니다." });
  } catch (error) {
    return res.status(400).json({ ok: false, message: "요청을 처리할 수 없습니다." });
  }
};

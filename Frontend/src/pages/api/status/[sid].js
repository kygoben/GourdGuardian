import excuteQuery from "/lib/db.js";

export default async function handler(req, res) {
  const { sid } = req.query;

  const time = new Date().toISOString().slice(0, 19).replace("T", " ");

  if (req.method === "POST") {

    
    const s = await excuteQuery({
      query: "SELECT * FROM sstatus where sid = ?;",
      values: [sid],
    });

    if (s[0].carving_start) {
      const result = await excuteQuery({
        query: 'UPDATE sstatus SET carving_end="' + time + '" WHERE sid=?;',
        values: [sid],
      });
    } else if (s[0].tracing_end) {
      const result = await excuteQuery({
        query: 'UPDATE sstatus SET carving_start="' + time + '" WHERE sid=?;',
        values: [sid],
      });
    } else if (s[0].tracing_start) {
      const result = await excuteQuery({
        query: 'UPDATE sstatus SET tracing_end="' + time + '" WHERE sid=?;',
        values: [sid],
      });
    } else if (s[0].cutting) {
      const result = await excuteQuery({
        query: 'UPDATE sstatus SET tracing_start="' + time + '" WHERE sid=?;',
        values: [sid],
      });
    }

    res.status(200).json({ stage: "3", status: "2" });    // console.log(result);
  } else {
    try {
      const result = await excuteQuery({
        query: "SELECT * FROM sstatus where sid = ?;",
        values: [sid],
      });
      res.status(200).json({ stage: "3", status: "2" });
    } catch (err) {
      console.log(err);
    }
  }
}

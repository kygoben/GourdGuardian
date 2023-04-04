import excuteQuery from "/lib/db.js";

export default async function handler(req, res) {
  const { sid } = req.query;

  try {
    const result = await excuteQuery({
      query: "SELECT * FROM status where sid = ?;",
      values: [sid],
    });
    // console.log(result);
    res.status(200).json({"stage":"3", "status": "2"});
  } catch (err) {
    console.log(err);
  }
}

import excuteQuery from "/lib/db.js";

export default async function handler(req, res) {
  const { sid } = req.query;

  if (req.method === "POST") {
    const result = await excuteQuery({
      query:
        'INSERT INTO `stencildb`.`status` (`sid`, `printing`, `cutting`, `tracing_start`) VALUES ("1-1", 1, 1, 1);',
      values: [sid],
    });
  } else {
    try {
      const result = await excuteQuery({
        query:
          "SELECT S.sid, S.title, C.cname FROM stencils S INNER JOIN category C ON S.cid=C.cid where S.sid = ?;",
        values: [sid],
      });
      // console.log(result);
      res.status(200).json(result[0]);
    } catch (err) {
      console.log(err);
    }
  }
}

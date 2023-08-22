import excuteQuery from "/lib/db.js";
// import { supabase } from "../utils/supabase";


import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://clxlobjerfduuexkucih.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

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

      let stage = await excuteQuery({
        query: "SELECT password FROM users where uid = admin;"
      });

      stage = 3;
      // res.status(200).json({ stage: "3", status: "2" });
      // console.log(result);
      console.log(result[0]);

      var printing = result[0]['printing'];
      var cutting = result[0]['cutting'];
      var tracing_start =  result[0]['tracing_start'];
      var tracing_end =  result[0]['tracing_end'];
      var tracing_confirmed = result[0]['tracing_confirmed'];
      var carving_start =  result[0]['carving_start'];
      var carving_end =  result[0]['carving_end'];
      // const carving_confirmed = result[0]['carving_confirmed'];
	    var resStage = 0;
	    var resStatus = 0;

      // Stage: 1 print, 2 cut, 3 trace, 4 carve
      // Status: 1 not started, 2 started, 3 finished
      // finished tracing
      // next stage carving
      if (stage == 4) {
        resStage = 4;
        if (carving_end)
          resStatus = 3;
        else if (carving_start)
          resStatus = 2;
        else
          resStatus = 1;
        // finished cutting
        // next stage tracing
      } else if (stage == 3) {
        resStage = 3;
        if (tracing_end)
          resStatus = 3;
        else if (tracing_start)
          resStatus = 2;
        else
          resStatus = 1;
      // finished printing
      // next stage cutting
      } else if (stage == 2) {
        resStage = 2; 
      } else {
        resStage = 1;
      }

      // when admin run the app => finish printing => insert all the record with the printed status
      // do the same for the cutting
      // if record is not found => create the status
      var returnResult = {"stage" : resStage, "status" : resStatus};
      console.log(returnResult);

      
      let { data: stencils, error } = await supabase
        .from('stencils')
        .select('sid')

      console.log(data);
      res.status(200).json(data);
      
    } catch (err) {
      console.log(err);
    }
  }
}

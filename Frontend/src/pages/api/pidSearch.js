const todos = [
    {
      id: 1,
      todo: "Do something nice for someone I care about",
      completed: true,
      userId: 26,
    },
    {
      id: 2,
      todo: "Memorize the fifty states and their capitals",
      completed: false,
      userId: 48,
    },
    // other todos
  ];
 
export function handler(req, res) {
  const { method } = req;
 
  switch (method) {
    case "GET":
      res.status(200).json(todos);
      break;
    case "POST":
      const { todo, completed } = req.body;
      todos.push({
        id: todos.length + 1,
        todo,
        completed,
      });
      res.status(200).json(todos);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}




// import excuteQuery from "lib/db";

// export default async function handler(req, res) {
  
  
//   try {
//     console.log("req nom", req.body)
//   const result = await excuteQuery({
//       query: 'SELECT * FROM stencildb.stencils;',
//       values: [req.body.content],
//   });
//   console.log( "ttt",result );
// } catch ( error ) {
//   console.log( error );
// }
  
  
  // const { name, message } = req.body
  // try {
  //   // await handleFormInputAsync({ name, message })
  //   console.log("Test2");
  //   res.status(200).json()

  //   const result = await excuteQuery({
  //     query: 'SELECT * FROM stencildb.stencils;'
  // });
  
  // // console.log(result);
  //   // res.redirect(307, '/confirmPumpkin')
  // } catch (err) {
  //   res.status(500).send({ error: 'failed to fetch data' })
  // }
// }
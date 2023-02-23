

export default function handler(req, res) {
//        const result = excuteQuery({
//       query: 'SELECT * FROM stencildb.stencils limit 1;'
//   });
    res.status(200).json({ sid: '1-1', title: 'test1' });
  }


// // const todos = [
// //       {
// //         id: 1,
// //         todo: "Do something nice for someone I care about",
// //         completed: true,
// //         userId: 26,
// //       },
// //       {
// //         id: 2,
// //         todo: "Memorize the fifty states and their capitals",
// //         completed: false,
// //         userId: 48,
// //       },
// //       // other todos
// //     ];

//     export function handler(req, res) {

//           res.status(200).json({ text: 'Hello' });

//         //   const { method } = req;
//         //  
//         //   switch (method) {
//         //     case "GET":
//         //       res.status(200).json;
//         //       break;
//         //     case "POST":
//         //       const { todo, completed } = req.body;
//         //       todos.push({
//         //         id: todos.length + 1,
//         //         todo,
//         //         completed,
//         //       });
//         //       res.status(200).json(todos);
//         //       break;
//         //     default:
//         //       res.setHeader("Allow", ["GET", "POST"]);
//         //       res.status(405).end(`Method ${method} Not Allowed`);
//         //       break;
//         //   }
//         }
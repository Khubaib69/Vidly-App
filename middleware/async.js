// module.exports = function (handler) {
//     return async (req, res, next) => {
//         try {
//             await handler(req, res);
//         }
//         catch (ex) {
//             next(ex);
//         }
//     }
// }

// we just installed express-async-errors package that automatically does the above thing for us, which is to prevent ourselves from
// typing try and catch block so many times and call it in a single function and use it everywhere. express-async-errors package automatically
// does that for us.
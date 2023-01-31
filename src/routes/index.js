const apiV1 = require("express")();
const { router: bookRouter } = require("./book");
const { router: userRouter } = require("./users");

apiV1.use("/Book", bookRouter);
apiV1.use("/user", userRouter);

module.exports = { apiV1 };

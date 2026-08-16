const express = require("express");
const cors = require("cors");

require("dotenv").config();

const prisma =
    require("./config/prisma");

const earthquakeRoutes =
    require("./routes/earthquakeRoutes");

const riskRoutes = require(
    "./routes/risk.routes"
);

const userRoutes =
require("./routes/user.routes");

const riskResultRoutes =
require("./routes/riskResult.routes");

const authRoutes = require("./routes/auth.routes");


const app = express();

app.use(cors());
app.use(express.json());

app.get(
    "/users",
    async (req, res) => {

        const users =
            await prisma.user.findMany();

        res.json(users);
    }
);

app.use(

    "/api/users",

    userRoutes

);

app.use(
    "/earthquake",
    earthquakeRoutes
);

app.use(
    "/api/risk",
    riskRoutes
);

app.use(
    "/api/auth",
    authRoutes
);

app.use(

    "/api/risk-result",

    riskResultRoutes

);


app.get("/", (req, res) => {
    res.json({
        message:
            "DSS Disaster Early Warning API",
    });
});

const PORT =
    process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(
        `Server running on port ${PORT}`
    );
});
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const hpp = require('hpp');
const path = require("path")
const helmet = require('helmet');
const dotenv = require('dotenv');

const prod = process.env.NODE_ENV === 'production';
const db = require("./models");
const app = express();

const PORT = process.env.NODE_ENV === 'production' ? process.env.PORT : 8080

dotenv.config();
db.sequelize.sync();
// db.sequelize.sync({ force: true }); // 기존 데이터 다 날리고 새로만듬

// const cspOptions = {
//     directives: {
//         // 기본 옵션을 가져옵니다.
//         ...helmet.contentSecurityPolicy.getDefaultDirectives(),

//         "script-src": ["'self'", "*.kakao.com", "'unsafe-inline'"],

//     }
// }

if (prod) {
    // Helmet의 모든 기능 사용. (contentSecurityPolicy에는 custom option 적용)
    app.use(helmet({
        contentSecurityPolicy: false,
    }));
    app.use(hpp());
    app.use(morgan('combined'));
    app.use(cors({
        origin: 'https://waitinglist.iback.co',
        credentials: true,
    }));
} else {
    app.use(morgan('dev'));
    app.use(cors({
        origin: 'http://localhost:8080',
        credentials: true,
    }));
}

app.use("/", express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get("/bigwavvAdmin", (req, res) => {
    return res.sendFile(path.join(__dirname, "pages/admin.html"))
})

app.post('/bigwavvAdmin', async (req, res) => {
    try {
        if(process.env.ADMIN_PASSWORD === req.body.password) {
            const waitingList = await db.WaitingList.findAll();
            return res.json({
                error: false,
                message: 'Success',
                list: waitingList
            })
        } else {
           return res.json({
                error: true,
                message: 'Passwords do not match'
            })
        }
    } catch(error) {
        console.log('bigwavvAdmin error : ', error)
        return res.json({
            error: true,
            message: "Server Error"
        })
    }
})


app.get("/", (req, res) => {
    return res.sendFile(path.join(__dirname, "pages/index.html"));
});

app.get('/waitinglist', (req, res) => {
    return res.sendFile(path.join(__dirname, "pages/share.html"))
})

app.get('/waitinglist/:id', async (req, res) => {
    try {
        const id = req.params.id
        if (!id) return res.json({ error: true, message: "Is Not Found" })
        
        const waitingList = await db.WaitingList.findOne({
            where: {
                id: id
            }
        })
        return res.json({
            error: false,
            message: "Success",
            list: waitingList
        })
    } catch (error) {
        console.error(error)
        res.json({
            error: true,
            message: "Server Error"
        })
    }    
})

app.get('/privacypolicy', (req, res) => {
    return res.sendFile(path.join(__dirname, "pages/privacypolicy.html"))
})



app.post('/create', async (req, res) => {
    try{
        const exWaitingList = await db.WaitingList.findOne({
            where: {
                email: req.body.email,
            }
        })

        if (exWaitingList) {
            return res.json({
                error: true,
                message: "이미 등록된 이메일 입니다."
            })
        }

        const waitingList = await db.WaitingList.create({
            name: req.body.name,
            email: req.body.email,
        })
        console.log(`create waitinglist : `, waitingList)
        return res.json({
            error: false,
            list: waitingList,
            message: "Success"
        })
    } catch (error) {
        console.error('Create Error: ', error)
        return res.json({
            error: true,
            message: "Server Error"
        })
    }
})

app.put('/update', async (req, res) => {
    try {
        await db.WaitingList.update(
            {
                name: req.body.name,
                email: req.body.email,
            },
            {
                where: {
                    id: req.body.id
                }
            }
        )

        // const list = {
        //     name: req.body.name,
        //     email: req.body.email,
        //     id: req.body.id
        // }

        res.json({
            error: false,
            message: "Update Success",
        })
    } catch (error) {
        console.error('Update Error : ', error)
        return res.json({
            error: true,
            message: "Server Error"
        })
    }
})


app.listen(PORT, () => {
    console.log(`백엔드 서버 ${PORT}번 포트에서 실행 중`);
});
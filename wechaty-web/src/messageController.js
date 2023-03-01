import express from "express"

const app = express()
const port = 3000

export class MessageController {
    init(bot){
        app.get('/send/:name/:msg', async (req, res) => {
            const name=req.params.name
            const msg=req.params.msg
            try {
                const contact = await bot.Contact.find({name: name});
                console.log(contact.say(msg));
                res.send("发送消息成功");
            } catch (e){
                res.send("发送消息失败,检查请求参数");
            }
        })
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
        app.use(function (req, res) {
            res.send("检查请求地址是否正确")
        });
    }
}




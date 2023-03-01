import {WechatyBuilder} from "wechaty";
import QRCode from "qrcode";
import {MessageController} from "./messageController.js"

const messageController = new MessageController();

const bot = WechatyBuilder.build({
    name: "wechat-assistant", // generate xxxx.memory-card.json and save login data for the next login
});

async function main() {
    bot
        .on("scan", async (qrcode, status) => {
            const url = `https://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`;
            console.log(`Scan QR Code to login: ${status}\n${url}`);
            console.log(
                await QRCode.toString(qrcode, {type: "terminal", small: true})
            );
        })
        .on("login", async (user) => {
            console.log(`User ${user} logged in`);
            messageController.init(bot);
            console.log("初始化接口完成")
            // chatGPTBot.setBotName(user.name());
            // await chatGPTBot.startGPTBot();
        })
        .on("message", async (message) => {
            if (message.text().startsWith("/ping ")) {
                // await message.say("pong");
                return;
            }
            try {
                console.log(`Message: ${message}`);
                // await chatGPTBot.onMessage(message);
            } catch (e) {
                console.error(e);
            }
        })
        .on("friendship",(friendship)=>{
            console.log("有新的好友申请，信息如下")
            console.log(friendship)
            console.log(friendship.type())
        })
    try {
        await bot.start();
    } catch (e) {
        console.error(
            `⚠️ Bot start failed, can you log in through wechat on the web?: ${e}`
        );
    }
}

main().then(r => {
    console.log("程序开始运行",r)
})
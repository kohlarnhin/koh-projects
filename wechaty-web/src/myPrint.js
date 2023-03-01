import express from "express"
import ipp from 'ipp'

const app = express()
const port = 3000

app.get('/hello', async (req, res) => {
    console.log("hello")
});
app.get('/print', async (req, res) => {
    const url = 'ipp://192.168.2.64:631/ipp/print';
    const document = Buffer.from('D:\\wechaty\\src\\042002100311-70018370.pdf');
    // Set the print job attributes
    const attributes = {
        'media': 'A4',  // Set the paper size
        'copies': '1',  // Set the number of copies
        'print-quality': 'normal'  // Set the print quality
    };
    // Send the print job to the printer
    ipp.request(url, {
        operation: 'Print-Job',
        data: document,
        attributes: attributes
    }, (err, res) => {
        if (err) {
            console.log("err")
            console.log(err)
            // Handle the error
        } else {
            console.log("res")
            console.log(res)
            // Print job was successful
        }
    })
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
app.use(function (req, res) {
    res.send("检查请求地址是否正确")
});




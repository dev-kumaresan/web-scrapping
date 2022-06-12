import axios from 'axios'
import express from 'express'
import cheerio  from 'cheerio'

const PORT = process.env.PORT || 5010
const  app = express()
axios('https://www.1tamilmv.cloud/')
.then(res =>{
    const htmlData = res.data
    const $ = cheerio.load(htmlData)
    const articles  = []
    $('.ipsWidget_inner ipsPad ipsType_richText',htmlData).each((index,element)=>{
        const title = $(element).children('').text()
        const titleURL = $(element).children('').attr('href')
        articles.push({
            title,
            titleURL
        })
    })
    console.log(articles)
}).catch(err => console.error(err))
app.listen(PORT,()=>console.log(`server started on port ${PORT}`))
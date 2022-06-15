import axios from 'axios'
import express from 'express'
import  cheerio  from 'cheerio'

const PORT = process.env.PORT || 5011
const  app = express()
axios('https://www.justwatch.com/in/movies')
.then(res =>{
    const htmlData = res.data
    const $ = cheerio.load(htmlData)
    const articles  = []
    $('.title-list-grid .title-list-grid__item',htmlData).each((index,element)=>{
        const titleURL = $(element).children('.title-list-grid__item--link').attr('href')
        articles.push({
            
            titleURL
        })
    })
    console.log(articles)
    app.get('/justwatch-movies',(req,res)=>{
            res.send(articles);
    })
}).catch(err => console.error(err))
app.listen(PORT,()=>console.log(`server started on port ${PORT}`))
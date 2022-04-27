var express = require("express");
var app = express();
const cors = require("cors");
var router = express.Router();
app.use(cors());
const dotenv = require("dotenv");
const axios = require("axios");
const PORT =8080;
const port = 8081;
const request=require('request');

dotenv.config();

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.raw());

app.set('data',[]);

app.get('/jiwon', async(req, res) => {
    console.log(req.body);
  try {
    const request_body = {
      startDate: "2017-01-01",
      endDate: "2017-04-30",
      timeUnit: "month",
      keywordGroups: [
        {
            groupName: "한글",
            keywords: [
              "한글",
              "korean"
            ]
          },
          {
            groupName: "영어",
            keywords: [
              "영어",
              "english"
            ]
          }
        ],
        device: "pc",
        ages: [
            "1",
            "2"
        ],
        gender: "f"
}

    const url = 'https://openapi.naver.com/v1/datalab/search';
    const headers =  {
      'Content-Type': 'application/json',
      'X-Naver-Client-Id': process.env.CLIENT_ID,
      'X-Naver-Client-Secret': process.env.CLIENT_SECRET,
    };
    const result = await axios.post(url,request_body,{
      headers:headers
    })
    console.log(result.data);
    return res.json(result.data);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

app.listen(8080, function() {
  console.log("start! express server on port 8080")
})
const PORT = process.env.PORT || 666;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const {
    response
} = require("express");
const {
    contains
} = require("cheerio/lib/static");

let reviews = [];

const app = express();
const reviewPlatforms = [{
        name: "Klanten Vertellen",
        adress: "https://www.klantenvertellen.nl/reviews/1035633/keukenstudio_dordrecht_nl"
    },
    {
        name: "Google",
        adress: "https://www.google.com/search?q=keukenstudio+dordrecht+reviews&oq=keukenstudio+dordrecht+reviews&aqs=chrome..69i57j69i60l2.4572j0j4&sourceid=chrome&ie=UTF-8#lrd=0x47c42f24cd67cfdb:0xd25fbfad59c1ae80,1,,,"
    },
    {
        name: "Facebook",
        adress: "https://klantenvertellen.nl"
    },
];

reviewPlatforms.forEach(reviewPlatform => { // /google, facebook en klantenvertellen
    axios.get(reviewPlatform.adress)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
    })
})

app.listen(PORT, () => console.log(`Server is running localhost:${PORT}`));



app.get("/", (req, res) => { // homepage
    res.set('Access-Control-Allow-Origin', '*');
    res.json("Welkom op mijn review API");
 
});

// app.get("/reviews", (req, res) => { // /reviews
//     axios
//         .get(
//             "https://www.klantenvertellen.nl/reviews/1035633/keukenstudio_dordrecht_nl?lang=nl&limit=100&pageNumber=0&filterRating=0&filterLocale=&filterDateScoreOrder=DATE_DESC"
//         )
//         .then((response) => {
//             const html = response.data;
//             const $ = cheerio.load(html);

//             app.get("/reviews/:keyWord", async (req, res) => {
//                 let keyWord = req.params.keyWord;
//                 console.log(keyWord);
                
//             });
//             $(`div.review:contains(${keyWord})`, html).each(function () {
//                 const title = $("h4", this).text();
//                 const reviewText = $("p.text.opinion", this).html();
//                 const rating = $("span", this).html();
//                 const reaction = $("div.review-response > p", this).text();
//                 const source = "Klanten Vertellen"

//                 reviews.push({
                    
//                         reviews: {
//                          review: 
//                            {
//                             title ,
//                             reviewText ,
//                             rating ,
//                             reaction ,
//                             source ,
//                            }
                           
//                         }
                       
//                 });
//             });
//             res.json(reviews.pop([]));
//             res.set('Access-Control-Allow-Origin', '*');
//             res.json(reviews);
//         })
//         .catch(function (err) {
//             console.log(err);
//         });
// });

app.get("/reviews/:keyWord", async (req, res) => { // /reviews/keyWord
    let keyWord = req.params.keyWord;
    console.log(keyWord);
    axios
        .get(
            "https://www.klantenvertellen.nl/reviews/1035633/keukenstudio_dordrecht_nl?lang=nl&limit=100&pageNumber=0&filterRating=0&filterLocale=&filterDateScoreOrder=DATE_DESC"
        )
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);

            $(`div.review:contains(${keyWord})`, html).each(function () {
                const title = $("h4", this).text();
                const reviewText = $("p.text.opinion", this).html();
                const rating = $("span", this).html();
                const reaction = $("div.review-response > p", this).text();
                const source = "Klanten Vertellen";
                const name = $("span.name-city",this).text();

                reviews.push({
                    
                        reviews: {
                         review: 
                           {
                            title ,
                            reviewText ,
                            rating ,
                            reaction ,
                            source ,
                            name,
                           }
                           
                        }
                       
                });
            });
            
            res.set('Access-Control-Allow-Origin', '*');
            res.json(reviews.reverse());
if (reviews[0] === reviews[0]){
    reviews = [];
};
            
        })
        
        .catch(function (err) {
            console.log(err);
        });

        
});
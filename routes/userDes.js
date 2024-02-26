const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
let url = `${process.env.BASE_URL}/admin/api/2024-01/products.json`;

router.get('/getdata', (req, res) => {
    axios.get(url)
        .then((response) => {
            const products = response.data.products;
            const parsedProducts = [];

            fs.writeFile('data.txt', ``, function (err) {
                if (err) throw err;
                console.log('cleaned!');
              });
            for (let product of products) {

                // const $ = cheerio.load(product.body_html);

                // const descriptionText = $('div.a-fixed-left-grid').text().trim();
                var descriptionText = product.body_html.replace(/<[^>]+>/g, '');

                if(descriptionText.toLowerCase().includes('four-month')
                ||descriptionText.toLowerCase().includes('4-month')
            ||descriptionText.toLowerCase().includes('four month')){


                    console.log(product.id);
                    fs.appendFile('data.txt', `${product.id}\n`, function (err) {
                        if (err) throw err;
                        console.log('Saved!');
                      });
                }
                // console.log("---------------------another----------------");

                parsedProducts.push(product);
            }

            fs.readFile('data.txt', 'utf8', function(err, data){
                // Display the file content
                console.log("File Data : "+`\n`+data);
            });

            // Send the modified products array in the response
            res.json(parsedProducts);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

module.exports = router;

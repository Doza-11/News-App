
const API_KEY = "daef703f4a264ab4a0ddec798334117a";
const url = "https://newsapi.org/v2/everything?q=";


const getNews = async(req,res) =>{

    console.log("GELLO");
    try {
        const _res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        const data = await _res.json();
        // console.log(data.articles);
        // bindData(data.articles);
        res.status(200).send(data.articles);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }

}

module.exports = getNews;
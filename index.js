const unirest = require('unirest');
const cheerio = require('cheerio');

const getPages = () => {
    let countPages = 30,
        pagePromises = [];
 
    while(countPages >= 0){

	    pagePromises.push(
	        unirest.get('https://spb.hh.ru/search/vacancy?L_is_autosearch=false&area=2&clusters=true&enable_snippets=true&text=Frontend+%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%87%D0%B8%D0%BA&page=' + countPages)
	    );

	    countPages--;

    }

    return Promise.all(pagePromises);
};

getPages().then((res) => {

	let artPrev = [];
	
	res.forEach(function(el) {

		const $ = cheerio.load(el.body);

		 $('.bloko-link.HH-LinkModifier').each(function(i, elem){
		 	
		 	var artItem = {
				title: $(this).text()
			}
		 		artPrev.push(artItem);
		 });

	});

	return artPrev;
	
}).then((res) => console.log(res));

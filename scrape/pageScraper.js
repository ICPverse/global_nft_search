const scraperObject = {
	//url: 'https://entrepot.app/marketplace/icsnakes', //ethflower',  icspliffsters'
	//url: 'https://skeh5-daaaa-aaaai-aar4q-cai.raw.ic0.app/#/collection/azumi/items',
	url: 'https://skeh5-daaaa-aaaai-aar4q-cai.raw.ic0.app/#/collection/avocado/items/',
	async scraper(browser){
		return new Promise(async (resolve, reject) => {
			try {
		let page = await browser.newPage();
		await page.setDefaultNavigationTimeout(0);
		console.log(`Searching NFTs on ${this.url}...`);
		console.log('Lots of data. This can and should take a while. Grab a coffee or something..');
		
		await page.goto(this.url,{
			waitUntil: 'networkidle0',
		  });
		  var xyz;
		if(this.url.includes("entrepot")){
		xyz = await page.evaluate(() => {
			
			var result = [];
			
			var num = document.querySelectorAll('div p.MuiTypography-root.MuiTypography-body1.MuiTypography-paragraph.MuiTypography-alignLeft'); 
			var strnum = num[0].textContent;
			var val = strnum.split(" ")[0];
			
			const delay = ms => new Promise(res => setTimeout(res, ms));
			delay(1000);
			var i = 0;
			while (i < (Number(val))/60){
				let next = document.querySelectorAll('li button.MuiButtonBase-root.MuiPaginationItem-root.MuiPaginationItem-page.MuiPaginationItem-sizeSmall');
			
			//result.push(next[6].textContent);
			let currentPage = document.evaluate(
				'//div/div/div/div/div/div/div/div/div/a/div',
				document,
				null,
				XPathResult.ANY_TYPE,
				null,
				);
			var element = currentPage.iterateNext();
			while  (element){
				//if (element.textContent != "" && i == 5){
					//result.push(element.textContent);
				//}
				if(element.textContent.includes("#7658P")){
					var rs = element.textContent;
					var nrr = rs.split("#")[0];
					var prc = rs.split("e")[1];
					//result.push(element.textContent);
					result.push(nrr);
					result.push(prc);
					return result;
				}
				element = currentPage.iterateNext();
			}
			next[next.length - 1].click();
			i++;
		}
		result.push("This NFT isn't listed for sale".concat(i.toString()));
			return result;
		})
	}
	else{
		xyz = await page.evaluate(() => {
	
	
			var result = [];
			
			
			var num = document.querySelectorAll('div.header div.market-tabbar-left div.flex-10 div.tip'); 
			var strnum = num[0].textContent;
			var val = strnum.split(" ")[0];
			
			const delay = ms => new Promise(res => setTimeout(res, ms));
			delay(1000);
			var i = 0;
			while (i < (Number(val))/20){
				let next = document.querySelectorAll('ul.ant-pagination.ant-pagination-mini.pagination li.ant-pagination-next');
			
			//result.push(next[6].textContent);
			let currentPage = document.evaluate(
				'//div/section/main/div/div/div/div/div/div/div',
				document,
				null,
				XPathResult.ANY_TYPE,
				null,
				);
			var element = currentPage.iterateNext();
			while  (element){
				//if (element.textContent != "" && i == 5){
					//result.push(element.textContent);
				//}
				if(element.textContent.includes("#3096") && element.textContent[element.textContent.length - 5] == '#'){
					//var rs = element.textContent;
					//var nrr = rs.split("#")[0];
					//var prc = rs.split("e")[1];
					
					if (element.parentNode.parentNode.textContent.replace(element.textContent,'').replace('Buy','').includes("arity")){
						for (var j = 0; j < element.parentNode.parentNode.childNodes.length; j++) {
							if ( element.parentNode.parentNode.childNodes[j].innerText != '' && element.parentNode.parentNode.childNodes[j].innerText != 'Buy') {
							  result.push(element.parentNode.parentNode.childNodes[j].innerText );
							  result.push(element.parentNode.parentNode.textContent.replace(element.textContent,'').replace('Buy','').replace(element.parentNode.parentNode.childNodes[j].innerText,''))
							}
							j++;        
						}
					}
					else{
						result.push(element.parentNode.parentNode.textContent.replace(element.textContent,'').replace('Buy',''));
					}
					//result.push(nrr);
					//result.push(prc);
					return result;
				}
				element = currentPage.iterateNext();
			}
			next[next.length - 1].click();
			i++;
		}
		result.push("This NFT isn't listed for sale".concat(i.toString()));
			return result;
		})
	}
		//console.log(xyz[998]);	
		console.log(xyz);	
		console.log("Try a new link?");
		browser.close();
		return resolve(xyz);	
	}
	catch (e) {
		return reject(e);
	}
	
})
}
}	



				
		
		
	

module.exports = scraperObject;

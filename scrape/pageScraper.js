const scraperObject = {
	url: 'https://entrepot.app/marketplace/icsnakes', //ethflower',  icspliffsters'
	//url: 'https://skeh5-daaaa-aaaai-aar4q-cai.raw.ic0.app/#/collection/azumi/items',
	async scraper(browser){
		return new Promise(async (resolve, reject) => {
			try {
		let page = await browser.newPage();
		await page.setDefaultNavigationTimeout(0);
		console.log(`Searching NFTs on ${this.url}...`);
		console.log('Lots of data. This can and should take a while. Grab a coffee or something..');
		console.log('mrinalini');
		await page.goto(this.url,{
			waitUntil: 'networkidle0',
		  });
		
		let xyz = await page.evaluate(() => {
			
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
				if(element.textContent.includes("#3671")){
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

/*let xyz = await page.evaluate(() => {
	
	
	var result = [];
	let next = document.querySelectorAll('div.header div.market-tabbar-right div.search-input-content input.ant-input.input-style');
	next.forEach((innerItem) => {
		innerItem.value = "77";
		
	})
	
	
	
	const delay = ms => new Promise(res => setTimeout(res, ms));
	delay(1000);
	let currentPage = document.evaluate(
		'//div/section/main/div/div/div/div/div/div',
		document,
		null,
		XPathResult.ANY_TYPE,
		null,
		);
	var element = currentPage.iterateNext();
	
	while  (element){
		var c = element.textContent;
		if(c.includes("#77")){
			result.push(element.textContent);
			
			return result;
		}
		element = currentPage.iterateNext();
	}
	console.log("hello2");
	return result;
})
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
}*/

				
		
		
	

module.exports = scraperObject;

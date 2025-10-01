const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");
const textRef = "./txt/vanasonad.txt";
const dateEt = require("./src/dateTimeET");
const pageStart = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Risto Veebileht</title>\n</head>\n<body>';
const pageBody = '\n\t<h1>Risto Veebileht</h1>\n\t<p>See leht on loodud <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> veebiprogrammeerimise kursusel ja ei oma mõistlikku sisu.</p>\n\t<hr>';
const pageBanner = '<img src="vp_banner_2025_AA.jpg" alt="Kursuse bänner">';
const pageEnd = '\n</body>\n</html>';

http.createServer(function(req, res){
		console.log("Praegune URL: "+ req.url);
	let currentUrl = url.parse(req.url, true);
	console.log("Puhas URL: "+ currentUrl.pathname);
	
	if(currentUrl.pathname === "/"){
		res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageStart);
		res.write(pageBanner);
		res.write(pageBody);
		res.write("\n\t<p>Täna on " + dateEt.dateAndDay()+ "," + " Kell " + dateEt.time()+"</p>");
		res.write('\n\t<p> Hetkel pakutud <a href="/vanasonad">vanasõnad</a>.</p>')
		res.write(pageEnd);
		return res.end();
	}
	
	else if(currentUrl.pathname === "/vanasonad"){
		res.writeHead(200, {"Content-type": "text/html"});
		fs.readFile(textRef, "utf8", (err, data)=>{
			if(err){
				res.write(pageStart);
				res.write(pageBanner);
				res.write(pageBody);
				res.write("\n\t<p>Täna on " + dateEt.dateAndDay()+ "," + " Kell " + dateEt.time()+"</p>");
				res.write("\n\t<p> Täna pole pakkuda ühtegi vanasõna!</p>");
			} else {
					let oldWisdomList = data.split(";");
					let wisdomOutput = "\n\t<ol>";
					for (let i = 0; i < oldWisdomList.length; i ++){
						wisdomOutput += "\n\t\t<li>" + oldWisdomList[i] + "</li>";
				}
				wisdomOutput += "\n\t</ol>";
				res.write(pageStart);
				res.write(pageBanner);
				res.write(pageBody);
				res.write("\n\t<p>Täna on " + dateEt.dateAndDay()+ "," + " Kell " + dateEt.time()+"</p>");
				res.write("\n\t<h2>Eesti vanasõnade valik: </h2>");
				res.write(wisdomOutput);
				res.write(pageEnd);
				return res.end();
				}
			});
		}
	
	else if(currentUrl.pathname === "/vp_banner_2025_AA.jpg"){
		let bannerPath = path.join(__dirname, "images");
		fs.readFile(bannerPath + currentUrl.pathname, (err, data)=>{
			if(err){
				throw(err);
			}
			else {
				res.writeHead(200, {"content-type": "image/jpeg"});
				res.end(data);
			}
		});
	}
	
	else {
		res.end("Viga 404, sellist lehte ei ole olemas!");
	}
	
}).listen(5307);
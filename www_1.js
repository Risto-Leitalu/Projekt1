const http = require("http");
const dateEt = require("./src/dateTimeET");
const pageStart = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Risto Veebileht</title>\n</head>\n<body>';
const pageBody = '\n\t<h1>Risto Veebileht</h1>\n\t<p>See leht on loodud <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> veebiprogrammeerimise kursusel ja ei oma mõistlikku sisu.</p>\n\t<img src="images/HTML_Sumbol_VP_2025.png"></img>\n\t<hr>';
const pageBanner = '<img src="images/vp_banner_2025_AA.jpg" alt="Kursuse bänner"></img>';
const pageEnd = '\n</body>\n</html>';

http.createServer(function(req, res){
	res.writeHead(200, {"Content-type": "text/html"});
	res.write(pageStart);
	res.write(pageBanner);
	res.write(pageBody);
	res.write("\n\t<p>Täna on " + dateEt.dateAndDay()+ "," + " Kell " + dateEt.time()+"</p>");
	res.write(pageEnd);
	return res.end();
}).listen(5307);
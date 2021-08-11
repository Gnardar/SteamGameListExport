//--Convert data to CSV
function arrayToCSV(objArray) {
     const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
     let str = `${Object.keys(array[0]).map(value => `"${value}"`).join(",")}` + '\r\n';

     return array.reduce((str, next) => {
         str += `${Object.values(next).map(value => `"${value}"`).join(",")}` + '\r\n';
         return str;
        }, str);
 }
 
//--Function to download data to a file
function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

//--Function to trigger game ID and download

function export_games(download = true){
	var games = document.querySelectorAll('.gameListRow');
	var output=[];
	for (var i=0; i<games.length; i++){
		var tmp_game = {
			game_name: games[i].children[1].children[0].children[0].children[0].textContent,
			play_time: (games[i].children[1].children[0].children[0].children[1].textContent).split(" ")[0],
			game_id: games[i].id,
			game_link: "https://store.steampowered.com/app/" + (games[i].id).substr(5)
		};
	
		output.push(tmp_game);
	};
	console.table(output);
	if (download){
		csvContent = arrayToCSV(output);

		download(csvContent, "gamelist.csv", "text/csv");
	}
}


console.log("Functions loaded...")
console.log("Run export_games()")

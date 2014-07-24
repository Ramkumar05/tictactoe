var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);
	users = {};
	var gameStart = 0;

server.listen(3000);
//app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res){
	res.sendfile(__dirname + '/index.html');
});
app.get('/images/tic_tac_toe/blank.png', function(req, res){
	res.sendfile(__dirname + '/images/tic_tac_toe/blank.png');
});

app.get('/images/tic_tac_toe/o.png', function(req, res){
	res.sendfile(__dirname + '/images/tic_tac_toe/o.png');
});
app.get('/images/tic_tac_toe/x.jpg', function(req, res){
	res.sendfile(__dirname + '/images/tic_tac_toe/x.jpg');
});

io.sockets.on('connection', function(socket){

	
	// socket.on('error', function(e) {
	// 	console.log(e);
	// })
});



io.sockets.on('connection', function(socket){


	socket.on('send message', function(data){
			//console.log("test"+data);
			// for (var i =0; i< Object.keys(users).length;i++)
			// {
			// 	users[players[i]].emit('new message', data);
			// }
			socket.broadcast.emit('new message', data);
			console.log('gameStart-->'+gameStart);
			gameStart++;
			console.log('gameStart-->'+gameStart);
			if(gameStart >= 1 && Object.keys(users).length == 1)
			{
				console.log("called");
				updateNicknames();

			}
	});


	socket.on('new user', function(data, callback){
		if (data in users) {
			callback(2);
		}
		else
		{
			var temp  =Object.keys(users).length;
			if (temp < 2) {
				console.log("good");
				callback(1);
				socket.nickname = data;
				users[socket.nickname] = socket;
				console.log("B4 Update...")
				updateNicknames();
			}
			else
			{
				console.log("lost");
				callback(3);
			}
			
			
			//console.log("name: "+socket.nickname+" ---- "+users[socket.nickname]);
			//nicknames.push(socket.nickname);
			//io.sockets.emit('usernames', nicknames);
			
		}
	});

	socket.on('disconnect', function(data){
		if (!socket.nickname) return;
		delete users[socket.nickname];
		//nicknames.splice(nicknames.indexOf(socket.nickname), 1);
		console.log("Disconnect...");
		updateNicknames();
	});


	function updateNicknames(){
		//console.log("keys--->"+Object.keys(users));
		//console.log(Object.keys(users)[0]);
		players =Object.keys(users);
		//io.sockets.emit('usernames', Object.keys(users));
		for(var i=0; i<Object.keys(users).length; i++)
		{
			users[players[i]].emit('usernames', Object.keys(users));
		}
		console.log('updateNicknames...'+gameStart);

		if(gameStart >= 1 && players.length == 1)
		{
			console.log('win...');
			gameStart = 0;
			//io.sockets.emit('win-message', true);
			for(var i=0; i<Object.keys(users).length; i++)
			{
				users[players[i]].emit('win-message', true);
			}

		}
	}

});







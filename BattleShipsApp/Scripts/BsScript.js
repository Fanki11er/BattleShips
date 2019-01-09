if(document != undefined)
{
	window.onload = init;
	console.log("Using Browser");
}
else
{
console.log("Using Node.Js");
var document;
}

function init()
{
	var board = document.getElementsByTagName("td");
	for(var i = 0; i<board.length; i++)
		board[i].onclick = kontroler.isNew;
	model.makeShips(model.boardSize);
	console.log(model.ships)			
}			

var model =
{
	boardSize: 10, //later added by user
	numOfShips: 10, // later by user chose
	ships: [],
	isOccupied: function(newShip)
	{
		for(var i = 0; i<this.ships.length; i++)
		{
			for(var j = 0; j< this.ships[i].position.length; j++)
			{
				if(this.ships[i].position.indexOf(newShip[j])>=0)
					return true;		
			}
		}
		return false;
	},	
	
	fire: function(cell)
	{
		for(var i = 0; i< this.ships.length; i++)
		{
			var ship = this.ships[i];
			if(ship.position.indexOf(cell.id)>=0)
			{
				var hit = ship.position.indexOf(cell.id);
				//console.log("TRAFIONY");
				cell.style.backgroundColor = ship.hull[hit];
				ship.hits += 1;
				if(ship.hits==ship.size)
					{
						//console.log("Zatopiony");
						this.changePicture(ship.picture);
						ship.isSunk = true;
					}
					break;
			}
			else
			{
				//console.log("PUDŁO");
				cell.style.backgroundColor = "gray";
			}
		}
	},
	makeShips: function(bSize)
	{
		for(var i = 0; i< this.numOfShips; i++)
		{							
			if(i==0)
			{
				this.shipMaker(bSize,4,i);					
			}
			else if(i>0&&i<3)
			{
				this.shipMaker(bSize,3,i);				
			}
			else if(i>2&&i<6)
			{
				this.shipMaker(bSize,2,i);				
			}
			else if(i>5&&i<10)
			{
				this.shipMaker(bSize,1,i);	
			}
			else
				console.log("Wrong makeShip entry");
		}
	},
			
	shipMaker: function(boardSize, shipSize, i)
	{
		
		do
		{
			var location = [];
			var hull = hulsMagazine.selectHull(shipSize); 							
			var orientation = Math.floor(Math.random()*2);
			//console.log(orientation);
			if(orientation==1)
			{
				var horizon = Math.floor(Math.random()*(boardSize + 1 - shipSize));
				var vertic = Math.floor(Math.random()*boardSize);
				for(var j= 0; j<shipSize; j++)
				location.push(vertic + "" + (horizon + j));
			}
			else
			{
				var horizon = Math.floor(Math.random()*boardSize);
				var vertic = Math.floor(Math.random()*(boardSize + 1 - shipSize));
				for(var j= 0; j<shipSize; j++)
					location.push((vertic + j)+ "" + horizon);
			}
			
		} while(this.isOccupied(location))	
		this.ships.push(new Ship(location,hull[orientation],shipSize,"P"+i));
	},
	changePicture: function(picture)
	{
		if(document != undefined)
		{
			var pic = document.getElementById(picture);
			pic.style.backgroundColor = "gray";
		}
		else
		{
			console.log("Its for jasmine");
		}					
	}
};
			
var kontroler =
{
	shots:0,
	used:[],
	isNew: function(eventObj) //check that user dont shots on the same cells
	{
	var cell = eventObj.target;
		if(kontroler.used.indexOf(cell.id)>=0)
		{
		//console.log("You shot again i one place");
		}
		else
		{
		//console.log("New place shot");
			kontroler.used.push(cell.id);
			kontroler.shots +=1;
			model.fire(cell);
		}
	}			
};
	
var hulsMagazine = 
{
	hullx4:[["orange", "orange", "orange", "orange"], ["orange", "orange", "orange", "orange"]],
	hullx3:[["blue","blue", "blue"], ["blue","blue", "blue"]],
	hullx2:[["green", "green"], ["green", "green"]],
	hullx1:[["purple"], ["purple"]],
			
	selectHull: function(size)
	{
		switch(size)
		{
			case 4:
				return this.hullx4;
			case 3:
				return this.hullx3;
			case 2: 
				return this.hullx2;
			case 1:
				return this.hullx1;
			default:
			{
				console.log("Wrong size");
				break;
			}
		}			
	}
};
	
	
function Ship(position, hull, size, picture)
{
	this.position = position;
	this.hull =  hull;
	this.hits = 0;
	this.size = size;
	this.picture = picture;
	this.isSunk = false;
}

if(document == undefined)
{
	//console.log("Using Node.js");		
	module.exports =
	{
		kontroler,
		model,
		hulsMagazine,
		Ship
	}
}
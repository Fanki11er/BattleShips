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
	const board = document.getElementsByTagName("td");
	const counter = document.getElementById("counter");
	counter.innerHTML = "Your shots: " + controller.shots;
	for(let i = 0; i<board.length; i++)
		board[i].onclick = controller.isNew;
		model.makeShips(model.boardSize);
		//console.log(model.ships)			
}			

const model =
{
	boardSize: 10, //later added by user
	numOfShips: 10, // later by user chose
	ships: [],
	shipsLeft: 10,
	isOccupied: function(newShip)
	{
		for(let i = 0; i<this.ships.length; i++)
		{
			for(let j = 0; j< this.ships[i].position.length; j++)
			{
				if(this.ships[i].position.indexOf(newShip[j])>=0)
					return true;		
			}
		}
		return false;
	},
	lostShip: function()
	{	
		this.shipsLeft -= 1;
		if(this.shipsLeft <1)
		{
			alert("End of the game");
		}
	},
	
	fire: function(cell)
	{
		for(let i = 0; i< this.ships.length; i++)
		{
			const ship = this.ships[i];
			if(ship.position.indexOf(cell.id)>=0)
			{
				//console.log("TRAFIONY");
			hulsMagazine.showHit(cell, ship);
				ship.hits += 1;
				if(ship.hits==ship.size)
				{
					//console.log("Zatopiony");
					this.changePicture(ship.picture);
					this.lostShip();
				}
				break;
			}
			else
			{
				//console.log("PUDŁO");
			}
			cell.style.backgroundColor = "gray";
		}
	},
	makeShips: function(bSize)
	{
		for(let i = 0; i< this.numOfShips; i++)
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
			var orientation = Math.floor(Math.random()*4); 
			var hull = hulsMagazine.selectHull(shipSize); 
			if(orientation == 0 || orientation == 2)
			{
				var horizon = Math.floor(Math.random()*(boardSize + 1 - shipSize));
				var vertic = Math.floor(Math.random()*boardSize);
				for(var j= 0; j<shipSize; j++)
				location.push(vertic + "" + (horizon + j));
			}
			else if(orientation == 1 || orientation == 3)
			{
				var horizon = Math.floor(Math.random()*boardSize);
				var vertic = Math.floor(Math.random()*(boardSize + 1 - shipSize));
				for(var j= 0; j<shipSize; j++)
					location.push((vertic + j)+ "" + horizon);
			}
			
		} while(this.isOccupied(location));	
		if(orientation == 2 || orientation == 3)
		{
			hull.reverse();
		}
			this.ships.push(new Ship(location, orientation, hull, shipSize,"P"+i));
	},
	changePicture: function(picture)
	{
		if(document != undefined)
		{
			const pic = document.getElementById(picture);
			pic.style.backgroundColor = "gray";
		}
		else
		{
			console.log("Its for jasmine");
		}					
	}
};
			
const controller =
{
	shots:0,
	used:[],
	isNew: function(eventObj) //check that user dont shots on the same cells
	{
	var cell = eventObj.target;
		if(controller.used.indexOf(cell.id)>=0)
		{
		//console.log("You shot again i one place");
		}
		else
		{
		//console.log("New place shot");
			controller.used.push(cell.id);
			controller.countShots();
			model.fire(cell);
		}
	},
	countShots: function()
	{
		controller.shots +=1;
		counter.innerHTML = "Your shots: " + controller.shots;
	}			
};
	
var hulsMagazine = 
{
	hullx4:["url('./Img/hull4r.png')", "url('./Img/hull4rm.png')", "url('./Img/hull4mf.png')", "url('./Img/hull4f.png')"],
	hullx3:["url('./Img/hull3r.png')", "url('./Img/hull3m.png')", "url('./Img/hull3f.png')"],
	hullx2:["url('./Img/hull2r.png')", "url('./Img/hull2f.png')"],
	hullx1:["url('./Img/hull1.png')"],
	
	showHit: function(cell, ship)
	{
		var hit = ship.position.indexOf(cell.id);
		cell.style.backgroundColor = null;
		//console.log(ship.orientation)
		switch(ship.orientation)
		{
			case 0:
			{
				cell.style.backgroundImage = ship.hull[hit];
				break;
				
			}
			case 1:
			{
				cell.style.backgroundImage = ship.hull[hit];
				cell.style.transform = "rotate(90deg)";
				break;			
			}
			case 2:
			{
				cell.style.backgroundImage = ship.hull[hit];
				//cell.style.transform = "rotate(90deg)";
				cell.style.transform = "scaleX(-1)";
				break;			
			}
			case 3:
			{
				//console.log("case 3")
				cell.style.backgroundImage = ship.hull[hit];
				cell.style.transform = "rotate(90deg) scaleX(-1)";

				break;			
			}
		}

	},
			
	selectHull: function(size)
	{
		switch(size)
		{
			case 4:
				return this.hullx4.slice();
			case 3:
				return this.hullx3.slice();
			case 2: 
				return this.hullx2.slice();
			case 1:
				return this.hullx1.slice();
			default:
			{
				console.log("Wrong size");
				break;
			}
		}			
	}
};
	
	
function Ship(position, orientation, hull, size, picture)
{
	this.position = position;
	this.hull =  hull;
	this.hits = 0;
	this.size = size;
	this.picture = picture;
	this.orientation = orientation;
}

if(document == undefined)
{
	//console.log("Using Node.js");		
	module.exports =
	{
		controller,
		model,
		hulsMagazine,
		Ship
	}
}
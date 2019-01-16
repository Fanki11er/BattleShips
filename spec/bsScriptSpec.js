var battle = require("./../BattleShipsApp/Scripts/BsScript");

describe("Kontroler function isNew ",function()
{

    var obj = { target:{ } };
    beforeEach(function()
    {
        
        battle.controller.used = ["00","01"];
        battle.controller.shots = 2;
        obj.target.id = "02";    
    })
   
   xit("add new cel to used[] and increment counter of shots", function()
   {    
       battle.controller.isNew(obj);
       expect(battle.controller.used).toEqual(["00","01","02"]);
       expect(battle.controller.shots).toBe(3);
    }) 
       
    it("do not add new cel to used[] and not increment counter of shots", function()
    {    
       obj.target.id = "00";
       battle.controller.isNew(obj);

       expect(battle.controller.used).toEqual(["00","01"]);
       expect(battle.controller.shots).toBe(2);
    })   
});
describe("Table ships[]", function()
{   beforeEach(function()
    {
        battle.model.ships = [];
        battle.model.makeShips(10);
    })
    afterEach(function()
    {
        battle.model.ships = [];
    })
    it("Have 10 entries", function()
    {
        
        expect(battle.model.ships.length).toBe(10);
       
    })
})
describe("Shot", function()
{
    var cell = { id:{},style:{} };
    var shipPosition;


    
    beforeEach(function()
    {
        battle.model.makeShips(10);
        shipPosition =  battle.model.ships[0].position[0];      
        cell.id = shipPosition;    
    })
    afterEach(function()
    {
        battle.model.ships = [];
    })
    xit("is a HIT and cell change its colour to orange", function()
    {
        battle.model.fire(cell);
        expect(battle.model.ships[0].hits).toEqual(1);
        expect(cell.style.backgroundColor).toEqual("orange");

    })
    it("is a MISS and cell change its colour to gray", function()
    {
        cell.id = "100";
        battle.model.fire(cell);
        expect(battle.model.ships[0].hits).toEqual(0);
        expect(cell.style.backgroundColor).toEqual("gray");       
    })

    /*it("is 2 times HIT and ship is sunk", function()
    {
        //Wrong falses onece upon a time i dont know why
    
        
            shipPosition =  battle.model.ships[4].position[0];
            cell.id = shipPosition;
            battle.model.fire(cell);
            shipPosition =  battle.model.ships[4].position[1];
            cell.id = shipPosition;
            battle.model.fire(cell);
        expect(battle.model.ships[4].isSunk).toEqual(true); 
    })*/
})

describe("shipMaker", function()
{
    
    beforeEach(function()
    {
        battle.model.makeShips(10);
    })
    afterEach(function()
    {
        battle.model.ships = []; 
    })

    it("makes ships without collisions", function()
    {
        function collisions()
        {
            var shipsTable = battle.model.ships;
            for(var i = 0; i<shipsTable.length; i++)
            {
                for(var j = 0 ; j< shipsTable[i].position.length; j++)
                {
                    console.log(shipsTable[i].position[j]);
                    var tmp = shipsTable[i].position[j];
                    for(var k = i+1; k < shipsTable.length; k++)
                    {
                        if( shipsTable[k].position.indexOf(tmp)>=0)
                        {
                            console.log("Colision on " + tmp + " and " + shipsTable[k].position)
                            return true;
                        }
                    }
                }
            }
            return false;
        }

        expect(collisions()).toEqual(false);
    })
})
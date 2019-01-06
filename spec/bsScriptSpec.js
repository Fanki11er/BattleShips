var battle = require("./../BattleShipsApp/Scripts/BsScript");

describe("Kontroler function isNew ",function()
{

    var obj = { target:{ } };
    beforeEach(function()
    {
        battle.kontroler.used = ["00","01"];
        battle.kontroler.shots = 2;
        obj.target.id = "02";    
    })
   
   it("add new cel to used[] and increment counter of shots", function()
   {    
       battle.kontroler.isNew(obj);
       expect(battle.kontroler.used).toEqual(["00","01","02"]);
       expect(battle.kontroler.shots).toBe(3);
    }) 
       
    it("do not add new cel to used[] and not increment counter of shots", function()
    {    
       obj.target.id = "00";
       battle.kontroler.isNew(obj);

       expect(battle.kontroler.used).toEqual(["00","01"]);
       expect(battle.kontroler.shots).toBe(2);
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
    it("is a HIT and cell change its colour to orange", function()
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

    it("is 2 times HIT and ship is sunk", function()
    {
        //Wrong falses onece upon a time i dont know why
    
        
            shipPosition =  battle.model.ships[4].position[0];
            cell.id = shipPosition;
            battle.model.fire(cell);
            shipPosition =  battle.model.ships[4].position[1];
            cell.id = shipPosition;
            battle.model.fire(cell);
        expect(battle.model.ships[4].isSunk).toEqual(true); 
    })
})
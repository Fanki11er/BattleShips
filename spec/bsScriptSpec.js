var battle = require("./../BattleShipsApp/Scripts/BsScript");

describe("When i click on my game board ",function()
{
   it("on new cells", function()
   {
       var obj = 
       {
           target:
           {
            id: "00"

           }
       }
       battle.kontroler.isNew(obj);
       expect(battle.kontroler.used[0]).toBe("00");
       expect(battle.kontroler.shots).toBe(1);
       
       obj.target.id = "01";
       battle.kontroler.isNew(obj);

       expect(battle.kontroler.used[1]).toBe("01");
       expect(battle.kontroler.shots).toBe(2);

       obj.target.id = "00";
       battle.kontroler.isNew(obj);
       expect(battle.kontroler.shots).toBe(3);

   }) 

   

   
})
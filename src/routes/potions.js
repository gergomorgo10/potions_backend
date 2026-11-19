const express = require("express");
const { eq } = require("drizzle-orm");
const db = require("../db/db");
const { potions } = require("../db/schema");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const potion = await db.select().from(potions);
    return res.status(200).json(potion);
  } 
  catch (error){
    return res.status(500).json({ 
        message: error.message 
    });
  }
});

router.get("/:id", async (req, res) => {
    try{
        const [user] = await db.select().from(potions).where(eq(potions.id ,req.params.id));

        if(!user){
            return res.status(404).json({
                message: "nemtalalt user :c"
            })
        }

        return res.status(200).json(user)
    }
    catch (error){
       return res.status(500).json({ 
           message: error.message 
       });
    }
})

router.post("/", async (req, res) => {
    try{
        const {name, effect, isDangerous} = req.body;

        if(!name){
            return res.status(404).json({
                message: "nemtalalt name :c",
            })
        }
        if(!effect){
            return res.status(404).json({
                message: "nemtalalt effect :C",
            })
        }
        if(isDangerous === null){
            return res.status(404).json({
                message: "kene bool erter >:x",
            })
        }

        await db.insert(potions).values({
            name:name,
            effect:effect,
            isDangerous:isDangerous,
        })
        return res.status(201).json({
            message: "sikeres feltoltes!!!!!!!!!"
        })
    }
    catch (error){
        return res.status(500).json({ 
            message: error.message 
        });
    }
})

router.delete("/:id", async (req, res) => {
    try{
        const [user] = await db.select().from(potions).where(eq(potions.id ,req.params.id));

        if(!user){
            return res.status(404).json({
                message: "nemtalalt user :c"
            })
        }

        await db.delete(potions).where(eq(potions.id, req.params.id))
        return res.status(200).json({
            message: "toroltuk"
        })
    }
    catch (error){
       return res.status(500).json({ 
           message: error.message 
       });
    }
})

router.put("/:id", async (req, res) => {
    try{
        const [potion] = await db.select().from(potions).where(eq(potions.id, req.params.id))

        if(!potion){
            return res.status(404).json({
                message: "nemtalalt :c"
            })
        }

        const {name, effect, isDangerous} = req.body;

        if(!name){
            return res.status(404).json({
                message: "nemtalalt name :c",
            })
        }
        if(!effect){
            return res.status(404).json({
                message: "nemtalalt effect :C",
            })
        }
        if(isDangerous === null){
            return res.status(404).json({
                message: "kene bool erter >:x",
            })
        }

        await db.update(potions).set({name, effect, isDangerous}).where(eq(potion.id, req.params.id))
        return res.status(200).json({
            message: "sikeres, update!!!!!"
        })
    }
    catch (error){
        return res.status(500).json({ 
            message: error.message 
        });
        }
})
module.exports = router;
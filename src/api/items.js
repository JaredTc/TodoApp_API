const express = require('express');
const router = express.Router();
const connect = require('../config/database')
const { v4: uuidv4 } = require('uuid');


// GET ALL ITEMS
router.get('/', (req, res) => {

   try {

    connect.query('SELECT * FROM items', async (err, rows) => {
        if (err) {
            console.log(err)
        }
        if (!rows.length) {
            return res.status(403);
        } else {
            res.json({ items: rows })
        }
        res.end()
    })

   } catch (error) {
    next(error);
   }

});

//INSERT ITEMS A DB
router.post('/', (req, res) => {

    const id = uuidv4();
    const itemName = req.body.name;
    const completed = false;

    try {

        connect.query('INSERT INTO items SET ?', {
            id: id,
            name: itemName,
            completed: completed
        }, async (err) => {
            if (err) {
                res.json({ msg: err });
            } else {
                res.send({
                    msg: 'Registro Exitoso',
                    id: id,
    
    
                });
    
            }
    
        }
        );
        
    } catch (error) {
        next(error);
    }
})

//DELETE ITEM
router.delete('/:id', (req, res) => {


       try {
        
        const {id} = req.params;
        connect.query('DELETE FROM items WHERE id = ?', [id], async (err) => {

            if (err) {
                res.json({ msg: err });
            } else {
                res.send({
                    msg: 'Delete Exitoso',
                


                });

            }

        })

       } catch (error) {
         next(error);
       }

})

// UPDATE  ITEMS
router.put('/:id', (req, res) => {
    
    try {
        const { id } = req.params
        const  {  completed } = req.body
    connect.query('UPDATE items SET completed = ? WHERE id = ? ', [completed, id], async (err) => {

        if (err) {
            res.json({ msg: err });
        } else {
            res.send({
                msg: 'Update Exitoso'


            });

        }

    })
    
    } catch (error) {
        next(error);
    }
})

module.exports = router;
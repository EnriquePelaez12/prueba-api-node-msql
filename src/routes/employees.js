const Router  = require('express');
const express = require('express');
const  query  = require('../database');
const router =express.Router();
const mysqlConnection = require('../database');
//obtener todos
router.get('/', (req, res)=>{
    mysqlConnection.query('SELECT * FROM employees', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        }
        else{
            console.log(err)
        }
    });
});
//busacar por id
router.get('/:id', (req , res) =>{
    const {id} = req.params;
    console.log(id);
    mysqlConnection.query('SELECT * FROM employees WHERE id = ?', [id], (err, rows, fields) =>{
        if (!err) {
            res.json(rows[0]);
        }
        else{
            console.log(err)
        }
    });
});

router.post('/', (req, res) => {
    const  { id, name, salary }  = req.body;
    console.log(req.body);
    // call company.employeeAddOrEdit(0, 'enrique', 2012);
    const query = `CALL company.employeeAddOrEdit(?, ?, ?); `;
    mysqlConnection.query(query, [id, name, salary], (err, rows, fields) =>{
        if (!err) {
            res.json({Status: 'Employeed Saved'});
        }
        else{
            console.log(err)
        }
    });
});

router.put('/:id', (req, res) =>{
    const { name, salary} = req.body;
    const { id } = req.params;
    const query = `CALL company.employeeAddOrEdit(?, ?, ?); `;
    mysqlConnection.query(query, [id, name, salary], (err, rows, fields) =>{
        if (!err) {
            res.json({Status: 'Employeed Updated'});
        }
        else{
            console.log(err)
        }
    });
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM employees WHERE ID = ?', [id], (err,
        rows, fields) => {
            if (!err) {
                res.json({Status: 'Employeed Delete'});
            }
            else{
                console.log(err)
            }            
        })
})

module.exports = router;

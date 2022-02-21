const express = require('express');
const router = express.Router();
const pool = require('../server1');
const { addCompanyValidation } = require('../validation.js');
/**
 * @swagger
 * /api.v1.ITIS6177/agents/{agent_code}:
 *    get:
 *      description: return agents
 *      produces:
 *      - "application/json"
 *      parameters:
 *      - name: "agent_code"
 *        in: "path"
 *        description: "Code of agent to return"
 *        required: true
 *        type: "string"
 *      responses:
 *        "200":
 *         description: Agent details
 *        "400":
 *         description: Bad Request
 */

router.get('/agents/:agent_code', async function(req,res){
    try {
        const sqlQuery = 'SELECT agent_code,agent_name, working_area from sample.agents where agent_code=?';
        const rows = await pool.query(sqlQuery, req.params.agent_code);
        //console.log("rows");
        //res.setHeader('Content-Type', 'application/json');
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }


    res.status(200).json({agent_code:req.params.agent_code})
});

/**
* @swagger
 * /api.v1.ITIS6177/company:
 *    get:
 *      description: return company details
 *      produces:
 *      - "application/json"
 *      responses:
 *        "200":
 *         description: Company details
 *        "400":
 *         description: Bad Request
 */
router.get('/company',addCompanyValidation, async function(req,res){
    try {
        const sqlQuery = 'SELECT * from sample.company';
        const rows = await pool.query(sqlQuery, req.params.agent_code);
       // res.setHeader('Content-Type', 'application/json');
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }


   // res.status(200).json({agent_code:req.params.agent_code})
});

/**
 * @swagger
 * /api.v1.ITIS6177/company/{company_id}:
 *    get:
 *      description: return company details
 *      produces:
 *      - "application/json"
 *      parameters:
 *      - name: "company_id"
 *        in: "path"
 *        description: "Company id to return"
 *        required: true
 *        type: "string"
 *      responses:
 *        "200":
 *         description: Company details
 *        "400":
 *         description: Bad Request
 */
router.get('/company/:company_id', async function(req,res){
    try {
        const sqlQuery = 'SELECT * from sample.company where company_id = ?';
        const rows = await pool.query(sqlQuery, [req.params.company_id]);
       // res.setHeader('Content-Type', 'application/json');
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }


   // res.status(200).json({agent_code:req.params.agent_code})
});

/**
/**
 * @swagger
 * /api.v1.ITIS6177/customers:
 *    get:
 *      description: return customers+
 *      produces:
 *      - "application/json"
 *      parameters:
 *      - name: "cust_city"
 *        in: "query"
 *        description: "Customers in particular city"
 *        required: true
 *        type: "string"
 *      responses:
 *        "200":
 *         description: customer details
 *        "400":
 *         description: Bad Request
 */
router.get('/customers', async function(req,res){
    try {
        const sqlQuery = 'SELECT * from sample.customer where cust_city=?';
        const rows = await pool.query(sqlQuery, [req.query.cust_city]);
       // res.setHeader('Content-Type', 'application/json');
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }


   // res.status(200).json({CUST_CITY:req.query.CUST_CITY})
});


/**
 * @swagger
 * /api.v1.ITIS6177/company:
 *    post:
 *      description: add company
 *      produces:
 *      - "application/json"
 *      consumes:
 *      - "application/json"
 *      parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "Company object to be added"
 *        required: true
 *        schema:
 *           $ref: "#/definitions/Company"
 *      responses:
 *        "200":
 *         description: company added
 *        "400":
 *         description: Bad Request
 * definitions:
 *      Company:
 *        type: "object"
 *        properties:
 *          company_id:
 *           type: "string"
 *           length: 6
 *           required: true
 *          company_name:
 *           type: "string"
 *          company_city:
 *           type: "string"
 *
 */
 router.post('/company', async function(req,res) {
        try {
            const {company_id, company_name,company_city} = req.body;

           if(company_id.length > 6){
                console.log(company_id);
                res.status(400).send('Company id cannot be longer than 6 charecters');
                }
                     if(company_id.length == 0){
                console.log(company_id);
                res.status(400).send('Company id cannot be empty');
                }

            const sqlQuery = 'INSERT INTO company (company_id, company_name,company_city) VALUES (?,?,?)';
            const result = await pool.query(sqlQuery, [company_id, company_name,company_city]);
            console.log(result);
            res.status(200).json({company_id: result.company_id});
        } catch (error) {
            console.log(error);
            if(error.code == 'ER_DUP_ENTRY'){
                  res.status(400).send('Comapny already exists');
                 }
            res.status(400).send(error.message)
        }
    });

/**
 * @swagger
 * /api.v1.ITIS6177/company/{company_id}:
 *    put:
 *      description: update company
 *      produces:
 *      - "application/json"
 *      consumes:
 *      - "application/json"
 *      parameters:
 *      - name: "company_id"
 *        in: "path"
 *        description: "Company Id to update"
 *        required: true
 *        type: "string"
 *      - in: "body"
 *        name: "body"
 *        description: "Company object to be updated"
 *        required: true
 *        schema:
 *           $ref: "#/definitions/Company"
 *      responses:
 *        "200":
 *         description: company added
 *        "400":
 *         description: Bad Request
 *
 */
router.put('/company/:company_id', async function(req,res) {
        try {
            const {company_id, company_name,company_city} = req.body;
                      if(company_id.length > 6){
                console.log(company_id);
                res.status(400).send('Company id cannot be longer than 6 charecters');
                }
                     if(company_id.length == 0){
                console.log(company_id);
                res.status(400).send('Company id cannot be empty');
                }

            const sqlQuery = 'UPDATE company set company_id =?, company_name =?, company_city = ? where company_id = ?';
            const result = await pool.query(sqlQuery, [company_id, company_name,company_city,req.params.company_id]);
          //  console.log(result);
              if(result.affectedRows == 0){
                   res.status(400).send('Company does not exist');
                 }
            res.status(200).json({company_id: result.company_id});
        } catch (error) {
            res.status(400).send(error.message)
        }
    });


/**
 * @swagger
 * /api.v1.ITIS6177/company/{company_id}:
 *    patch:
 *      description: update company
 *      produces:
 *      - "application/json"
 *      consumes:
 *      - "application/json"
 *      parameters:
 *      - name: "company_id"
 *        in: "path"
 *        description: "Company Id to update"
 *        required: true
 *        type: "string"
 *      - in: "body"
 *        name: "body"
 *        description: "Company object to be updated"
 *        required: true
 *        schema:
 *           $ref: "#/definitions/Company"
 *      responses:
 *        "200":
 *         description: company updated
 *        "400":
 *         description: Bad Request
 *
 */
router.patch('/company/:company_id', async function(req,res) {
        try {
            const  {company_name} = req.body;

           // const encryptedPassword = await bcrypt.hash(password,10)

            const sqlQuery = 'UPDATE company set company_name =?  where company_id = ?';
            const result = await pool.query(sqlQuery, [company_name,req.params.company_id]);
          //  console.log(result);
                  if(result.affectedRows == 0){
                   res.status(400).send('Company does not exist');
                 }
            res.status(200).json({company_id: result.company_id});
        } catch (error) {
            res.status(400).send(error.message)
        }
    });

/**
 * @swagger
 * /api.v1.ITIS6177/company/{company_id}:
 *    delete:
 *      description: delete company with given id
 *      produces:
 *      - "application/json"
 *      parameters:
 *      - name: "company_id"
 *        in: "path"
 *        description: "Company Id to delete"
 *        required: true
 *        type: "string"
 *      responses:
 *        "200":
 *         description: company deleted
 *        "400":
 *         description: Bad Request
 */
router.delete('/company/:company_id', async function(req,res) {
        try {
           // const  {company_name} = req.body;

           // const encryptedPassword = await bcrypt.hash(password,10)

            const sqlQuery = 'DELETE FROM company  where company_id = ?';
            const result = await pool.query(sqlQuery,req.params.company_id);
            console.log(result);
                if(result.affectedRows == 0){
                   res.status(400).send('Company does not exist');
                 }
            res.status(200).json({company_id: result.company_id});
        } catch (error) {
            res.status(400).send(error.message)
        }
    });
module.exports = router;
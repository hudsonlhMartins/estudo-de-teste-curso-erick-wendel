const {describe, it} = require('mocha')
const request = require('supertest')
const app = require('./api.js')
const assert =require('assert')
// Suite de test de api
// todos os end point vai ficar aqui dentro
    

describe('Api Suite test', ()=>{
    
    describe('/contact', ()=>{
        it('should request the contact page  and return HTTP Status 200', async()=>{
            const res = await request(app).get('/contact')
                .expect(200)
            assert.deepStrictEqual(res.text, 'contact')

        })
    })

    describe('/hello', ()=>{
        it('should request an inexistent route /hi and redirect to /hello',async()=>{
            const res = await request(app).get('/hi')
            .expect(200)
            assert.deepStrictEqual(res.text, 'hello world')
        })
    })

    describe('/login', ()=>{
        it('should login successfully on the login route and return HTTP Status 200', async()=>{
            const res = await request(app)
                .post('/login')
                .send({username: 'hudson', password: '123'})
                .expect(200)

            assert.deepStrictEqual(res.text, 'Logging has succeeded' )
        })

        it('should unauthorize a request when requesting it using wrong credentials and return HTTP Status 401', async()=>{
            const res = await request(app)
                .post('/login')
                .send({username: 'erick', password: '123'})
                .expect(401)

            assert.ok(res.unauthorized)
            assert.deepStrictEqual(res.text, 'logging failed' )
        })
    })

    
})
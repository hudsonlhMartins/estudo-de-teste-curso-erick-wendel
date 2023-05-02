const http = require('http')
const DEFAULT_USER = { username: 'hudson', password: '123' }

const routes = {

    '/contact:get': (req, res)=>{
        res.write('contact')
        return res.end()
    },
    '/login:post': async (req, res)=>{
        for await(const data of req){
            const user = JSON.parse(data)
            if(
                user.username !== DEFAULT_USER.username ||
                user.password !== DEFAULT_USER.password
            ){
                res.writeHead(401)
                res.write('logging failed')
                return res.end()
            }
            
        }
        res.write('Logging has succeeded')
        return res.end()
    },

    default: (request, response)=>{
        response.write('hello world')
        return response.end()
    }
}

const handler = (request, response)=>{
    const {url, method} = request
    const routerKey = `${url}:${method.toLowerCase()}`

    const chosen =routes[routerKey] || routes.default
    response.writeHead(200, {
        'Content-type': 'text/html'
    })
    return chosen(request, response)
}
const app = http.createServer(handler)
    .listen(3000, ()=> console.log('app running port 3000'))

module.exports = app
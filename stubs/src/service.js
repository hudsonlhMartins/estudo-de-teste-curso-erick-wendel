import https from 'https'
export class Service{

    static makeRequestGet(url){
        return new Promise((resolve, reject)=>{
            https.get(url, res =>{
                res.on('data', data => resolve(JSON.parse(data)))
                res.on('error', reject)
            })
        })
    }

    static async getPlanet(url){
        const result = await this.makeRequestGet(url)

        return {
            name: result.name,
            surfaceWater: result.surface_water,
            appeardIn: result.films.length
        }
    }

}

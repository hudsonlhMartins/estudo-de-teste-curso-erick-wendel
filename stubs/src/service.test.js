import { Service } from "./service.js";
import tatooine from './mocks/tatooine.json' assert {type: "json"}
import alderaan from './mocks/alderaan.json' assert {type: "json"}
import Sinon from "sinon";
import {deepStrictEqual} from 'assert'

const BASE_URL_1 = 'https://swapi.dev/api/planets/1/';
const BASE_URL_2 = 'https://swapi.dev/api/planets/2/';

const mocks = {
    tatooine: tatooine,
    alderaan: alderaan
};

(async ()=>{
    // {
    //     const withoutStub = await Service.makeRequestGet(BASE_URL_2)
    //     console.log(JSON.stringify(withoutStub))
    // }


    const stub = Sinon.stub(Service, Service.makeRequestGet.name)

    stub.withArgs(BASE_URL_1).resolves(mocks.tatooine)
    stub.withArgs(BASE_URL_2).resolves(mocks.alderaan)

    {
       const expected = {
            "name": "Tatooine",
            "surfaceWater": "1",
            "appeardIn": 5
       }

       const res = await Service.getPlanet(BASE_URL_1)
       deepStrictEqual(res, expected)
    }

})()
import { constants } from "./src/constantes.js"
import { File } from "./src/File.js"
import {rejects, deepStrictEqual} from 'assert'

(async ()=>{
    {
        const filePath = 'mocks/emptyFile-invalid.csv'
        const rejection = new Error(constants.error.FILE_LENGTH_ERROR_MESSAGE)
        const result =   File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = 'mocks/fourtems-invalid.csv'
        const rejection = new Error(constants.error.FILE_LENGTH_ERROR_MESSAGE)
        const result =   File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = 'mocks/threeItems-valid.csv'
        const result =  await File.csvToJson(filePath)
        const expected = [
            {
                "name": "Hudson Martins",
                "id": 123,
                "profession": "Javascript expert",
                "birthDay": 2000
            },
            {
                "name": "xuxa da silva",
                "id": 124,
                "profession": "apresentadora",
                "birthDay": 1943
            },
            {
                "name": "Erick Wendel",
                "id": 212,
                "profession": "Javascript Instructor",
                "birthDay": 1998
            }
          ]

          deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
    }
})()
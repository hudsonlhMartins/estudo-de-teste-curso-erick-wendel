import {readFile} from 'fs/promises'
import {} from 'path'
import { constants } from './constantes.js'
import { User } from './User.js'

const DEFAULT_OPTION={
    maxLines:3,
    fields:[
        'id',
        'name',
        'profession',
        'age',
    ]
}

export class File {
    static async csvToJson(filePath){
        const content = await File.getFileContent(filePath)
        const validation = File.isValid(content)
        if(!validation.valid) throw new Error(validation.error)

        const users = File.parseCSVToJSON(content)
        return users
    }

    static async getFileContent(filePath){
        const filename = filePath
        return (await readFile(filename)).toString('utf8')
    }

    static isValid (cvsString, options =DEFAULT_OPTION){
        const [header, ...fileWithoutHeader] = cvsString.split('\n')
        const isHeaderValid = header === options.fields.join(',')
        if(!isHeaderValid){
            return{
                error: constants.error.FILE_FIELDS_ERROR_MESSAGE,
                valid: false
            }
        }   
   
        const isContentLengthAccpted = (
            fileWithoutHeader.length > 0 &&
            fileWithoutHeader.length <= options.maxLines
        )
        if(!isContentLengthAccpted){
            return{
                error: constants.error.FILE_LENGTH_ERROR_MESSAGE,
                valid:false
            }
        }

        return {valid:true}

    }

    static parseCSVToJSON(csvString){
        const lines = csvString.split('\n')
        // remove 1primeiro item do array aramazena nessa var
        // ele tbm alterar o array inital enato o line nao tem mais esse item
        const firstLine =  lines.shift()
        const header = firstLine.split(',')
       
        /*
            [
                '123,Hudson Martins,Javascript expert,23',
                '124,xuxa da silva,apresentadora,80',
                '212,Erick Wendel,Javascript Instructor,25'
            ]
        */
        const users = lines.map(line =>{
            /*
                [ '123', 'Hudson Martins', 'Javascript expert', '23' ],
            */
            const collumns = line.split(',')
            let user = {}
            for(const index in collumns){
                user[header[index]]  = collumns[index]
            }

            return  new User(user)
        })
        return users

    }
}

(async()=>{
    const filePath = './mocks/threeItems-valid.csv'
    const result =   File.csvToJson(filePath)
    
})()
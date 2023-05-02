import Sinon from "sinon";
import { Fibonacci } from "./fibonacci.js";
import assert from 'assert'

/*
    Temos ums lista de item e queremos calcurar o fibonacci de 3
    Fibonacci: o proximo valor corresponde a soma dos dois anteriores
    Se vc pegar um valor e somar com o seu sucessor resultado dessa somar vai ser o sucessor do sucessor
    dado 3
    0,1,1
    dado 5
    0,1,1,2,3 => pq 0+1 = 1+1 = 2+2 = 4+3 = 7 
*/
;
(async ()=>{
    {
        const fibonacci = new Fibonacci()
        const spy = Sinon.spy(fibonacci, fibonacci.execute.name)
        /*
            essa e uma metado que usar o generator
            entao eles returnan interators, (.next)
            existir tres formas para a gente nao ficar chamando esse next na mao
            1. usar o next em si
            2. for await
            3. spread/rest
        */
        for await (const i of fibonacci.execute(3)){}
        //console.log('callcount', spy.callCount)
        const expectedCallCount = 4
        assert.deepStrictEqual(spy.callCount, expectedCallCount)
    }

    {
        const fibonacci = new Fibonacci()
        const spy = Sinon.spy(fibonacci, fibonacci.execute.name)
        /*
            [0] input = 5 current 0, next = 1
            [1] input = 4 current 1, next = 1
            [2] input = 3 current 1, next = 2
            [3] input = 2 current 2, next = 3
            [4] input = 1 current 3, next = 5
            [5] input = 0 -> PARA 
        */
       const [...result] =  fibonacci.execute(5)

       const {args}  = spy.getCall(2)
       
       const expectedResult = [0,1,1,2,3]
       // Esses sao os dados da 2 chamada que esta comentada acima
       const expectedParams = Object.values({
        input:3,
        current:1,
        next:2
       })

       // comparando o agr que vem da chamada da function com 2 com os nosso dados do expectedParams
       assert.deepStrictEqual(args, expectedParams)
       assert.deepStrictEqual(result, expectedResult)
    }
})()
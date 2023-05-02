export class Fibonacci {
    //Generator
    *execute(input, current = 0, next =1){
        //console.log('execute')
        if(input == 0){
            return 0
        }
        // esse yield e o mesmo que o return e returna o dados sob demanada
        yield current
        // esse yield* ele nao returna, ele delegar uma execucao
        yield* this.execute(input-1, next, current+next)
    }
}
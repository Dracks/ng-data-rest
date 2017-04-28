import { StringUtils } from './string-utils';

describe('String utils', ()=>{
    it('Camelize', ()=>{
        var r = StringUtils.camelize('hola') 
        expect(r).toBe('Hola');
        expect(StringUtils.camelize('hola-mon')).toBe('HolaMon');
    });

    it ('Snaketize', ()=>{
        var r = StringUtils.snakize('HSHHHH');
        expect(r).toBe('hshhhh');
        expect(StringUtils.snakize('Hola')).toBe('hola');
        expect(StringUtils.snakize('HolaMon')).toBe('hola-mon');
        expect(StringUtils.snakize('HolaSMon3', '_')).toBe('hola_smon3');
    });
});
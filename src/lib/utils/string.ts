export class StringUtils {
    static camelize(name: string){
        var r = '';
        name
            .replace('_','-')
            .split('-')
            .forEach(element => {

                r += element[0].toUpperCase() + element.substr(1);
            });
        return r;
    }

    static snakize(name: string, separator: string = '-'){
        var r='';
        var uppercases=String(name).match(/[A-Z]/g);
        if (uppercases !== null){
            var lastIndex = -1;
            var lastSubstr = -1;
            uppercases.map(e => {
                lastSubstr = lastSubstr + 1 + name.substr(lastSubstr+1).indexOf(e);
                return lastSubstr;
            }).forEach((p) => {
                if (lastIndex+1 == p){
                    if (lastIndex>=0){
                        r+= name[lastIndex];
                    }
                } else {
                    r += name.substring(lastIndex,p) + separator;
                }
                lastIndex = p;
            });
            r+= name.substr(lastIndex);
            r = r.toLowerCase();
        }
        return r;
    }
}

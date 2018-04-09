class Token {
    static get(){
        if(this.id === undefined){
            return "0";
        }else{
            return this.id;
        }
    }
    static set(id){
        this.id=id;
    }
}

export default Token;
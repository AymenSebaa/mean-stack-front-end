export class Employee {
    
    constructor(
        private __id: string, 
        private _name: string,
        private _position: string,
        private _office: string,
        private _salary: number
    ){};

    
    public get _id() : string {
        return this.__id
    }
    public get name() : string {
        return this._name;
    }
    public get position() : string {
        return this._position;
    }
    public get office() : string {
        return this._office;
    }
    public get salary() : number {
        return this._salary;
    }

    public set _id(_id) {
        this.__id = _id;
    }
    public set name(name) {
        this._name = name;
    }
    public set position(position) {
        this._position = position;
    }
    public set office(office) {
        this._office = office;
    }
    public set salary(salary){
        this._salary = salary;
    }
    
       
}

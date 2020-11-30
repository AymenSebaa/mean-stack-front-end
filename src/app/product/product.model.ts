export class Product {
    
    constructor(
        private __id: string, 
        private _title: string,
        private _category: string,
        private _images: string[],
        private _desc: string,
        private _price: number,
        private _tags: string[],
        private _userId: string,
        private _createdAt: Date,
    ){};

    
    public get _id() : string {
        return this.__id
    }
    public get title() : string {
        return this._title;
    }
    public get category() : string {
        return this._category;
    }
    public get images() : string[] {
        return this._images;
    }
    public get desc() : string {
        return this._desc;
    }
    public get price() : number {
        return this._price;
    }
    public get tags() : string[] {
        return this._tags;
    }
    public get userId() : string {
        return this._userId;
    }
    public get createdAt() : Date {
        return this._createdAt;
    }

    public set _id(_id: string) {
        this.__id = _id;
    }
    public set title(title: string) {
        this._title = title;
    }
    public set category(category: string) {
        this._category = category;
    }
    public set images(images: string[]) {
        this._images = images;
    }
    public set desc(desc: string){
        this._desc = desc;
    }
    public set price(price: number){
        this._price = price;
    }
    public set tags(tags: string[]) {
        this._tags = tags;
    }
    public set userId(userId: string){
        this._userId = userId;
    }
    public set createdAt(createdAt: Date){
        this._createdAt = createdAt;
    }
       
}

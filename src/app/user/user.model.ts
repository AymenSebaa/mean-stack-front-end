export class User {
    constructor(private __id: string, private _email: string, private _password: string){}
 
    public get _id() : string {
        return this.__id;
    }
    public get email() : string {
        return this._email;
    }
    public get password() : string {
        return this._password;
    }

    public set _id(_id : string) {
        this.__id = _id;
    }
    public set email(email : string) {
        this._email = email;
    }
    public set password(password: string) {
        this._password = password;
    }

}

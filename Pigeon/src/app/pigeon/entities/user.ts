
export class User {

    public static clone(user: User) : User {
        return new User(
            user.name,
            user.password,
            user.id,
            user.admin
        )
    }

    constructor(
        public name: String,
        public password: String,
        public id: number,
        public admin: boolean
    ) {}

    toString(): string {
        return "name: " + this.name + " is admin -> " + this.admin;
    }
}
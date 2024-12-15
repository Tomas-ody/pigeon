
export class User {

    public static clone(user: User) : User {
        return new User(
            user.username,
            user.password,
            user.id,
            user.role
        )
    }

    constructor(
        public username: String,
        public password: String,
        public id: number,
        public role: String
    ) {}

    toString(): string {
        return "name: " + this.username + " is admin -> " + this.role;
    }
}
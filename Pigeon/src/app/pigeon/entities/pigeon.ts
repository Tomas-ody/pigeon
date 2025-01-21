import { User } from "./user";

export class Pigeon {

    public static clone(pigeon: Pigeon) : Pigeon {
        return new Pigeon(
            pigeon.id,
            pigeon.motherId,
            pigeon.fatherId,
            pigeon.kidsId,
            pigeon.name,
            pigeon.color,
            pigeon.breed,
            pigeon.ownerId,
            pigeon.owner
        )
    }

    constructor(
        public id: number,
        public motherId: number,
        public fatherId: number,
        public kidsId: Array<number>,
        public name: string,
        public color: string,
        public breed: string,
        public ownerId: number,
        public owner?: User
    ) {}

    toString(): string {
        return "name: " + this.name + " breed: " + this.breed;
    }
}
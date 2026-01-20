export class Admin {
    constructor(
        public readonly email: string,
        public readonly password?: string // Optional because we might not always return it
    ) { }
}

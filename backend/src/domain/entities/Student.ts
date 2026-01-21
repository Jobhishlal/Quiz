export class Student {
    constructor(
        public readonly username: string,
        public readonly email: string,
        public readonly dob: Date,
        public readonly password?: string, // Optional because we might load student without password for profile view
        public readonly _id?: string
    ) { }

    // Add validation logic if needed
    validate(): void {
        if (!this.username) throw new Error("Username is required");
        if (!this.email) throw new Error("Email is required");
        // Add more specific validation
    }
}

export class User {
  constructor(
    public readonly email: string,
    public readonly passwordHash: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
    public readonly id?: number,
  ) {}
}

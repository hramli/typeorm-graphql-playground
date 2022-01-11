import { Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entity/User";
import { createUser, getUsers } from "../services/UserService";

@Resolver(User)
export class UserResolver {

  @Query(returns => [User])
  async users() {
    return await getUsers();
  }

  @Mutation(returns => User)
  async createUser(
    firstName: string,
    lastName: string,
    age: number
  ) {
    return await createUser(firstName, lastName, age);
  }
}

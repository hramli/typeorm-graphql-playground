import { User } from "../entity/User";

export async function createUser(
  firstName: string,
  lastName: string,
  age: number
){
  let user = new User();
  user.firstName = firstName;
  user.lastName = lastName;
  user.age = age;

  await user.save();

  return user;
}

export async function getUsers() {
  let users = await User.find();
  return users;
}

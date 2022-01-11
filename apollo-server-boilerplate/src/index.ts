import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";

createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Harry";
    user.lastName = "Potter";
    user.age = 21;

    await user.save();
    console.log("Saved a new user with id: " + user.id);

    console.log("Pulling all users from the database...");
    const users = await User.find();

    console.log("Users: ");
    console.log(users);

}).catch(error => console.log(error));

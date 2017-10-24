import { UserModel } from '../apina';

export class User {

  name: string;
  email: string;
  superuser: boolean;
  userModel: UserModel;

  constructor(userModel: UserModel) {
    this.name = userModel.firstName + ' ' + userModel.lastName;
    this.email = userModel.email;
    this.superuser = userModel.superuser;
    this.userModel = this.userModel;
  }

  getUserModel(){
    return this.userModel;
  };

  print() {
    return `- = ${this.name} ${this.email} Admin: ${this.superuser ? 'Yes' : 'No'} = -`;
  }
}

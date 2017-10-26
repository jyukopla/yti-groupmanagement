import { User as ApinaUser} from '../apina';

export class User {

  firstName: string;
  lastName: string;
  email: string;
  superuser: boolean;

  constructor(userModel: ApinaUser) {
    this.firstName = userModel.firstName;
    this.lastName = userModel.lastName;
    this.email = userModel.email;
    this.superuser = userModel.superuser;
  }

  get name() {
    return this.firstName + ' ' + this.lastName;
  }
}

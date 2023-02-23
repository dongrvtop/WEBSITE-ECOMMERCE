import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor() {}

  createUser(data: CreateUserDto) {
    //console.log(`Create user success with data: ${JSON.stringify(data)}`);
    return `Create user success with data: ${JSON.stringify(data)}`;
  }

  getUser() {
    return {
      email: 'dongnd@gmail.com',
      firstName: 'Đồng',
      lastName: 'Nguyễn Duy',
    };
  }
}

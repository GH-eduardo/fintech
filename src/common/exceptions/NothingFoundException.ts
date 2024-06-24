import { HttpException, HttpStatus } from '@nestjs/common';

export class NothingFoundException extends HttpException {
  constructor() {
    super('Nothing was found, maybe nothing was registered yet...', HttpStatus.BAD_REQUEST);
  }
}
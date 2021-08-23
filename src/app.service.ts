import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return "<div style='height: 100%; background-color: #EEE; display:flex; justify-content: center; align-items: center'><h1>Welcome to the Best Backend Ever Done 💪🏻💪🏻💪🏻</h1></div>";
  }
}

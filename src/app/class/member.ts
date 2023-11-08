import { Position } from "./position";
import { Badge } from "./badge";
export class Member {

  userId!:any;
  username!:any;
  memberId!: any;
  image!: String;
  firstName!: String;
  lastName!: String;
  password!: String;
  email!: any;
  finalNote!: number;
  gitLink!: String;
  driveLink!: String;
  positions: any;
  lstPositionId: any;
  position!: Position[];

  badges!: Badge[];
}

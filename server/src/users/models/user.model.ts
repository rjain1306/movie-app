import { AutoMap } from '@automapper/classes';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
} from 'typeorm';
import { AuditInfo } from '../../core/domain';

@Entity({
  schema: 'public',
})
export class User extends BaseEntity {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    nullable: false,
  })
  private readonly _id: string;

  @AutoMap()
  public get id(): string {
    return this._id;
  }
  

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false,
  })
  private _name: string;

  @AutoMap()
  public get name(): string {
    return this._name;
  }

  @Column({
    name: 'email_address',
    type: 'varchar',
    nullable: false,
  })
  private _emailAddress: string;

  @AutoMap()
  public get emailAddress(): string {
    return this._emailAddress;
  }

  @Column({
    name: 'password',
    type: 'varchar',
    nullable: false,
  })
  private _password: string;

  @AutoMap()
  public get password(): string {
    return this._password;
  }
  
  @Column({
    name: 'image_url',
    type: 'varchar',
    nullable: true,
  })
  private _imageUrl: string;

  @AutoMap()
  public get imageUrl(): string {
    return this._imageUrl;
  }

  @Column(() => AuditInfo, { prefix: false })
  private _auditInfo: AuditInfo;

  @AutoMap()
  public get auditInfo(): AuditInfo {
    return this._auditInfo;
  }

  constructor(
    id: string,
    name: string,
    emailAddress: string,
    password: string,
    createdBy?: string,
  ) {
    super();
    this._id = id;
    this._name = name;
    this._emailAddress = emailAddress;
    this._password = password;
    this._auditInfo = new AuditInfo(createdBy);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  update(
    name: string,
    emailAddress: string,
    password: string,
  ) {
    this._name = name;
    this._emailAddress = emailAddress;
    this._password = password;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public setProfilePhoto(imageUrl: string, modifiedBy: string = '') {
    this._imageUrl = imageUrl;
    this._auditInfo.setUpdated(modifiedBy);
  }

}

import {Entity, ObjectID, ObjectIdColumn, Column, PrimaryGeneratedColumn, PrimaryColumn, BaseEntity, JoinColumn, OneToOne, OneToMany} from "typeorm";
import {ObjectId} from'mongodb';
import { Employee } from "./employee.entity";


@Entity()
export class  Department extends BaseEntity {

    @ObjectIdColumn()
    _id: ObjectId;

    @Column ({
        length: 300
    })
    name?: string;

    @Column()
    createdAt?: Date;
    
    @OneToMany(type => Employee, employee => employee._id, {
        cascade: true,
        eager: true,
    })
    @JoinColumn({ referencedColumnName: "_id" })
    employee: Employee;
}

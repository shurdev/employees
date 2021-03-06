import {Entity, ObjectID, ObjectIdColumn, Column, PrimaryGeneratedColumn, PrimaryColumn, BaseEntity, JoinTable, ManyToMany, JoinColumn, OneToOne, OneToMany} from "typeorm";
import {ObjectId} from'mongodb';
import { Department } from "./department.entity";


@Entity()
export class  Employee  extends BaseEntity{

    @ObjectIdColumn()
    _id: ObjectId;

    @Column ({
        length: 300
    })
    employeeCode?: number;

    @Column ({
        length: 300
    })
    name?: string;

    @Column ({
        length: 300
    })
    address?: string;

    @Column ({
        length: 300
    })
    email?: string;

    @Column()
    createdAt?: Date;
    
    // @Column ({
    //     length: 300
    // })
    // department?: string;
    // @OneToOne(type => Department, department => department._id, {
    //     cascade: true,
    //     eager: true,
    // })
    // @JoinColumn({ referencedColumnName: "_id" })
    @Column()
    department: string;
}

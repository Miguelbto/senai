import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";

const { nanoid } = require('nanoid')

export enum DeveloperLevel {
    Junior = 'junior',
    Pleno = 'pleno',
    Senior = 'senior',
}



@Entity('Developers')
export class Developer {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({ type: 'simple-enum' })
    developerLevel: DeveloperLevel

    @Column()
    active: boolean

    @Column()
    dateOfBirth: Date | null;



    @BeforeInsert()
    generateId() {
        this.id = `dev_${nanoid()}`
    }


    constructor(props: {
        name: string,
        email: string,
        developerLevel: DeveloperLevel,
        active: boolean,
        dateOfBirth?: Date | null
    }, id?: string,) {
        Object.assign(this, props)
        this.id = id ?? crypto.randomUUID()
    }
}



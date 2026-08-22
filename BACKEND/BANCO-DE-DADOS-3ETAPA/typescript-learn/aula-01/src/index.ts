// type anotation 

import { userInfo } from "node:os";

const myName: string = 'miguel'
const myYearsOld: number = 18
const ImOveryear: boolean = true
const myVar: null = null // undefined // nem sempre recebemos dados concretos (requisição da API, )

function sum(a: number, b: number): number {
    return a + b
}

sum(2, 5)

function greet(name: string, age?: number) {
    //o ? no age deixa o parâmetro opcional, porém só os ultimos podem ser opcionais
}

const animal = { //inferencia de tipo
    name: 'gato',
    age: 10
}

animal.age


// interface - tipagem de objetos 

interface UserWallet {
    coins?: number,
    credits?: number,
}

interface User {
    name: string,
    createdAt: Date,
    wallet?: UserWallet
}

function createuser(name: string): User {
    return { name: 'miguel', createdAt: new Date()}
}

function updataWallet(user: User, wallet: UserWallet) {
    user.wallet = { ...user.wallet, ...wallet}
}

const rinko = createuser('rinko')

updataWallet(rinko, { coins:10})




declare global {
    interface Console {
        sayHello(): void
    }
}

Object.assign(console, {
    sayHello(){
        console.log('Hello')
    }
})


console.sayHello()


interface Admin extends User{
    ban(user: User): void,
    kick(user: User): void

}

function promoteuser(user: User): Admin {
    return {
        ...user,
        ban(userToBan) {
            console.log(userToBan,'foi banido por:', this.name)
        },
        kick(userToKick) {
            console.log(userToKick, 'foi expulso por:', this.name)
        }
    }
}


const adminRincko = promoteuser(rinko)

adminRincko.name    

function adminAction(admin: Admin){

}

adminAction(adminRincko) //Respeitar o contrato com interfaces



// types - interface define a estrutura de um objeto o type de qualquer coisa, combina interface com tipos primitivos do JS

type Input  = string | number | User

function prompt(input: Input){
}

prompt('Rinko')

interface Dog {
    name: string,
    breed: string,
    bark(): string
}

interface Cat {
    name: string,
    color: string,
    meow(): string
}

interface Bird {
    name: string,
    wingspan: number,
    chirp(): string
}

interface Cow {
    name: string,
    weight: number,
    moo(): string,
}

type Animal = Dog | Cat | Bird | Cow

function createAnimal(animal: Animal){

}

createAnimal({
    name: 'matilda',
    breed: 'vira lata',
    bark: () => {
        return 'auau'
    },

})

type UserWallet1 = {
    coins?: number,
    credits?: number,
}

type User1 = {
    name: string, 
    createdAt: Date,
    wallet?: UserWallet1,
}

type Admin1 =  User1 & { //extends no type
    ban(user: User): void;
    kick(user: User): void;
}


// ===============================================
// TUPLAS - caixa de itens em posições

type NameList = string[]


type CalendarDate = [day: number, month: number, year: number]

const list: NameList = [];
list.push('manga')

const date: CalendarDate = [30, 56, 5]

function createDate(date: CalendarDate){
    const [day, month, year] = date
}




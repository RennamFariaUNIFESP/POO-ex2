import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import crypto from 'crypto';

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    registerBike(bike: Bike): undefined{
      for( const rBikes of this.bikes){
        if(rBikes.id === bike.id)
          throw new Error('This bike already have a id.')
      }
      bike.id = crypto.randomUUID()
      this.bikes.push(bike)
    }

    removeUser(user: User): void{
      if(this.findUser(user.email) == undefined){
        throw new Error('User with this id is not registered')
      } 
      else{
        const index = this.users.indexOf(user)
        if(index != -1)
          this.users.splice(index, 1)
      }
    }
  
    rentBike(user: User, bike: Bike, dateRent: Date, dateFinalRent: Date): Rent{
      for(const rRent of this.rents){
        if(rRent.bike === bike){
            throw new Error('The bike is already leased in this date.')
          }
        }
        return Rent.create([], bike, user, dateRent, dateFinalRent)
      }
              
    // outra forma de fazer
    //     if (this.users.some(rUser => { return rUser.email === user.email })) {
    //         throw new Error('User with same email already registered.')
    //     }
        //mesma coisa do que fazer
    //    for(var i = 0; i < this.user.lenght; i++){
    //     if(this.user[i].email == user.email){
    //       throw new Error('Duplicate user.')
    //     }
    //   }

    returnBike(rent: Rent, dateReturned: Date): void{
      if((rent.dateReturned === undefined)){
        rent.dateReturned = dateReturned;
        this.rents.push(rent)
      }
      else{
        throw new Error('This bike already have date returned.')
      }
    }

    findUser(email: string): User| undefined{  //irá retornar User ou undefined, se nao encontrar
      return this.users.find(user => {user.email === email})
    }
    
     registerUser(user: User): void {
         for(const rUser of this.users){
             if(rUser.email === user.email){
               throw new Error('Duplicate user.')
          }
         }
      
      user.id = crypto.randomUUID()
      this.users.push(user)
    }
}
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';

export interface IProfile {
  firstName: string;
  lastName: string;
  username: string;
  age: number;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  public user!: IProfile;

  constructor() { }

  getProfileUser(): Promise<IProfile> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.round(Math.random())) {
          this.user = {
            firstName: 'Michael',
            lastName: 'Collins',
            username: 'michael.collins',
            age: 30,
            email: 'michael.collins@blueface.com'
          };
          resolve(this.user)
        } else {
          reject({ error: 'Profile not found' });
        }
      }, Math.random() * 5000);
    });
  }

  setName(firstName: string): Promise<IProfile> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.round(Math.random())) {
          this.user.firstName = firstName;
          resolve(this.user);
        } else {
          reject({ error: 'Invalid name' });
        }
      }, Math.random() * 5000);
    })
  }

  setUserEmail(firstName: string, lastName: string): Promise<IProfile> {
    const bluefaceEmail = '@blueface.com';
    const firstNameEmail = firstName.replace(/ /g,''); // using replace to remove any spaces for double parrel names
    const lastNameEmail = lastName.replace(/ /g, '');
    const email = firstNameEmail + lastNameEmail + bluefaceEmail
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.round(Math.random())) {
          this.user.email = email;
          resolve(this.user);
        } else {
          reject({ error: 'Error on email generation' });
        }
      }, Math.random() * 5000);
    })
  }
}

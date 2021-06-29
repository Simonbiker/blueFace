import { Component, OnInit } from '@angular/core';
import { IProfile, ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {

  public title = 'Profile';
  public user!: IProfile;
  public dataloading: boolean = true;
  public dataError: boolean = false;
  public savingProfile: boolean = false;
  public newName: String = '';
  public newLastName: string = '';
  constructor(private profile: ProfileService) { }

  ngOnInit(): void {
    this.user = {firstName: '', lastName: '', username: '...', age: 0};
    this.getUserData(); 
  }

  getUserData() {
    this.dataloading = true;
    this.profile.getProfileUser().then(profile => {
      this.dataError = false;
      console.log('Check object', profile);
      this.user.firstName = profile.firstName;
      this.user.lastName = profile.lastName;
      this.user.username = profile.username;
      console.log('firstname', this.user.firstName);
      this.dataloading = false;
    }).catch((err) => {
      this.dataError = true;
      this.getUserData();
    console.log(err);
  }) 
  }

  saveProfile(user:IProfile) {
    
    console.log('click button',user);
    this.savingProfile = true
    this.profile.setName(user.firstName).then(newObject => {
      this.newName = this.user.firstName;
      console.log('checking user', user.firstName);
    }).catch((err) => {
      this.dataError = true;
    });
    
  }

}

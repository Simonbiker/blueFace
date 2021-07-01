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
  public savingProfile: boolean = false;
  public savingErrorMessage: string = '';
  public dataErrorMessage: string = '';
  constructor(private profile: ProfileService) { }

  ngOnInit(): void {
    //Note: kept the age the same as the interface as there is no input for changing the age.
    this.user = {firstName: '', lastName: '', username: '...', age: 30, email: '...'};
    this.getUserData(); 
  }

  getUserData() {
    this.dataloading = true;
    this.profile.getProfileUser().then(profile => {
      this.dataErrorMessage = ''
      this.user.firstName = profile.firstName;
      this.user.lastName = profile.lastName;
      this.user.username = profile.username;
      this.dataloading = false; 
    }).catch((dataErr) => {
      this.dataloading = false; 
      this.dataErrorMessage = 'Error! ' + dataErr.error;
      this.getUserData();
    })
     
  }

  saveProfile(user:IProfile) {
    this.clearErrors();
    this.savingProfile = true;
    this.profile.setName(user.firstName).then(updatedUser => {
      this.user = updatedUser;
      this.savingErrorMessage = '';
      this.savingProfile = false;
        this.profile.setUserEmail(user.firstName, user.lastName).then(updateEmail => {
        //Do nothing
        }).catch((emailErr) => {
          this.savingProfile = false;
        this.savingErrorMessage = 'Error! ' + emailErr.error;
      });
    }).catch((err) => {
      this.savingProfile = false;
      this.savingErrorMessage = 'Error! ' + err.error;
    })
  }

  clearErrors() {
    this.dataErrorMessage = '';
    this.savingErrorMessage = '';
  }
}

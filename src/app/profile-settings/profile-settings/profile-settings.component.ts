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
  public savingErrorMessage: string = '';
  constructor(private profile: ProfileService) { }

  ngOnInit(): void {
    //Note: kept the age the same as the interface as there is no input for changing the age.
    this.user = {firstName: '', lastName: '', username: '...', age: 30, email: ''};
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
    this.profile.setName(user.firstName).then(updatedUser => {
      this.user = updatedUser;
      this.savingErrorMessage = '';
      console.log('checking user', this.user.firstName);
    }).catch((err) => {
      this.savingErrorMessage = 'Error! ' + err.error;
    });
  }
}

// To do:
// 1. Load the profile object once the ProfileSettings component is initialized, display the username, and populate the first name into the input field. If the request results in an error, we should automatically fetch it again until we get it. DONE

// 2. While the data is not ready, we should display the label “Loading profile...” and disable the inputs.
// DONE

// 3. Once the data is ready, clicking the Save button we should make use of the setName() method and update the first name of the user in the profile. While this is happening we should display the “Saving Profile...” label. If the service
// returns an error, we should display the text "Error!" and the error message returned by the service. This text should be removed as soon as the value in the input changes or the "Save" button is hit again.

// 4. Add a new input field to update the “last name” too. There should be only 1 Save button to update both fields at the same time. This data should be sent to the profile service using the same setName() method.

// 5. Add a new field to the profile object: “email”. This should be included in both the service and component. We want to display this new field in the component, but do not update it manually.
// In the service we need a new method setUserEmail, similar to setName but to update the "user.email". The email value needs to be set directly from “[user.firstName].[user.lastName]@blueface.com”. Make sure the email is valid,
// removing any spaces from the first/last name fields.
// This method should be called automatically after setName() successfully finished. It should emulate a different http request (use a timeout like the other), and can also return an error sometimes. If that happens, the component should
// display a different error message “Error on email generation”, and the firstName and lastName should be reverted to the initial value (before setName).
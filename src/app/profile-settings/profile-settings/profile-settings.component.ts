import { Component, OnInit } from '@angular/core';
import { IProfile, ProfileService } from 'src/app/service/profile.service';


@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {

  public title = 'Profile';
  public user!: IProfile
  constructor(private profile: ProfileService) { }

  ngOnInit(): void {
  }

}

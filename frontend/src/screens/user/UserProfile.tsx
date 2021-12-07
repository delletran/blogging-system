import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { Auth } from '../../features/auth/auth-slice'
import { ProfileUpdateForm, ProfileUpdateImage } from './ProfileUpdate'
import 'react-tabs/style/react-tabs.css'
import { IProfile } from './../../app/api'

export interface IUserProfileProps {
  auth: Auth
  userData?: IProfile
}

const UserProfile = ({ auth, userData }: IUserProfileProps) => {
  return (
    <div>
      <h3>User Account</h3>
      <Tabs>
        <TabList>
          <Tab>User Profile</Tab>
          <Tab>Profile Avatar</Tab>
        </TabList>

        <TabPanel>
          <ProfileUpdateForm auth={auth} userData={userData} />
        </TabPanel>
        <TabPanel>
          <ProfileUpdateImage auth={auth} userData={userData} />
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default UserProfile

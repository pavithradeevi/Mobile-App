const identityApi = '/Identity.API';
const cstarApi = '/CSTAR.API';
const navdataApi='/NAVDATA.API';

export const apiKeys = {
   loginkey: identityApi + '/Authentication/Login',
  signupkey: identityApi + '/Authentication/register',
  personalDetailsKey: cstarApi + '/CrewPersonals/',
  rosterAppDetails: cstarApi + '/RosterAppDetails',
  navData:navdataApi+'Airport?clientName=firefly',
};

export interface UserLanguage {
  name: string;
  value: string;
}

export interface UserSettings {
  language: UserLanguage;
  timezone: string;
  locale: string;
}

export interface User {
  id: string | null;
  username: string;
  designation: string;
  role: string;
  department: string;
  workCenterName: string | undefined;
  workCenterId: string | undefined;
  name?: string;
  email: string;
  skills: Array<string>;
  signature: string;
  city: string;
  country: string;
  settings: UserSettings;
}

// {
//     "language": {
//         "name": "English",
//         "value": "en"
//     },
//     "timezone": "Asia/Kolkata",
//     "locale": "en_US"
// }

export interface UserProfile {
    name: string;
    blood: string;
    allergies: string;
}

export interface FamilyPlan {
    meetingPoint: string;
    contactPerson: string;
}

export interface AppSettings {
    textSize: number;
    highContrast: boolean;
    quickAccess: boolean;
    sosMessage: string;
    profile: UserProfile;
    plan: FamilyPlan;
}

export const defaultSettings: AppSettings = {
    textSize: 2,
    highContrast: false,
    quickAccess: true,
    sosMessage: 'ACİL DURUM! Enkaz altındayım, Lütfen yardım edin!',
    profile: { name: '', blood: '', allergies: '' },
    plan: { meetingPoint: '', contactPerson: '' }
};

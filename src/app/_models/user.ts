import { Photo } from './Photo';
export interface User {
    id: number;
    username: string;
    Gender: string;
    age: number;
    dateOfBirth: string;
    knownAs: string;
    created: Date;
    lastActive: Date;
    introduction?: string;
    lookingFor?: string;
    interests?: string;
    city: string;
    country: string;
    photoUrl: string;
    photos?: Photo[];
}

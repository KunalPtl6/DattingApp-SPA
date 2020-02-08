import { Photo } from './Photo';
export interface User {
    id: number;
    username: string;
    Gender: string;
    age: number;
    DateOfBirth: string;
    knownAs: string;
    Created: Date;
    lastActive: Date;
    introduction?: string;
    lookingFor?: string;
    interests?: string;
    city: string;
    country: string;
    photoUrl: string;
    photos?: Photo[];
}

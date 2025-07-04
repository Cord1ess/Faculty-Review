import DefaultMan from '../assets/Default_Man.svg';
import DefaultWoman from '../assets/Default_Woman.svg';

// List of common woman names for inference
const womanNames = [
    'Sarah', 'Emily', 'Lisa', 'Jane', 'Anna', 'Emma', 'Olivia', 'Sophia', 'Isabella', 'Mia', 'Charlotte', 'Amelia', 'Harper', 'Evelyn', 'Abigail', 'Ella', 'Avery', 'Scarlett', 'Grace', 'Chloe', 'Camila', 'Penelope', 'Riley', 'Layla', 'Lillian', 'Nora', 'Zoey', 'Mila', 'Aubrey', 'Hannah', 'Lily', 'Addison', 'Eleanor', 'Natalie', 'Luna', 'Savannah', 'Brooklyn', 'Leah', 'Zoe', 'Stella', 'Hazel', 'Ellie', 'Paisley', 'Audrey', 'Skylar', 'Violet', 'Claire', 'Bella', 'Aurora', 'Lucy', 'Samantha', 'Caroline', 'Genesis', 'Aaliyah', 'Kennedy', 'Kinsley', 'Allison', 'Maya', 'Madelyn', 'Adeline', 'Alexa', 'Ariana', 'Elena', 'Gabriella', 'Naomi', 'Alice', 'Sadie', 'Hailey', 'Eva', 'Emilia', 'Autumn', 'Quinn', 'Nevaeh', 'Piper', 'Ruby', 'Serenity', 'Willow', 'Everly', 'Cora', 'Kaylee', 'Lydia', 'Aubree', 'Arianna', 'Eliana', 'Peyton', 'Melanie', 'Gianna', 'Isabelle', 'Julia', 'Valentina', 'Nova', 'Clara', 'Vivian', 'Reagan', 'Mackenzie', 'Madeline', 'Brielle', 'Delilah', 'Isla', 'Rylee', 'Katherine', 'Sophie', 'Josephine', 'Ivy', 'Liliana', 'Jade', 'Maria', 'Taylor', 'Hadley', 'Kylie', 'Emery', 'Adalynn', 'Jasmine', 'Morgan', 'Alyssa', 'Valeria', 'Andrea', 'Kayla', 'Brooklynn', 'Payton', 'Juliana', 'Bailey', 'Delaney', 'Isabel', 'Rose', 'Nicole', 'Mckenzie', 'London', 'Mary', 'Lauren', 'Genevieve', 'Sienna', 'Alexandra', 'Jocelyn', 'Jordyn', 'Trinity', 'Faith', 'Alexis', 'Ariel', 'Ashley', 'Brianna', 'Danielle', 'Elise', 'Fiona', 'Gabrielle', 'Haley', 'Jenna', 'Jessica', 'Kaitlyn', 'Kimberly', 'Laila', 'Margaret', 'Melody', 'Molly', 'Rachel', 'Rebecca', 'Sara', 'Sydney', 'Vanessa', 'Victoria', 'Ximena', 'Yaretzi', 'Alina', 'Angela', 'Athena', 'Aubree', 'Ayla', 'Blakely', 'Camilla', 'Catalina', 'Charlee', 'Daisy', 'Diana', 'Eden', 'Eloise', 'Esther', 'Evie', 'Gemma', 'Gracie', 'Harmony', 'Helen', 'Hope', 'Julianna', 'June', 'Kali', 'Kara', 'Katherine', 'Kendall', 'Kira', 'Lana', 'Lila', 'Lola', 'Lucia', 'Maggie', 'Maisie', 'Marley', 'Miriam', 'Nina', 'Noelle', 'Phoebe', 'Raegan', 'Remi', 'Rosalie', 'Sage', 'Samara', 'Selena', 'Tessa', 'Tiana', 'Vera', 'Willa', 'Winter', 'Zara'
];

export function getFacultyProfilePic(faculty) {
    if (faculty.profilePic) return faculty.profilePic;
    // Use gender field if present
    if (
        faculty.gender === 'female' ||
        faculty.gender === 'woman' ||
        faculty.gender === 'Female' ||
        faculty.gender === 'Woman'
    ) {
        return DefaultWoman;
    }
    // Infer gender from name (robust)
    const nameParts = faculty.name?.split(' ') || [];
    let firstName = nameParts[0];
    if (['Dr.', 'Prof.', 'Dr', 'Prof'].includes(firstName)) {
        firstName = nameParts[1] || '';
    }
    if (womanNames.some(n => n.toLowerCase() === firstName?.toLowerCase())) {
        return DefaultWoman;
    }
    return DefaultMan;
}

export { DefaultMan, DefaultWoman }; 
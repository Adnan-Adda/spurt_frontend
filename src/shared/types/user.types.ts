export interface LoginCredentials {
    username: string; // The API expects 'username' for the email
    password: string;
}

// Definition for a user
export interface User {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    // ToDo remove password from user list when fetching it
    usergroup: { // <-- ADDED
        name: string;
        groupId: number;
        createdBy: string;
    };
    // Add any other user properties you need from the API response
}

// Definition for the new user payload
export interface NewUser {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    userGroupId: number;
}

// Definition for the user update payload
export interface UpdateUser {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    userGroupId: number;
    password?: string; // Password is optional when updating
}
// Definition for a user role/group
export interface Role {
    groupId: number;
    name: string;
    isActive: number;
}

// Definition for the new role payload
export interface NewRole {
    name: string;
    status: number; // API expects 'status' (1 for active, 0 for inactive)
}

// Definition for the role update payload
export interface UpdateRole extends NewRole {
}

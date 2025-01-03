import {Person} from "@/types/person";
import {Membership} from "@/types/membership";

export interface Member {
    EmergencyContact: string;
    JoinDate: string;
    MemberID: number;
    MembershipID: number;
    PersonID: number;
    memberBookings?: MemberBooking[];
    membership: Membership
    payments: never[]; // You might want to create a specific type for payments
    person: Person;
}

// Class type
export interface Class {
    ClassID: number;
    ClassName: string;
    Description: string;
    ClassType: string;
    Duration: number; // Duration in minutes
    MaxParticipants: number;
    EmployeeID: number;
    CenterID: number;
    ScheduleDate: string; // ISO date string
    StartTime: string; // ISO time string
    EndTime: string; // ISO time string
}

// MemberBooking type
export interface MemberBooking {
    BookingID: number;
    ClassID: number;
    BookingDate: string; // ISO date string
    Status: string;
    MemberID: number;
    class: Class; // Nested class details
}
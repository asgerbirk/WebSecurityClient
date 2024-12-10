import {Person} from "@/types/person";

export interface Member {
    MemberID: number;
    PersonID: number;
    MembershipID: number | null;
    JoinDate: string;
    EmergencyContact: string;
    membership: null;
    person: Person;
    memberBookings: MemberBooking[];
    payments: never[]; // You might want to create a specific type for payments
}

export interface MemberBooking {
    MemberBookingID: number;
    MemberID: number;
    BookingID: number;
}

'use client'
import {useMemberData} from "@/components/pages-my-information";

export function MemberProfile() {
    const { memberData, isLoading, error } = useMemberData();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!memberData) return <div>No member data found</div>;
    console.log('memberData', memberData.person.FirstName);

    return (
        <div>
            <h1>Member Profile</h1>
            <p>Name: {memberData.person.FirstName} {memberData.person.LastName}</p>
            <p>Email: {memberData.person.Email}</p>
            <p>Phone: {memberData.person.Phone}</p>
            <p>Join Date: {new Date(memberData.JoinDate).toLocaleDateString()}</p>
        </div>
    );
}
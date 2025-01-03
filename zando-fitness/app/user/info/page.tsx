import {MemberProfile} from "@/components/member-profile";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {redirect} from "next/navigation";


export default async function MyInformationPage() {
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect('/login');
    }
    return (
        <MemberProfile userId={session?.user.userId} />
    );
}
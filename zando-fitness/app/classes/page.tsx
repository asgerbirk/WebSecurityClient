import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {redirect} from "next/navigation";
import {Classes} from "@/components/pages-classes";


export default async function ClassesPage() {
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect('/login');
    }
    return (
        <Classes memberId={session?.user.memberId} />
    );
}
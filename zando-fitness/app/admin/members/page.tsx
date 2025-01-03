import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {redirect} from "next/navigation";
import {Members} from "@/components/pages-admin-members";


export default async function AdminPage() {
    const session = await getServerSession(authOptions)
    if (session?.user.role != "ADMIN") {
        redirect('/');
    }
    return (
        <Members />
    );
}
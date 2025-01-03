import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {redirect} from "next/navigation";
import {Members} from "@/components/pages-admin-members";
import {AdminProducts} from "@/components/admin-products-page";


export default async function ProductsAdminPage() {
    const session = await getServerSession(authOptions)
    if (session?.user.role != "ADMIN") {
        redirect('/');
    }
    return (
        <AdminProducts />
    );
}
'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { format } from 'date-fns'
import { Search, Edit, Trash2 } from 'lucide-react'
import {useToast} from "@/hooks/use-toast";
import {Member} from "@/types/user-info";


export function Members() {
  const [isLoading, setIsLoading] = useState(true)
  const [members, setMembers] = useState<Member[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const {toast} = useToast()

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_ZANDO_API}/members`);
        if (!response.ok) {
          throw new Error('Failed to fetch memberships');
        }
        const data = await response.json();
        setMembers(data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Could not load memberships. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false); // Ensure isLoading is set to false regardless of success or failure
      }
    };

    fetchMemberships().then(r => r);
  }, [toast]);

  const filteredMembers = members.filter(member => 
    member.person.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.person.LastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.person.Email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // const handleDelete = async (id: number) => {
  //   try {
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_ZANDO_API}/members/${id}`, {
  //       method: "DELETE",
  //     });
  //
  //     if (!response.ok) {
  //       throw new Error("Failed to delete member");
  //     }
  //
  //     setMembers(prevMembers => prevMembers.filter(member => member.MemberID !== id));
  //
  //     toast({
  //       title: "Success",
  //       description: "Member deleted successfully.",
  //     });
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "Could not delete member. Please try again later.",
  //       variant: "destructive",
  //     });
  //   }
  // };
  //
  // const handleEdit = async (id: number, updatedMember: Partial<Member>) => {
  //   try {
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_ZANDO_API}/members/${id}`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(updatedMember),
  //     });
  //
  //     if (!response.ok) {
  //       throw new Error("Failed to update member");
  //     }
  //
  //     const updatedData = await response.json();
  //
  //     setMembers(prevMembers =>
  //         prevMembers.map(member =>
  //             member.MemberID === id ? { ...member, ...updatedData } : member
  //         )
  //     );
  //
  //     toast({
  //       title: "Success",
  //       description: "Member updated successfully.",
  //     });
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "Could not update member. Please try again later.",
  //       variant: "destructive",
  //     });
  //   }
  // };


  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Member Management</CardTitle>
            <CardDescription>View and manage Zando Fitness members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-64">
                <Input
                  type="text"
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
              <Button>Add New Member</Button>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Membership</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.MemberID}>
                      <TableCell>{`${member?.person?.FirstName} ${member?.person?.LastName}`}</TableCell>
                      <TableCell>{member?.person?.Email}</TableCell>
                      <TableCell>{member?.membership?.MembershipName}</TableCell>
                      <TableCell>{format(new Date(member.JoinDate), 'MMM d, yyyy')}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            {!isLoading && filteredMembers.length === 0 && (
              <div className="text-center py-4">
                <p className="text-gray-500">No members found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <p>&copy; 2024 Zando Fitness. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
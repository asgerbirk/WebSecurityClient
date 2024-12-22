'use client';

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "./ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useMemberData } from "@/components/use-memberdata";
import { Skeleton } from "@/components/ui/skeleton";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Book, Calendar, Clock, MapPin, User} from "lucide-react";
import {Button} from "@/components/ui/button";
import {format} from "date-fns";

interface MemberProfileProps {
    userId?: number;
}

export function MemberProfile({ userId }: MemberProfileProps) {
    const { memberData, isLoading, error } = useMemberData(userId);
    const memberBookings = memberData?.memberBookings || [];

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p>Error loading data: {error}</p>
            </div>
        );
    }
    const formatDate = (dateString: string) => {
        return format(new Date(dateString), 'MMMM d, yyyy')
    }

    const formatTime = (timeString: string) => {
        return format(new Date(timeString), 'h:mm a')
    }

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8">My Information</h1>
                <Tabs defaultValue="info" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="info" className="flex items-center"><User className="mr-2 h-4 w-4" /> My Information</TabsTrigger>
                        <TabsTrigger value="bookings" className="flex items-center"><Book className="mr-2 h-4 w-4" /> My Bookings</TabsTrigger>
                    </TabsList>
                    <TabsContent value="info">
                <Card className="w-full max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle>Personal Details</CardTitle>
                        <CardDescription>View and edit your personal information</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="firstName">First Name</Label>
                                    {isLoading ? (
                                        <Skeleton className="h-10 w-full" />
                                    ) : (
                                        <Input
                                            id="firstName"
                                            name="firstName"
                                            value={memberData?.person?.FirstName || ""}
                                            readOnly
                                        />
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="lastName">Last Name</Label>
                                    {isLoading ? (
                                        <Skeleton className="h-10 w-full" />
                                    ) : (
                                        <Input
                                            id="lastName"
                                            name="lastName"
                                            value={memberData?.person?.LastName || ""}
                                            readOnly
                                        />
                                    )}
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                {isLoading ? (
                                    <Skeleton className="h-10 w-full" />
                                ) : (
                                    <Input
                                        id="email"
                                        name="email"
                                        value={memberData?.person?.Email || ""}
                                        readOnly
                                    />
                                )}
                            </div>
                            <div>
                                <Label htmlFor="phone">Phone</Label>
                                {isLoading ? (
                                    <Skeleton className="h-10 w-full" />
                                ) : (
                                    <Input
                                        id="phone"
                                        name="phone"
                                        value={memberData?.person?.Phone || ""}
                                        readOnly
                                    />
                                )}
                            </div>
                            <div>
                                <Label htmlFor="address">Address</Label>
                                {isLoading ? (
                                    <Skeleton className="h-10 w-full" />
                                ) : (
                                    <Input
                                        id="address"
                                        name="address"
                                        value={memberData?.person?.Address || ""}
                                        readOnly
                                    />
                                )}
                            </div>
                            <div>
                                <Label htmlFor="membershipType">Membership Type</Label>
                                {isLoading ? (
                                    <Skeleton className="h-10 w-full" />
                                ) : (
                                    <Input
                                        id="membershipType"
                                        name="membershipType"
                                        value={memberData?.membership?.MembershipName || "No Membership"}
                                        readOnly
                                    />
                                )}
                            </div>
                            <div>
                                <Label htmlFor="joinDate">Join Date</Label>
                                {isLoading ? (
                                    <Skeleton className="h-10 w-full" />
                                ) : (
                                    <Input
                                        id="joinDate"
                                        name="joinDate"
                                        value={
                                            memberData?.JoinDate
                                                ? new Date(memberData.JoinDate).toLocaleDateString("en-GB")
                                                : "N/A"
                                        }
                                        readOnly
                                    />
                                )}
                            </div>
                            <div>
                                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                                {isLoading ? (
                                    <Skeleton className="h-10 w-full" />
                                ) : (
                                    <Input
                                        id="emergencyContact"
                                        name="emergencyContact"
                                        value={memberData?.EmergencyContact || ""}
                                        readOnly
                                    />
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
                    </TabsContent>
                    <TabsContent value="bookings">
                        {isLoading ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <Card key={i}>
                                        <CardHeader>
                                            <Skeleton className="h-6 w-2/3" />
                                            <Skeleton className="h-4 w-1/2" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2">
                                                <Skeleton className="h-4 w-full" />
                                                <Skeleton className="h-4 w-full" />
                                                <Skeleton className="h-4 w-3/4" />
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            <Skeleton className="h-10 w-28" />
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        ) : memberBookings.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {memberBookings.map((booking) => (
                                    <Card key={booking.BookingID}>
                                        <CardHeader>
                                            <CardTitle>{booking.class.ClassName}</CardTitle>
                                            <CardDescription>Booked at: {formatDate(booking.BookingDate)}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2">
                                                <div className="flex items-center">
                                                    <Calendar className="mr-2 h-4 w-4" />
                                                    <span>{formatDate(booking.class.ScheduleDate)}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Clock className="mr-2 h-4 w-4" />
                                                    <span>{formatTime(booking.class.StartTime)} - {formatTime(booking.class.EndTime)}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <MapPin className="mr-2 h-4 w-4" />
                                                    <span>Zando Nørrebronx</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            <Button variant="destructive">
                                                Cancel Booking
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <Card>
                                <CardContent className="text-center py-8">
                                    <p className="text-xl font-semibold mb-4">You have no upcoming bookings</p>
                                    <Button asChild>
                                        <a href="/classes">Browse Classes</a>
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>
                </Tabs>
            </main>

            <footer className="bg-gray-800 text-white py-8">
                <div className="container mx-auto px-4">
                    <p>&copy; 2024 Zando Fitness. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

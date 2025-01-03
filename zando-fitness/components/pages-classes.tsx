'use client'

import {useEffect, useState} from 'react'
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {format} from 'date-fns'
import {useToast} from "@/hooks/use-toast";
import {Toaster} from "@/components/ui/toaster";
import {FitnessClass} from "@/types/class";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogDescription, DialogFooter, DialogTitle
} from "@/components/ui/dialog";


interface ClassesProps {
  memberId?: number,
}

export function Classes({memberId}: ClassesProps) {
    const [classes, setClasses] = useState<FitnessClass[]>([])
    const [selectedClass, setSelectedClass] = useState<FitnessClass | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const {toast} = useToast()

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                setIsLoading(true)
                const response = await fetch(`${process.env.NEXT_PUBLIC_ZANDO_API}/classes`);
                if (!response.ok) {
                    throw new Error('Failed to fetch classes');
                }
                const data = await response.json();
                const today = Date.now()
                // Filter classes that have a ScheduleDate later than today
                // Should be parameter in api method
                const newClasses = data.filter((classItem: { ScheduleDate: string | number | Date }) => {
                const classDate = new Date(classItem.ScheduleDate).getTime();
                return classDate > today;
              });
                setClasses(newClasses);
            } catch (error) {
                toast({
                    title: 'Error',
                    description: 'Could not load classes. Please try again later.',
                    variant: 'destructive',
                });
            } finally {
                setIsLoading(false)
            }
        };

        fetchClasses().then(r => r);
    }, [toast]);

    const filteredClasses = classes.filter(cls =>
        cls.ClassName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.Description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.ClassType.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleBookClass = async () => {
        if (!selectedClass) return;

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_ZANDO_API}/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any necessary authentication headers
                },
                body: JSON.stringify({
                    ClassID: selectedClass.ClassID,
                    BookingDate: format(new Date(), 'yyyy-MM-dd'),
                    Status: 'Confirmed',
                    MemberID: memberId // Replace with actual member ID from authentication
                })
            });

            // Check if the response status is not ok (i.e., not in the 2xx range)
            const bookingResponse = await response.json();
            if(response.status === 201) {
                toast({
                    title: 'Booking Successful',
                    description: `You've booked ${selectedClass.ClassName}`,
                    variant: 'success'
                });

                setSelectedClass(null);
            }
            else {
                toast({
                    title: 'Booking Failed',
                    description: bookingResponse.error || 'Failed to book class',  // Display the error message from backend
                    variant: 'destructive',
                });
                setSelectedClass(null);
                return;  // Stop further execution
            }
        } catch (error) {
            toast({
                title: 'Booking Failed',
                description: error instanceof Error ? error.message : 'Unable to book class',
                variant: 'destructive'
            });
            setSelectedClass(null);
        }
    }

    const formatTime = (timeString: string) => {
        return format(new Date(timeString), 'h:mm a')
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p>Loading classes...</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8">Fitness Classes</h1>

                <div className="mb-6">
                    <Label htmlFor="search">Search Classes</Label>
                    <Input
                        id="search"
                        placeholder="Search by class name, description, or type..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {filteredClasses.length === 0 ? (
                    <p className="text-center text-gray-500">No classes found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredClasses.map((cls) => (
                            <Card key={cls.ClassID}>
                                <CardHeader>
                                    <CardTitle>{cls.ClassName}</CardTitle>
                                    <CardDescription>{cls.ClassType}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="mb-2">{cls.Description}</p>
                                    <p className="text-sm text-gray-500">Duration: {cls.Duration} minutes</p>
                                    <p className="text-sm text-gray-500">Max Participants: {cls.MaxParticipants}</p>
                                    <p className="text-sm text-gray-500">
                                        Date: {format(new Date(cls.ScheduleDate), 'MMMM d, yyyy')}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Time: {formatTime(cls.StartTime)} - {formatTime(cls.EndTime)}
                                    </p>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        className="w-full"
                                        onClick={() => setSelectedClass(cls)}
                                    >
                                        Book Class
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
                {/* Booking Confirmation Dialog */}
                {selectedClass && (
                    <Dialog open={!!selectedClass} onOpenChange={() => setSelectedClass(null)}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Confirm Class Booking</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to book {selectedClass.ClassName}?
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-2">
                                <p>Date: {format(new Date(selectedClass.ScheduleDate), 'MMMM d, yyyy')}</p>
                                <p>Time: {format(new Date(selectedClass.StartTime), 'h:mm a')} - {format(new Date(selectedClass.EndTime), 'h:mm a')}</p>
                            </div>
                            <DialogFooter>
                                <Button
                                    variant="outline"
                                    onClick={() => setSelectedClass(null)}
                                >
                                    Cancel
                                </Button>
                                <Button onClick={handleBookClass}>
                                    Confirm Booking
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                )}
                <Toaster/>
            </main>

            <footer className="bg-gray-800 text-white py-8">
                <div className="container mx-auto px-4">
                    <p>&copy; 2024 Zando Fitness. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}
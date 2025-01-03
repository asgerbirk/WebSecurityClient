import { useState, useEffect } from 'react';
import { Member } from '@/types/user-info';
import { useToast } from '@/hooks/use-toast';

export function useMemberData(userId: number | undefined) {
  const [memberData, setMemberData] = useState<Member | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMemberships = async () => {
      if (!userId) {
        // Handle case where userId is missing
        setIsLoading(false);
        setError('User ID is missing');
        toast({
          title: 'Error',
          description: 'User ID is missing. Please try again later.',
          variant: 'destructive',
        });
        return;
      }

      try {
        setIsLoading(true); // Start loading
        setError(null); // Reset error state

        const response = await fetch(`${process.env.NEXT_PUBLIC_ZANDO_API}/members/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.error || 'Failed to fetch member data');
        }

        const data = await response.json();
        setMemberData(data.member); // Assuming `data.member` contains the member object
      } catch (err: any) {
        console.error('Error fetching member data:', err);
        setError(err.message || 'Could not load member data. Please try again later.');
        toast({
          title: 'Error',
          description: err.message || 'Could not load member data. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false); // End loading
      }
    };

    fetchMemberships().then(r => r);
  }, [userId, toast]); // Dependency array includes userId and toast to re-run when either changes

  return { memberData, isLoading, error };
}

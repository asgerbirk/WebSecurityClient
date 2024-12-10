import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Member } from '@/types/user-info';

export function useMemberData() {
  const [memberData, setMemberData] = useState<Member | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchMemberData = async () => {
      // Reset states
      setIsLoading(true);
      setError(null);

      // Check if session exists
      if (!session?.user?.id) {
        setError('No user session found');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_ZANDO_API}/members/${session.user.id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${session.token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch member data');
        }

        const data: Member = await response.json();
        setMemberData(data);
      } catch (err) {
        console.error('Error fetching member data:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMemberData().then(r => r);
  }, [session]);

  return { memberData, isLoading, error };
}
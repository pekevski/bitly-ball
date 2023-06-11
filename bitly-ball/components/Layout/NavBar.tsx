import Button from '../Button';
import { useRouter } from 'next/router';
import Link from '../Link';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

type NavBarProps = {};

export const NavBar: React.FC<NavBarProps> = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  const handleUsernameClick = () => {
    console.log('Clicked username');
  };

  const handleSignoutClick = async () => {
    await supabaseClient.auth.signOut();
    router.push('/');
  };

  return (
    <nav>
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex justify-between align-center flex-row py-4 md:py-6 relative">
          <div className="flex flex-1 items-center">
            <Link href="/">
              <h3 className="font-bitlyTitle text-2xl text-center">
                ⚽ Bitly Ball
              </h3>
            </Link>
          </div>

          <div className="flex flex-1 justify-end items-center space-x-8">
            {user && (
              <>
                <Button disabled={false} handleClick={handleUsernameClick}>
                  {user?.email}
                </Button>
                <Button disabled={false} handleClick={handleSignoutClick}>
                  Sign out
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

import Link from 'next/link';
import { useUser } from "@supabase/supabase-auth-helpers/react";
import Button from '../Button';
import { useRouter } from 'next/router';

type NavBarProps = {};

export const NavBar: React.FC<NavBarProps> = () => {
  const router = useRouter();
  const {user, error} = useUser()

  const handleUsernameClick = () => {
    console.log("Clicked username")
  }

  const handleSignOutClick = () => {
    router.push(`/api/auth/logout`);
  }



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

          <div className="flex flex-1 justify-end space-x-8">
            {user && (
              <>
                <Button 
                  disabled={false}
                  handleClick={handleUsernameClick}
                >
                  {user?.email}
                </Button>

                <Button disabled={false} handleClick={handleSignOutClick}>
                  <a>Sign out</a>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
};

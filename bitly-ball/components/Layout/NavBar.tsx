import Link from 'next/link';
import { useUser } from "@supabase/supabase-auth-helpers/react";

type NavBarProps = {};

export const NavBar: React.FC<NavBarProps> = () => {

  const {user, error} = useUser()

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
                <h5>{user?.email}</h5>
                <Link href="/api/auth/logout">
                  <a>Sign out</a>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
};

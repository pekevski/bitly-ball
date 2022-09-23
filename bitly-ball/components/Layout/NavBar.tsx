import Button from '../Button';
import { useRouter } from 'next/router';
import Link from '../Link';
import { Auth } from '@supabase/ui';
import { AuthError } from '@supabase/supabase-js';

type NavBarProps = {
  signOut: () => Promise<{ error: AuthError | null }>
};

export const NavBar: React.FC<NavBarProps> = (props) => {
  const { user } = Auth.useUser();

  const handleUsernameClick = () => {
    console.log('Clicked username');
  };

  const handleSignOutClick = async () => {
    const { error } = await props.signOut();
  };

  const userControls = user && (
    <>
      <Button disabled={false} handleClick={handleUsernameClick}>
        {user?.email}
      </Button>

      <Button disabled={false} handleClick={handleSignOutClick}>
        Sign out
      </Button>
    </>
  )

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
            {userControls}
          </div>
        </div>
      </div>
    </nav>
  );
};

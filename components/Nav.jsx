"use client";
import Link from "next/link"; // for client-side navigation
import Image from "next/image"; // automatically optimizes images
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const isUserLoggedIn = true; // TODO: replace with next-auth session
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false); // toggle dropdown menu on mobile

  // get providers list on component mount
  useEffect(() => {
    const setProvidersList = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setProvidersList();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">promptsDB</p>
      </Link>

      {/* desktop navigation */}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Prompt
            </Link>
            <button type="button" className="outline_btn" onClick={signOut}>
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src="/assets/images/logo.svg" // TODO: replace with user profile image
                alt="profile"
                className="rounded-full cursor-pointer"
                width={37}
                height={37}
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              // TODO: replace with next-auth providers
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn">
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* mobile navigation */}
      <div className="sm:hidden flex relative">
        {isUserLoggedIn ? (
          <div className="flex">
            <Image
              src="/assets/images/logo.svg" // TODO: replace with user profile image
              alt="profile"
              className="rounded-full cursor-pointer"
              width={37}
              height={37}
              onClick={() => {
                setToggleDropdown((prevState) => !prevState); // toggle dropdown
              }}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}>
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}>
                  Create Prompt
                </Link>
                <button
                  type="button"
                  className="mt-5 w-full black_btn"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn">
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;

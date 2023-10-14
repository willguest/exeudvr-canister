import React, { createContext, useContext, useEffect, useState } from "react";
import { authClient as authenticationClient } from "./authClient";
import { actorController } from "./actor";
import { Identity } from "@dfinity/agent";

// a stripped-down version of CanCan's implementation, without the 'user'
export interface AuthContext {
  isAuthenticated: boolean;
  isAuthReady: boolean;
  identity: Identity;
  logIn: () => void;
  logOut: () => void;
}

type AuthContextProps = {
	children: React.ReactElement;
};


// Provider hook that creates auth object and handles state
export function useProvideAuth(authClient): AuthContext {
  
  const [isAuthenticatedLocal, setIsAuthenticatedLocal] = useState<boolean>(
    false
  );
  const [_identity, _setIdentity] = useState<Identity | undefined>();
  const [isAuthClientReady, setAuthClientReady] = useState(false);
  const [urlWithSearch] = useState<string>(globalThis.location.search);

  
  // Creating the auth client is async and no auth related checks can happen
  // until it's ready so we set a state variable to keep track of it
  if (!authClient.ready) {
    authClient.create().then(() => setAuthClientReady(true));
  }

  // Once the auth client is initialized, get the identity and check that they
  // are authenticated, then set them to be fully logged in.
  useEffect(() => {
    if (!authClient.ready) return;
    Promise.all([authClient.getIdentity(), authClient.isAuthenticated()]).then(
      ([identity, isAuthenticated]) => {
        setIsAuthenticatedLocal(isAuthenticated || false);
        _setIdentity(identity);
        if (isAuthenticated) {
		
          //maybe set auth from local storage
        }
        setAuthClientReady(true);
      }
    );
  }, [isAuthClientReady]);

  useEffect(() => {
    if (_identity && !_identity.getPrincipal().isAnonymous()) {

      setAuthClientReady(false);
      actorController.authenticateActor(_identity).then(() => {
        setAuthClientReady(true);
      });
    } else {
      actorController.unauthenticateActor();
    }
  }, [_identity]);

  const identity = _identity;
  const isAuthenticated = isAuthenticatedLocal;

  const logIn = async function (): Promise<Identity | undefined> {
    const identity = await authClient.getIdentity();
    if (identity) {
      setIsAuthenticatedLocal(true);
      _setIdentity(identity);
	    return identity;
    } else {
      console.error("Could not get identity from II");
    }
	
  };

  function logOut() {
    setIsAuthenticatedLocal(false);
    if (!authClient.ready) return;
    authClient.logout();
  }

  return {
    isAuthenticated,
    isAuthReady: isAuthClientReady,
    logIn,
    logOut,
    identity,
  };
}

const authContext = createContext<AuthContext | null>(null!);

export const AuthProvider = (props: AuthContextProps) => {
	const { children } = props;	  
  const auth = useProvideAuth(authenticationClient);
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};
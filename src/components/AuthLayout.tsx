import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Protected({
  children,
  authentication = true,
}: {
  children: React.ReactNode;
  authentication: boolean;
}) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const authStatus = useSelector((state: any) => state.auth.status);

  useEffect(() => {
    //TODO: make it more easy to understand

    // if (authStatus ===true){
    //     navigate("/")
    // } else if (authStatus === false) {
    //     navigate("/login")
    // }

    //let authValue = authStatus === true ? true : false

    if (authentication && authStatus !== authentication) {
      navigate('/login');
    } else if (!authentication && authStatus !== authentication) {
      navigate('/');
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}

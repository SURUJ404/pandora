import React from 'react';
const AuthContext = React.createContext({ user: null, setUser: () => {}, isDemo: false });
export default AuthContext;

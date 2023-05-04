import { AuthProvider, SocketProvider } from "./index";

// This wraps all of the context providers into one.
const ContextProvider = ({ children }) => {
  return (
    <AuthProvider>
      <SocketProvider>{children}</SocketProvider>
    </AuthProvider>
  );
};

export default ContextProvider;

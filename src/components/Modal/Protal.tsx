import { useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
}

const Portal = ({ children }: PortalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const portalRoot =
    typeof window !== "undefined"
      ? document.getElementById("portal-root")
      : null;

  return mounted && portalRoot ? createPortal(children, portalRoot) : null;
};

export default Portal;

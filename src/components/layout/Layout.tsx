import { Spin } from 'antd';
import { isUndefined } from 'lodash';
import React, { ReactNode, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleCheckAuth = useCallback(async () => {
    await checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    handleCheckAuth();
  }, [handleCheckAuth, location]);

  useEffect(() => {
    if (isAuthenticated && location.pathname === '/login') {
      navigate('/');
    } else {
      if (
        isAuthenticated === false &&
        !['/register'].includes(location.pathname)
      ) {
        navigate('/login');
      }
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return isUndefined(isAuthenticated) ? (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Spin size="large" tip="Loading..." />
    </div>
  ) : (
    <div className="flex flex-col h-screen">{children}</div>
  );
};

export default Layout;

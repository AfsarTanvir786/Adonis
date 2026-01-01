import { Button } from '@/components/ui/button';
import type { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.authentication.user)!;
  return (
    <h1>
      {user.role === 'admin' && (
        <>
          <Button className="m-4" onClick={() => navigate('/admin-dashboard')}>
            Admin Dashboard
          </Button>
          <Button className="m-4" onClick={() => navigate('/user-info')}>
            user Info
          </Button>
        </>
      )}
      <Button className="m-4" onClick={() => navigate('/profile')}>
        Profile
      </Button>
      <Button className="m-4" onClick={() => navigate('/upload-image')}>
        upload Image
      </Button>
      <Button className="m-4" onClick={() => navigate('/auth/login')}>
        login
      </Button>
      <Button className="m-4" onClick={() => navigate('/auth/logout')}>
        logout
      </Button>
    </h1>
  );
}

export default Dashboard;

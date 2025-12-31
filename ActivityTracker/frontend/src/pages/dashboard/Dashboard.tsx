import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  return (
    <h1>
      <Button className="m-4" onClick={() => navigate('/profile')}>
        Profile
      </Button>
      <Button className="m-4" onClick={() => navigate('/admin-dashboard')}>
        Admin Dashboard
      </Button>
      <Button className="m-4" onClick={() => navigate('/upload-image')}>
        upload Image
      </Button>
      <Button className="m-4" onClick={() => navigate('/user-info')}>
        user Info
      </Button>
    </h1>
  );
}

export default Dashboard;

import { useDashboardList } from '@/hooks/query/useDashboard';
import type { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import RequireLogin from '@/utils/requireLogin';

function Home() {
  const user = useSelector((state: RootState) => state.authentication.user);

  if (!user || user.name === 'no user') {
    return (
      <RequireLogin message="Please login to view your dashboard details" />
    );
  }
  const { data: dashboardData, isLoading, isError } = useDashboardList(user.id);

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError || !dashboardData || !dashboardData.success)
    return <p className="text-center mt-10">Error fetching Notes</p>;
  return (
    <>
      {/* 1. Quick stat total notes, public notes, company members, workspaces, total upvotes */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Notes</h3>
          <p className="text-2xl">{dashboardData.counts.totalNotes}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Public Notes</h3>
          <p className="text-2xl">{dashboardData.counts.totalPublicNotes}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Company Members</h3>
          <p className="text-2xl">{dashboardData.counts.totalMembers}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Workspaces</h3>
          <p className="text-2xl">{dashboardData.counts.totalWorkspaces}</p>
        </div>
      </div>

      {/* 2. Recent Activity Feed (Very Important) */}
      <div className="bg-white p-4 rounded shadow mt-4">
        <h3 className="text-lg font-semibold">Recent Activity</h3>
        {dashboardData.latestPublicNoteList ? (
          <div className="mt-2">
            {dashboardData.latestPublicNoteList.map((note) => (
              <div key={note.id} className="mb-2">
                <p className="font-medium">{note.title}</p>
                <p className="text-gray-600">
                  By: {note.user?.name} | Published At:{' '}
                  {note.publishedAt
                    ? format(note.publishedAt, 'MMMM dd, yyyy')
                    : 'Unpublished'}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No recent activity</p>
        )}
      </div>

      {/* 3. Your Work (Personal Section) 
            Your Draft Notes
            Recently Edited by You
            Your Most Upvoted Note
            */}
      <div className="bg-white p-4 rounded shadow mt-4">
        <h3 className="text-lg font-semibold">Your Work</h3>
        {dashboardData.myRecentNoteList ? (
          <div className="mt-2">
            <h4 className="font-medium mb-2">Recently Edited Notes</h4>
            {dashboardData.myRecentNoteList.map((note) => (
              <div key={note.id} className="mb-2">
                <p className="font-medium">{note.title}</p>
                <p className="text-gray-600">
                  Last Updated:{' '}
                  {note.updatedAt
                    ? format(note.updatedAt, 'MMMM dd, yyyy')
                    : 'Never'}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No personal work to display</p>
        )}
        {dashboardData.myTopNote ? (
          <div className="mt-4">
            <h4 className="font-extrabold mt-4 mb-2">Your Most Upvoted Note</h4>
            <p className="font-medium">{dashboardData.myTopNote.note.title}</p>
            <p className="text-gray-600">
              Up votes: {dashboardData.myTopNote.upVoteCount}
            </p>
            <p className="text-gray-600">
              Down votes: {dashboardData.myTopNote.downVoteCount}
            </p>
          </div>
        ) : (
          <p className="text-2xl">Most upvoted note</p>
        )}
      </div>

      {/*     4. Popular Notes (Company)
                Top notes by engagement:
                Most Upvoted
                Most Viewed (later)
                Most Active (votes + history) 
            */}
      <div className="bg-white p-4 rounded shadow mt-4">
        <h3 className="text-lg font-semibold">Popular Notes</h3>
        {dashboardData.topPublicNote ? (
          <div className="mt-2">
            <p className="font-medium">
              {dashboardData.topPublicNote.note.title}
            </p>
            <p className="text-gray-600">
              Up votes: {dashboardData.topPublicNote.upVoteCount}
            </p>
            <p className="text-gray-600">
              Down votes: {dashboardData.topPublicNote.downVoteCount}
            </p>
          </div>
        ) : (
          <p className="text-gray-600">No popular notes to display</p>
        )}
      </div>

      {/*     5. Workspace Overview
                Lightweight summary:
                Workspace Name
                Notes count
                Last updated */}
      <div className="bg-white p-4 rounded shadow mt-4">
        <h3 className="text-lg font-semibold">Workspace Overview</h3>

        {dashboardData.latestWorkspace ? (
          <div className="mt-2">
            <p className="font-medium">{dashboardData.latestWorkspace.name}</p>
            <p className="text-gray-600">
              description: {dashboardData.latestWorkspace.description}
            </p>
            <p className="text-gray-600">
              Last updated:{' '}
              {dashboardData.latestWorkspace.updatedAt
                ? format(
                    dashboardData.latestWorkspace.updatedAt,
                    'MMMM dd, yyyy'
                  )
                : 'Never'}
            </p>
          </div>
        ) : (
          <p className="text-gray-600">No workspaces to display</p>
        )}
      </div>

      {/*     6. Company Announcements
                Important updates from your company */}
      <div className="bg-white p-4 rounded shadow mt-4">
        <h3 className="text-lg font-semibold">Company Announcements</h3>
        <p className="text-gray-600">No announcements</p>
      </div>
    </>
  );
}

export default Home;

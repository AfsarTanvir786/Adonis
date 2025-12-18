import Note from '#models/note';
import User from '#models/user';
import Workspace from '#models/workspace';

export class DashboardService {
  async getDashboard(companyId: number, userId: number) {
    const totalNotes = await Note.query()
      .whereHas('workspace', (w) => {
        w.where('companyId', companyId);
      })
      .count('* as total');

    const totalPublicNotes = await Note.query()
      .where('type', 'public')
      .where('isDraft', false)
      .whereHas('workspace', (w) => {
        w.where('companyId', companyId);
      })
      .count('* as total');

    const totalMembers = await User.query()
      .where('companyId', companyId)
      .count('* as total');

    const totalWorkspaces = await Workspace.query()
      .where('companyId', companyId)
      .count('* as total');

    const latestPublicNoteList = await Note.query()
      .where('type', 'public')
      .where('isDraft', false)
      .whereHas('workspace', (q) => {
        q.where('companyId', companyId);
      })
      .preload('user')
      .orderBy('publishedAt', 'desc')
      .limit(5);

    const myRecentNoteList = await Note.query()
      .where('userId', userId)
      .orderBy('updatedAt', 'desc')
      .limit(5);

    // const myTopNote = await Note.query()
    //   .where('user_id', userId)
    //   .orderBy('count', 'desc')
    //   .first();

    // const topPublicNote = await Note.query()
    //   .where('type', 'public')
    //   .where('isDraft', false)
    //   .whereHas('workspace', (w) => {
    //     w.where('companyId', companyId);
    //   })
    //   .orderBy('count', 'desc')
    //   .first();

    const latestWorkspace = await Workspace.query()
      .where('companyId', companyId)
      .orderBy('createdAt', 'desc')
      .first();

    return {
      success: true,
      counts: {
        totalNotes: totalNotes[0].$extras.total,
        totalPublicNotes: totalPublicNotes[0].$extras.total,
        totalMembers: totalMembers[0].$extras.total,
        totalWorkspaces: totalWorkspaces[0].$extras.total,
      },
      latestPublicNoteList,
      myRecentNoteList,
      //   myTopNote,
      //   topPublicNote,
      latestWorkspace,
    };
  }
}

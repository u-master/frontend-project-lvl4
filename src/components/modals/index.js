import AddChannel from './AddChannel';
import RemoveChannel from './RemoveChannel';
import RenameChannel from './RenameChannel';

export default (modalType) => ({
  addChannel: AddChannel,
  removeChannel: RemoveChannel,
  renameChannel: RenameChannel,
}[modalType]);

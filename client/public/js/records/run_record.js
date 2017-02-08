import { Record, List as IList } from 'immutable';
import { statusConstants } from 'molecular-design-applications-shared';

const RunRecord = new Record({
  canceling: false,
  email: '',
  fetchingPdb: false,
  fetchingPdbError: null,
  id: null,
  inputs: new IList(),
  outputs: new IList(),
  status: statusConstants.IDLE,
  inputFileError: null,
  inputFilePending: false,
});

export default RunRecord;

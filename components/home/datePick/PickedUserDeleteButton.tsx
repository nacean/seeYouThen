import { Button, Popconfirm } from 'antd';
import { useRecoilState, useRecoilValue } from 'recoil';
import roomIdState from '../../../atoms/roomInfo/roomIdState';
import roomNameState from '../../../atoms/roomInfo/roomNameState';
import nowPickUserState from '../../../atoms/roomUserAtoms/nowPickUserState';
import roomUsersState from '../../../atoms/roomUserAtoms/roomUsersState';
import datePickState from '../../../atoms/timeAtoms/datePickState';
import nowPickTimeState from '../../../atoms/timeAtoms/nowPickTimeState';
import timeBlockState, {
  timeBlockType,
  blockType,
} from '../../../atoms/timeAtoms/timeBlockState';
import addRoomInfo from '../../../modules/dbModules/addRoomInfo';

function PickedUserDeleteButton() {
  const [roomUsers, setRoomUsers] = useRecoilState(roomUsersState);
  const [nowPickUser, setNowPickUser] = useRecoilState(nowPickUserState);
  const [timeBlocks, setTimeBlocks] = useRecoilState(timeBlockState);
  const pickedDates = useRecoilValue(datePickState);
  const pickedTimes = useRecoilValue(nowPickTimeState);
  const roomId = useRecoilValue(roomIdState);
  const roomName = useRecoilValue(roomNameState);
  const onDeleteNameConfirm = () => {
    const filteredRoomUsers: string[] = roomUsers.filter(
      (roomUserParam: string) => nowPickUser !== roomUserParam,
    );

    const newTimeBlocks: timeBlockType[] = timeBlocks.map(
      (timeBlockParam: timeBlockType) => ({
        ...timeBlockParam,
        blocks: timeBlockParam.blocks.map((blockParam: blockType) => ({
          ...blockParam,
          usingUsers: blockParam.usingUsers.filter(
            (userParam) => userParam !== nowPickUser,
          ),
        })),
      }),
    );

    setRoomUsers(filteredRoomUsers);
    setTimeBlocks(newTimeBlocks);
    setNowPickUser(null);
    addRoomInfo({
      pickedDates,
      pickedTimes,
      timeBlocks: newTimeBlocks,
      roomUsers: filteredRoomUsers,
      roomId,
      roomName,
    });
  };

  return (
    <Popconfirm
      title="????????? ????????? ????????? ???????????????. ???????????????????"
      onConfirm={onDeleteNameConfirm}
      okText="??????"
      cancelText="??????"
      placement="bottomLeft"
    >
      <Button danger>??????</Button>
    </Popconfirm>
  );
}

export default PickedUserDeleteButton;

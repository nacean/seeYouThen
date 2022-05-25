import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import DatePickContainer from '../../components/home/datePick/DatePickContainer';
import TimeResultContainer from '../../components/home/timeResult/TimeResultContainer';
import styles from './roomId.module.scss';
import RoomTitleAndCopy from '../../components/home/roomHead/RoomTitleAndCopy';
import { useSetRecoilState } from 'recoil';
import roomNameState from '../../atoms/roomInfo/roomNameState';
import roomIdState from '../../atoms/roomInfo/roomIdState';
import initializeRoomInfo from '../../modules/dbModules/initializeRoomInfo';
import { DocumentData } from 'firebase/firestore/lite';
import { useEffect } from 'react';
import datePickState from '../../atoms/timeAtoms/datePickState';
import timeBlockState from '../../atoms/timeAtoms/timeBlockState';
import roomUsersState from '../../atoms/roomUserAtoms/roomUsersState';
import moment from 'moment';

const RoomPage: NextPage = () => {
  const setRoomName = useSetRecoilState(roomNameState);
  const setRoomId = useSetRecoilState(roomIdState);
  const setDatePick = useSetRecoilState(datePickState);
  const setTimeBlock = useSetRecoilState(timeBlockState);
  const setRoomUsers = useSetRecoilState(roomUsersState);
  const router = useRouter();

  const getRoomInfo = async () => {
    const { roomName, roomId } = router.query;
    const initRoomInfo: DocumentData = await initializeRoomInfo(
      roomId as string,
    );

    if (initRoomInfo) {
      const { pickedDates, resultBlocks, roomUsers } = initRoomInfo;
      setDatePick([moment(pickedDates[0]), moment(pickedDates[1])]);
      setTimeBlock(resultBlocks);
      setRoomUsers(roomUsers);
    }
    setRoomName(roomName as string);
    setRoomId(roomId as string);
  };

  useEffect(() => {
    if (router.isReady) getRoomInfo();
  }, [router.isReady]);

  return (
    <article className={styles.homeContainer}>
      <RoomTitleAndCopy />
      <div className={styles.timeMainContainer}>
        <DatePickContainer />
        <TimeResultContainer />
      </div>
    </article>
  );
};

export default RoomPage;

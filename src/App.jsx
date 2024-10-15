import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTeamLeaders, setRemainingMembers, assignTeams } from './store/modules/teamSlice';
import styled, { keyframes } from 'styled-components';
import GlobalStyle from './styled/GlobalStyle';

// 스타일드 컴포넌트
const Container = styled.div`
    padding: 20px;
    text-align: center;
    background: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Helvetica Neue', sans-serif;
    color: #ffffff;
    transition: background-color 0.5s ease;
    background-color: ${(props) => (props.isPicking ? 'black' : '#282c34')};
    position: relative;
`;

const Title = styled.h1`
    color: #61dafb;
    font-size: 3rem;
    margin-bottom: 30px;
    font-weight: 700;
    transition: opacity 0.5s ease;
    opacity: ${(props) => (props.isPicking ? 0 : 1)};
`;

const Section = styled.div`
    margin: 20px 0;
    background: rgba(255, 255, 255, 0.1);
    padding: 30px;
    width: 80%;
    max-width: 600px;
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    transition: opacity 0.5s ease;
    opacity: ${(props) => (props.isPicking ? 0 : 1)};
`;

const Button = styled.button`
    padding: 15px 30px;
    margin-top: 20px;
    background-color: #61dafb;
    color: #282c34;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1.2rem;

    &:hover {
        background-color: #21a1f1;
    }
`;

const TeamsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
    width: 80%;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

// 랜덤하게 매우 빠르게 움직이면서 화면을 섞는 애니메이션
const generateRandomMovement = () => keyframes`
  0% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(${Math.random() * 200 - 100}px, ${
    Math.random() * 200 - 100
}px) scale(${Math.random() + 0.5}); }
  50% { transform: translate(${Math.random() * 300 - 150}px, ${
    Math.random() * 300 - 150
}px) scale(${Math.random() + 0.5}); }
  75% { transform: translate(${Math.random() * 400 - 200}px, ${
    Math.random() * 400 - 200
}px) scale(${Math.random() + 0.5}); }
  100% { transform: translate(0, 0) scale(1); }
`;

const CircleName = styled.div`
    width: 100px;
    height: 100px;
    background-color: white;
    color: black;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    position: absolute;
    animation: ${(props) => generateRandomMovement()} 1s ease-in-out infinite;
    top: ${(props) => props.top}%;
    left: ${(props) => props.left}%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.7);
`;

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const SelectedName = styled.div`
    font-size: 2rem;
    color: #61dafb;
    animation: ${fadeIn} 1s ease forwards;
`;

const Input = styled.input`
    padding: 15px;
    font-size: 1rem;
    margin: 10px;
    border: none;
    border-radius: 10px;
    width: calc(50% - 20px);
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
    outline: none;

    &:focus {
        background: rgba(255, 255, 255, 0.3);
    }
`;

const TextArea = styled.textarea`
    width: 90%;
    height: 80px;
    font-size: 1rem;
    padding: 15px;
    margin-top: 10px;
    border: none;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
    outline: none;

    &:focus {
        background: rgba(255, 255, 255, 0.3);
    }
`;

function App() {
    const dispatch = useDispatch();
    const { teamLeaders, teams } = useSelector((state) => state.teams);
    const [leaders, setLeaders] = useState(['', '']);
    const [members, setMembers] = useState('');
    const [isPicking, setIsPicking] = useState(false);
    const [pickedNames, setPickedNames] = useState([]);
    const [shuffledNames, setShuffledNames] = useState([]);
    const [positions, setPositions] = useState([]);

    // 조장 설정 함수
    const handleSetLeaders = () => {
        if (leaders[0] && leaders[1]) {
            dispatch(setTeamLeaders(leaders));
        } else {
            alert('두 명의 조장을 입력해주세요.');
        }
    };

    // 멤버 설정 함수
    const handleSetMembers = () => {
        if (!members.trim()) {
            alert('멤버 이름을 입력해주세요.');
            return;
        }
        const remainingMembers = members.split(',').map((member) => member.trim());
        if (remainingMembers.length < 2) {
            alert('두 명 이상의 멤버를 입력해주세요.');
            return;
        }
        dispatch(setRemainingMembers(remainingMembers));
        dispatch(assignTeams());
    };

    // 무작위 위치 생성 함수
    const generateRandomPositions = (count) => {
        const positions = [];
        const minDistance = 100; // 원 사이의 최소 간격 (픽셀 단위)
        let maxAttempts = 1000; // 충돌 없이 배치하기 위해 시도할 최대 횟수
        for (let i = 0; i < count; i++) {
            let validPosition = false;
            let attempts = 0;
            let pos = { top: 0, left: 0 };

            while (!validPosition && attempts < maxAttempts) {
                pos = { top: Math.random() * 70 + 15, left: Math.random() * 70 + 15 }; // 15~85% 사이의 좌표
                validPosition = true;

                // 기존 원들과 겹치지 않도록 거리 계산
                for (let j = 0; j < positions.length; j++) {
                    const dx = positions[j].left - pos.left;
                    const dy = positions[j].top - pos.top;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < minDistance) {
                        validPosition = false;
                        break;
                    }
                }
                attempts++;
            }
            positions.push(pos);
        }
        return positions;
    };

    // 팀원 뽑기 시작
    const handleStartPicking = () => {
        const remainingMembers = members.split(',').map((member) => member.trim());
        let shuffledMembers = [...remainingMembers].sort(() => 0.5 - Math.random());
        setPositions(generateRandomPositions(shuffledMembers.length));
        setIsPicking(true);
        setShuffledNames(shuffledMembers); // 섞인 이름을 원형으로

        setTimeout(() => {
            setPickedNames(shuffledMembers); // 최종 섞인 순서로 팀 배정
            setIsPicking(false);
        }, 3000); // 3초 후 이름 섞기 종료
    };

    return (
        <>
            <GlobalStyle />
            <Container isPicking={isPicking}>
                <Title isPicking={isPicking}>리액트 팀 랜덤 돌려돌려 돌림판</Title>

                {/* 조장 입력 섹션 */}
                <Section isPicking={isPicking}>
                    <h2>팀 조장 설정</h2>
                    <Input
                        type='text'
                        placeholder='조장 1'
                        value={leaders[0]}
                        onChange={(e) => setLeaders([e.target.value, leaders[1]])}
                    />
                    <Input
                        type='text'
                        placeholder='조장 2'
                        value={leaders[1]}
                        onChange={(e) => setLeaders([leaders[0], e.target.value])}
                    />
                    <Button onClick={handleSetLeaders}>조장 설정</Button>
                </Section>

                {/* 남은 멤버 입력 섹션 */}
                <Section isPicking={isPicking}>
                    <h2>남은 멤버 입력 (쉼표로 구분)</h2>
                    <TextArea
                        placeholder='멤버 이름을 쉼표로 구분하여 입력'
                        value={members}
                        onChange={(e) => setMembers(e.target.value)}
                    />
                    <Button onClick={handleSetMembers}>팀 배정</Button>
                </Section>

                {/* 뽑기 시작 버튼 */}
                <Section isPicking={isPicking}>
                    <Button onClick={handleStartPicking}>조원 뽑기</Button>
                </Section>

                {/* 섞이는 이름이 각각 원형으로 표시 */}
                {isPicking && (
                    <>
                        {shuffledNames.map((name, index) => (
                            <CircleName
                                key={index}
                                top={positions[index]?.top}
                                left={positions[index]?.left}
                            >
                                {name}
                            </CircleName>
                        ))}
                    </>
                )}

                {/* 팀 A와 B를 한 화면에서 동시에 보여줌 */}
                {!isPicking && pickedNames.length > 0 && (
                    <TeamsContainer>
                        <div>
                            <h2>{leaders[0]} 팀</h2>
                            {pickedNames
                                .filter((_, idx) => idx % 2 === 0)
                                .map((name, idx) => (
                                    <SelectedName key={idx}>{name}</SelectedName>
                                ))}
                        </div>
                        <div>
                            <h2>{leaders[1]} 팀</h2>
                            {pickedNames
                                .filter((_, idx) => idx % 2 !== 0)
                                .map((name, idx) => (
                                    <SelectedName key={idx}>{name}</SelectedName>
                                ))}
                        </div>
                    </TeamsContainer>
                )}
            </Container>
        </>
    );
}

export default App;

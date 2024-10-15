import React from 'react';
import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';

// 애니메이션 정의
const popIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.5) rotate(-15deg);
  }
  50% {
    opacity: 1;
    transform: scale(1.1) rotate(5deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
`;

const Container = styled.div`
    padding: 20px;
    background: #282c34;
    text-align: center;
    color: white;
    width: 45%;
`;

const Section = styled.div`
    background: rgba(255, 255, 255, 0.1);
    padding: 30px;
    margin: 20px 0;
    border-radius: 20px;
`;

const TeamList = styled.ul`
    list-style-type: none;
    padding: 0;
    font-size: 1.2rem;
`;

const TeamItem = styled.li`
    margin: 10px 0;
    padding: 10px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    animation: ${popIn} 0.8s ease forwards;
    opacity: 0;
    animation-delay: ${(props) => props.delay}s;
`;

function TeamA() {
    const { teamLeaders, teams } = useSelector((state) => state.teams);

    return (
        <Container>
            <h1>팀 A (조장: {teamLeaders[0]})</h1>
            <Section>
                <TeamList>
                    {teams.teamA.map((member, idx) => (
                        <TeamItem key={idx} delay={idx * 0.3}>
                            {member}
                        </TeamItem>
                    ))}
                </TeamList>
            </Section>
        </Container>
    );
}

export default TeamA;

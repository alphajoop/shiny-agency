import styled from 'styled-components';
import colors from '../../utils/style/colors';
import { ThemeContext } from '../../utils/context';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
  margin: 0 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    padding: 60px 0;
    margin: 0 90px;
  }
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0;
  margin-top: 20px;
  color: ${({ theme }) => (theme === 'light' ? colors.dark : 'white')};

  @media (min-width: 768px) {
    margin-left: 50px;
    margin-top: 0;
  }
`;

const Picture = styled.img`
  height: 150px;
  width: 150px;
  border-radius: 75px;
`;

const Title = styled.h1`
  font-size: 25px;
  margin: 0;
  font-weight: 500;
  padding-top: 20px;

  @media (min-width: 768px) {
    font-size: 30px;
    padding-top: 0;
  }
`;

const JobTitle = styled.h2`
  padding-top: 10px;
  font-size: 20px;
  margin: 0;
  font-weight: 500;
`;

const Location = styled.span`
  margin-left: 15px;
  color: ${colors.secondary};
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Price = styled.span`
  padding-top: 10px;
  font-weight: 500;
  font-size: 16px;

  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

const SkillsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 0;

  @media (min-width: 768px) {
    padding: 20px 0;
  }
`;

const Skill = styled.span`
  border-radius: 5px;
  padding: 5px;
  margin-right: 5px;
  border: 1px solid
    ${({ theme }) => (theme === 'light' ? colors.dark : 'white')};
  font-size: 14px;

  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

const Availability = styled.span`
  &:before {
    position: absolute;
    left: 0;
    top: 4px;
    height: 10px;
    width: 10px;
    border-radius: 5px;
    background-color: ${({ $available }) => ($available ? 'green' : 'red')};
    content: '';
  }
  padding-left: 20px;
  position: relative;
  font-size: 14px;

  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

function Profile() {
  const { id: queryId } = useParams();
  const [profileData, setProfileData] = useState({});
  useEffect(() => {
    fetch(`https://api-shiny-agency.vercel.app/freelance?id=${queryId}`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        setProfileData(jsonResponse?.freelanceData);
      });
  }, [queryId]);

  const { picture, name, location, tjm, job, skills, available, id } =
    profileData;

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <ProfileWrapper theme={theme}>
          <Picture src={picture} alt={name} height={150} width={150} />
          <ProfileDetails theme={theme}>
            <TitleWrapper>
              <Title>{name}</Title>
              <Location>{location}</Location>
            </TitleWrapper>
            <JobTitle>{job}</JobTitle>
            <SkillsWrapper>
              {skills &&
                skills.map((skill) => (
                  <Skill key={`skill-${skill}-${id}`} theme={theme}>
                    {skill}
                  </Skill>
                ))}
            </SkillsWrapper>
            <Availability $available={available}>
              {available ? 'Disponible maintenant' : 'Indisponible'}
            </Availability>
            <Price>{tjm} € / jour</Price>
          </ProfileDetails>
        </ProfileWrapper>
      )}
    </ThemeContext.Consumer>
  );
}

export default Profile;

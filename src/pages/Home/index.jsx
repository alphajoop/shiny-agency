import styled from 'styled-components';
import HomeIllustration from '../../assets/home-illustration.svg';
import { StyledLink } from '../../utils/style/Atoms';
import colors from '../../utils/style/colors';
import { useTheme } from '../../utils/hooks';

const HomeWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const HomerContainer = styled.div`
  margin: 30px;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
  padding: 60px 30px; /* Adjust padding for smaller screens */
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    padding: 60px 90px;
  }
`;

const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  ${StyledLink} {
    max-width: 250px;
  }
`;

const StyledTitle = styled.h2`
  overflow: hidden;
  padding-bottom: 30px;
  max-width: 280px;
  line-height: 50px;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`;

const Illustration = styled.img`
  flex: 1;
  max-width: 100%;
`;

function Home() {
  const { theme } = useTheme();

  return (
    <HomeWrapper>
      <HomerContainer theme={theme}>
        <LeftCol>
          <StyledTitle theme={theme}>
            Repérez vos besoins, on s’occupe du reste, avec les meilleurs
            talents
          </StyledTitle>
          <StyledLink to="/survey/1" $isFullLink>
            Faire le test
          </StyledLink>
        </LeftCol>
        <Illustration src={HomeIllustration} />
      </HomerContainer>
    </HomeWrapper>
  );
}

export default Home;

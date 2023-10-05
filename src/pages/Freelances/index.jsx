import styled from 'styled-components';
import Card from '../../components/Card';
import colors from '../../utils/style/colors';
import { Loader } from '../../utils/style/Atoms';
import { useFetch, useTheme } from '../../utils/hooks';
import { Link } from 'react-router-dom';

const CardsContainer = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr; /* Utilisation d'une colonne unique pour les petits écrans */
  align-items: center;
  justify-items: center;

  @media (min-width: 768px) {
    grid-template-columns: repeat(
      2,
      1fr
    ); /* Utilisation de deux colonnes pour les écrans plus larges */
  }
`;

const PageTitle = styled.h1`
  font-size: 30px;
  text-align: center;
  padding-bottom: 20px; /* Ajustement de l'espacement */
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`;

const PageSubtitle = styled.h2`
  font-size: 20px;
  color: ${colors.secondary};
  font-weight: 300;
  text-align: center;
  margin-bottom: 20px; /* Ajustement de l'espacement */
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

function Freelances() {
  const { theme } = useTheme();
  const { data, isLoading, error } = useFetch(
    `https://api-shiny-agency.vercel.app/freelances`,
  );

  const freelancersList = data?.freelancersList;

  if (error) {
    return <span>Il y a un problème</span>;
  }

  return (
    <div>
      <PageTitle theme={theme}>Trouvez votre prestataire</PageTitle>
      <PageSubtitle theme={theme}>
        Chez Shiny nous réunissons les meilleurs profils pour vous.
      </PageSubtitle>
      {isLoading ? (
        <LoaderWrapper>
          <Loader theme={theme} data-testid="loader" />
        </LoaderWrapper>
      ) : (
        <CardsContainer>
          {freelancersList?.map((profile) => (
            <Link key={`freelance-${profile.id}`} to={`/profile/${profile.id}`}>
              <Card
                label={profile.job}
                title={profile.name}
                picture={profile.picture}
                theme={theme}
              />
            </Link>
          ))}
        </CardsContainer>
      )}
    </div>
  );
}

export default Freelances;

import PropTypes from 'prop-types';
import DefaultPicture from '../../assets/profile.png';
import styled from 'styled-components';
import colors from '../../utils/style/colors';
import { Component } from 'react';

const CardLabel = styled.span`
  color: ${({ theme }) => (theme === 'light' ? colors.primary : '#ffffff')};
  font-size: 22px;
  font-weight: normal;
  padding-left: 15px;
`;

const CardTitle = styled.div`
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  font-size: 22px;
  font-weight: normal;
  align-self: center;
  height: auto; /* Ajuster la hauteur en fonction du contenu */
  display: flex;
  align-items: center;
  text-align: center; /* Centrer le texte */
`;

const CardImage = styled.img`
  height: 150px;
  width: 150px;
  align-self: center;
  border-radius: 50%;
  object-fit: cover; /* Éviter la déformation de l'image */
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 15px;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
  border-radius: 30px;
  width: 300px; /* Largeur fixe pour toutes les cartes */
  height: 400px; /* Hauteur fixe pour toutes les cartes */
  margin: 0 auto;
  margin-bottom: 24px;
  &:hover {
    cursor: pointer;
  }
`;

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { theme, picture, label, title } = this.props;

    return (
      <CardWrapper theme={theme} onClick={this.setFavorite}>
        <CardLabel theme={theme}>{label}</CardLabel>
        <CardImage src={picture} alt="freelance" />
        <CardTitle theme={theme}>{title}</CardTitle>
      </CardWrapper>
    );
  }
}

Card.propTypes = {
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
};

Card.defaultProps = {
  label: '',
  title: '',
  picture: DefaultPicture,
  theme: 'light',
};

export default Card;

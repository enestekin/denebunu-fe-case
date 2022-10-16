import './Card.scss';

const Card = ({ children, styles }) => {
  return <section className={styles}>{children}</section>;
};
export default Card;

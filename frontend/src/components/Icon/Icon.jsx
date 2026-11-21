import sprite from '../../assets/sprite.svg';

export default function Icon({ name, className, ...props }) {
  return (
    <svg className={className} aria-hidden="true" {...props}>
      <use href={`${sprite}#${name}`} />
    </svg>
  );
}
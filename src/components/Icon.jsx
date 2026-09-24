// Material Symbols icon via font ligature, e.g. <Icon name="payments" />
export default function Icon({ name, className = 'text-[20px]' }) {
  return <span className={`material-symbols-outlined ${className}`}>{name}</span>
}

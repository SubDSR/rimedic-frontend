export const WA = "51946795583";

export const wa = (
  msg = "Hola, quisiera información sobre los tratamientos de Rimedic.",
) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
